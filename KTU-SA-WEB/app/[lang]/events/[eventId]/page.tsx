import { getEvent, getEvents } from '@api/GetEvents';
import Body from '@components/htmlBody/Body';
import HeroImage from './components/eventHero/HeroImage';
import SideMargins from '@components/margins/SideMargins';
import JsonLd from '@components/seo/JsonLd';
import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { LANGUAGES } from '@constants/Languages';
import { Metadata } from 'next';

const baseUrl = process.env.KTU_SA_WEB_URL || 'http://localhost:3000';

function stripHtml(html: string): string {
  return html.replaceAll(/<[^>]+(>|$)/g, '').trim();
}

function truncate(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).replace(/\s+\S*$/, '')}…`;
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

  const description = truncate(stripHtml(event.htmlBody));
  const eventUrl = `${baseUrl}/${params.lang}/events/${params.eventId}`;

  return {
    title: event.title,
    description,
    alternates: {
      canonical: `/${params.lang}/events/${params.eventId}`,
      languages: {
        en: `/en/events/${params.eventId}`,
        lt: `/lt/events/${params.eventId}`,
      },
    },
    openGraph: {
      title: event.title,
      description,
      type: 'article',
      locale: params.lang === 'lt' ? 'lt_LT' : 'en_US',
      alternateLocale: params.lang === 'lt' ? 'en_US' : 'lt_LT',
      url: eventUrl,
      siteName: 'KTU Studentų atstovybė',
      images: [
        {
          url: event.coverImageUrl,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title: event.title,
      description,
      images: [event.coverImageUrl],
    },
  };
}

export default async function Page(props: Readonly<Props>) {
  const params = await props.params;
  let event = undefined;

  try {
    event = await getEvent(params.lang, params.eventId);
  } catch {
    return notFound();
  }

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: truncate(stripHtml(event.htmlBody)),
    image: event.coverImageUrl,
    startDate: new Date(event.startDate).toISOString(),
    endDate: new Date(event.endDate).toISOString(),
    url: `${baseUrl}/${params.lang}/events/${params.eventId}`,
    ...(event.address && {
      location: {
        '@type': 'Place',
        name: event.address,
      },
    }),
    organizer: event.organisers?.map((name: string) => ({
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

  return (
    <>
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
          <Body htmlBody={event.htmlBody} />
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
