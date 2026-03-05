import { getEvent, getEvents } from '@api/GetEvents';
import { blocksToPlainText } from '@api/helpers';
import ContentBlocks from '@components/contentBlocks/ContentBlocks';
import HeroImage from './components/eventHero/HeroImage';
import SideMargins from '@components/margins/SideMargins';
import JsonLd from '@components/seo/JsonLd';
import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { LANGUAGES } from '@constants/Languages';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildLanguageAlternates, getLocalizedPath } from '@/lib/seo/languageAlternates';
import { toAbsoluteUrl } from '@/lib/seo/siteUrl';

const DEFAULT_SOCIAL_IMAGE = '/opengraph-image.png';

function truncate(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

type Props = {
  params: Promise<{ lang: string; eventId: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  let event = undefined;

  try {
    event = await getEvent(params.lang, params.eventId);
  } catch {
    return notFound();
  }

  const description = truncate(blocksToPlainText(event.blocks) || event.title);
  const encodedEventId = encodeURIComponent(params.eventId);
  const eventPath = `/events/${encodedEventId}`;
  const canonicalPath = getLocalizedPath(params.lang, eventPath);
  const eventUrl = toAbsoluteUrl(canonicalPath);
  const socialImage = toAbsoluteUrl(event.coverImageUrl || DEFAULT_SOCIAL_IMAGE);
  const localeCode = params.lang === 'lt' ? 'lt_LT' : 'en_US';
  const alternateLocale = params.lang === 'lt' ? 'en_US' : 'lt_LT';

  return {
    title: event.title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(eventPath),
    },
    openGraph: {
      title: event.title,
      description,
      type: 'article',
      locale: localeCode,
      alternateLocale,
      url: eventUrl,
      siteName: 'KTU Studentų atstovybė',
      images: [
        {
          url: socialImage,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title: event.title,
      description,
      images: [socialImage],
    },
  };
}

export default async function Page(props: Readonly<Props>) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });
  let event = undefined;

  try {
    event = await getEvent(params.lang, params.eventId);
  } catch {
    return notFound();
  }

  const socialImage = toAbsoluteUrl(event.coverImageUrl || DEFAULT_SOCIAL_IMAGE);
  const eventPath = `/events/${encodeURIComponent(params.eventId)}`;
  const homePath = getLocalizedPath(params.lang, '');
  const eventsListPath = getLocalizedPath(params.lang, '/events');

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: truncate(blocksToPlainText(event.blocks) || event.title),
    image: socialImage,
    startDate: new Date(event.startDate).toISOString(),
    endDate: new Date(event.endDate).toISOString(),
    url: toAbsoluteUrl(getLocalizedPath(params.lang, eventPath)),
    mainEntityOfPage: toAbsoluteUrl(getLocalizedPath(params.lang, eventPath)),
    ...(event.address && {
      location: {
        '@type': 'Place',
        name: event.address,
      },
    }),
    organizer:
      event.organisers?.map((name: string) => ({
        '@type': 'Organization',
        name,
      })) ?? [
        {
          '@type': 'Organization',
          name: 'KTU Studentų atstovybė',
        },
      ],
    inLanguage: params.lang === 'lt' ? 'lt-LT' : 'en-US',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('common.ktusa'),
        item: toAbsoluteUrl(homePath),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('sections.events'),
        item: toAbsoluteUrl(eventsListPath),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: event.title,
        item: toAbsoluteUrl(getLocalizedPath(params.lang, eventPath)),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={eventJsonLd} />
      <HeroImage
        img={event.coverImageUrl}
        title={event.title}
        ticketUrl={event.fientaTicketUrl}
        endDate={event.endDate}
        startDate={event.startDate}
        facebookUrl={event.facebookUrl}
        organizers={event.organisers}
        address={event.address}
      />
      <SideMargins>
        <Stack>
          <ContentBlocks blocks={event.blocks} />
        </Stack>
      </SideMargins>
    </>
  );
}

export async function generateStaticParams(): Promise<Array<{ lang: string; eventId: string }>> {
  const langs = Object.values(LANGUAGES);
  const params: Array<{ lang: string; eventId: string }> = [];

  for (const lang of langs) {
    try {
      const events = await getEvents(lang);
      for (const e of events ?? []) {
        params.push({ lang, eventId: e.id });
      }
    } catch (e) {
      console.warn(`generateStaticParams: failed to fetch events for ${lang}:`, e);
    }
  }

  return params;
}

