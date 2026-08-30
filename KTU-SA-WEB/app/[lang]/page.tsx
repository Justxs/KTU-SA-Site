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
import { getTranslations } from 'next-intl/server';
import { getEvents, type EventPreviewDto } from '@api/GetEvents';
import { Metadata } from 'next';
import { buildLanguageAlternates, getLocalizedPath } from '@/lib/seo/languageAlternates';
import { getBaseUrl, toAbsoluteUrl } from '@/lib/seo/siteUrl';
import JsonLd from '@components/seo/JsonLd';

const defaultOgImage = toAbsoluteUrl('/opengraph-image.png');
const defaultTwitterImage = toAbsoluteUrl('/twitter-image.png');
const baseUrl = getBaseUrl();

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}#website`,
  url: baseUrl,
  name: 'KTU SA',
  alternateName: ['KTU Studentų atstovybė', "KTU Students' Association", 'ktusa.lt'],
  publisher: { '@id': `${baseUrl}#organization` },
  inLanguage: ['lt', 'en'],
};

function getUpcomingEvents(events: Array<EventPreviewDto>): Array<EventPreviewDto> {
  const now = Date.now();

  return events
    .filter((event) => {
      const startTime = Date.parse(event.startDate);
      return Number.isFinite(startTime) && startTime >= now;
    })
    .sort((first, second) => Date.parse(first.startDate) - Date.parse(second.startDate))
    .slice(0, 8);
}

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
    title: { absolute: title },
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
      siteName: 'KTU SA',
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
  const events = await getEvents(lang);
  const upcomingEvents = getUpcomingEvents(events);

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <SideMargins>
        <HeroImage />
        <Values />
      </SideMargins>
      <SideMargins>
        <Box sx={{ py: { xs: '40px', md: '64px' } }}>
          <Articles />
        </Box>
        <Box sx={{ pb: { xs: '40px', md: '64px' } }}>
          <EventsSection events={upcomingEvents} />
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
