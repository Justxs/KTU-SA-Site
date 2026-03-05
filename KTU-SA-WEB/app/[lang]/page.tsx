import SideMargins from '@components/margins/SideMargins';
import { Box } from '@mui/material';
import Articles from './Components/articles/Articles';
import Faq from './Components/faq/Faq';
import HeroImage from './Components/heroImage/HeroImage';
import SocialMedia from './Components/socialMedia/SocialMedia';
import Sponsors from './Components/sponsors/Sponsors';
import Values from './Components/values/Values';
import FsaSection from '@components/fsaSection/FsaSection';
import EventsSection from '@components/eventsSection/EventsSection';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getEvents } from '@api/GetEvents';
import { Metadata } from 'next';
import { buildLanguageAlternates, getLocalizedPath } from '@/lib/seo/languageAlternates';
import { toAbsoluteUrl } from '@/lib/seo/siteUrl';

const defaultOgImage = toAbsoluteUrl('/opengraph-image.png');
const defaultTwitterImage = toAbsoluteUrl('/twitter-image.png');

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const title = t('seo.homeTitle');
  const description = t('seo.homeDescription');
  const canonicalPath = getLocalizedPath(lang, '');
  const localeCode = lang === 'lt' ? 'lt_LT' : 'en_US';
  const alternateLocale = lang === 'lt' ? 'en_US' : 'lt_LT';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(''),
    },
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(canonicalPath),
      locale: localeCode,
      alternateLocale,
      type: 'website',
      siteName: t('common.ktusa'),
      images: [{ url: defaultOgImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title,
      description,
      images: [defaultTwitterImage],
    },
  };
}

export default async function Index({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const events = await getEvents(lang);

  return (
    <>
      <SideMargins>
        <HeroImage />
        <Values />
      </SideMargins>
      <SideMargins>
        <Box sx={{ py: { xs: '40px', md: '64px' } }}>
          <Articles />
        </Box>
        <Box sx={{ pb: { xs: '40px', md: '64px' } }}>
          <EventsSection events={events} />
        </Box>
        <Box sx={{ pb: { xs: '40px', md: '64px' } }}>
          <Sponsors />
        </Box>
      </SideMargins>
      <Faq />
      <SideMargins>
        <Box sx={{ py: { xs: '40px', md: '64px' } }}>
          <FsaSection />
        </Box>
      </SideMargins>
      <SocialMedia />
    </>
  );
}
