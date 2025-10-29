import { getEvent } from "@api/GetEvents";
import Body from "@components/htmlBody/Body";
import HeroImage from "./components/eventHero/HeroImage";
import styles from "./Event.module.css";
import EventInfo from "./components/eventInfo/EventInfo";
import SideMargins from "@components/margins/SideMargins";
import { Stack } from "@mui/material";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang: string; eventId: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  let event = undefined;

  try {
    event = await getEvent(params.lang, params.eventId);
  } catch {
    return notFound();
  }

  return {
    title: event.title,
    openGraph: {
      images: [
        {
          url: event.coverImageUrl,
        },
      ],
    },
    twitter: {
      site: "@KTU_SA",
      images: [event.coverImageUrl],
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  let event = undefined;

  try {
    event = await getEvent(params.lang, params.eventId);
  } catch {
    return notFound();
  }

  return (
    <>
      <HeroImage
        img={event.coverImageUrl}
        title={event.title}
        ticketUrl={event.fientaTicketUrl}
        endDate={event.endDate}
      />
      <SideMargins>
        <Stack>
          <Body htmlBody={event.htmlBody} />
          <EventInfo
            facebookUrl={event.facebookUrl}
            organizers={event.organisers}
            address={event.address}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        </Stack>
      </SideMargins>
    </>
  );
}

import { LANGUAGES } from "@constants/Languages";
import { getEvents } from "@api/GetEvents";

export async function generateStaticParams(): Promise<
  Array<{ lang: string; eventId: string }>
> {
  const langs = Object.values(LANGUAGES);
  const params: Array<{ lang: string; eventId: string }> = [];

  for (const lang of langs) {
    try {
      const events = await getEvents(lang);
      for (const e of events ?? []) {
        params.push({ lang, eventId: e.id });
      }
    } catch (e) {
      console.warn(
        `generateStaticParams: failed to fetch events for ${lang}:`,
        e
      );
    }
  }

  return params;
}

export const dynamicParams = false;
