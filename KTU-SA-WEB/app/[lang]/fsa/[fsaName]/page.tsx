import HeroImage from './components/heroImage/HeroImage';
import ContentBlocks from '@components/contentBlocks/ContentBlocks';
import Contacts from './components/contacts/Contacts';
import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import SectionName from '@components/sectionName/SectionName';
import EventsSection from '@components/eventsSection/EventsSection';
import { getSaUnit } from '@api/GetSaUnits';
import { getEventsBySaUnit } from '@api/GetEvents';
import { getContacts } from '@api/GetContacts';
import { blocksToPlainText } from '@api/helpers';
import SideMargins from '@components/margins/SideMargins';
import { LANGUAGES } from '@constants/Languages';
import { FSA_ROUTE_NAMES } from '@constants/FsaRouteNames';
import { Metadata } from 'next';
import { buildLanguageAlternates, getLocalizedPath } from '@/lib/seo/languageAlternates';
import { toAbsoluteUrl } from '@/lib/seo/siteUrl';

export const dynamicParams = false;

const DEFAULT_SOCIAL_IMAGE = '/opengraph-image.png';

function normalizeFsaName(rawFsaName: string): string {
  const decoded = decodeURIComponent(rawFsaName);
  return decoded === 'VIVAT chemija' ? 'Vivat_Chemija' : decoded.replaceAll(/\s+/g, '_');
}

function formatFsaTitle(fsaName: string): string {
  return fsaName.replaceAll('_', ' ');
}

function truncate(text: string, maxLength = 160): string {
  const normalized = text.trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.substring(0, maxLength).replace(/\s+\S*$/, '').trimEnd()}...`;
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; fsaName: string }> | { lang: string; fsaName: string };
}): Promise<Metadata> {
  const params = await props.params;
  const locale = params.lang;
  const decodedFsaName = decodeURIComponent(params.fsaName);
  const encodedFsaName = encodeURIComponent(decodedFsaName);
  const fsa = normalizeFsaName(params.fsaName);
  const title = formatFsaTitle(fsa);
  const fsaPath = `/fsa/${encodedFsaName}`;
  const canonicalPath = getLocalizedPath(locale, fsaPath);
  const localeCode = locale === 'lt' ? 'lt_LT' : 'en_US';
  const alternateLocale = locale === 'lt' ? 'en_US' : 'lt_LT';

  try {
    const fsaInfo = await getSaUnit(locale, fsa);
    const description = truncate(blocksToPlainText(fsaInfo.blocks) || title);
    const socialImage = toAbsoluteUrl(fsaInfo.coverUrl || DEFAULT_SOCIAL_IMAGE);

    return {
      title,
      description,
      alternates: {
        canonical: canonicalPath,
        languages: buildLanguageAlternates(fsaPath),
      },
      openGraph: {
        title,
        description,
        type: 'website',
        locale: localeCode,
        alternateLocale,
        url: toAbsoluteUrl(canonicalPath),
        siteName: 'KTU Studentų atstovybė',
        images: [
          {
            url: socialImage,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@KTU_SA',
        title,
        description,
        images: [socialImage],
      },
    };
  } catch (error) {
    console.warn(`generateMetadata: failed to fetch SA unit "${fsa}"`, error);

    return {
      title,
      description: title,
      alternates: {
        canonical: canonicalPath,
        languages: buildLanguageAlternates(fsaPath),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function Page(
  props: Readonly<{
    params: Promise<{ lang: string; fsaName: string }> | { lang: string; fsaName: string };
  }>,
) {
  const params = await props.params;
  const fsaName = params.fsaName ?? '';
  const locale = params.lang;
  const t = await getTranslations();
  const fsa = normalizeFsaName(fsaName);
  const saUnitData = getSaUnit(locale, fsa);
  const eventsData = getEventsBySaUnit(locale, fsa);
  const contactsData = getContacts(locale, fsa);

  const [saUnit, events, contacts] = await Promise.all([saUnitData, eventsData, contactsData]);

  return (
    <>
      <HeroImage
        fsaName={fsaName}
        coverUrl={saUnit.coverUrl}
        email={saUnit.email}
        phoneNumber={saUnit.phoneNumber}
        address={saUnit.address}
        facebookUrl={saUnit.facebookUrl}
        linkedInUrl={saUnit.linkedInUrl}
        instagramUrl={saUnit.instagramUrl}
      />
      <SideMargins>
        <Box sx={{ mb: '40px' }}>
          <SectionName title={t('sections.aboutUs')} />
          <ContentBlocks blocks={saUnit.blocks} />
        </Box>
        <EventsSection events={events} />
        <Contacts contacts={contacts} />
        <div style={{ marginBottom: '20px' }} />
      </SideMargins>
    </>
  );
}

export async function generateStaticParams(): Promise<Array<{ lang: string; fsaName: string }>> {
  const langs = Object.values(LANGUAGES);
  const params: Array<{ lang: string; fsaName: string }> = [];

  for (const lang of langs) {
    for (const f of FSA_ROUTE_NAMES) {
      params.push({ lang, fsaName: f });
    }
  }

  return params;
}
