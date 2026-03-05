import {
  buildQuery,
  ContentBlockResponse,
  toApiLanguage,
  toApiSaUnit,
} from './helpers';

export type EventPreviewDto = {
  id: string;
  title: string;
  startDate: Date;
  coverImageUrl: string;
};

type EventContentDto = {
  id: string;
  title: string;
  facebookUrl: string;
  fientaTicketUrl?: string;
  address?: string;
  blocks: Array<ContentBlockResponse>;
  startDate: Date;
  endDate: Date;
  coverImageUrl: string;
  organisers: Array<string>;
};

type EventPreviewApiResponse = {
  id: string;
  title: string;
  startDate: Date;
  coverImageUrl: string;
};

type EventContentApiResponse = {
  id: string;
  title: string;
  facebookUrl: string;
  fientaTicketUrl?: string | null;
  address?: string | null;
  blocks?: Array<ContentBlockResponse> | null;
  startDate: Date;
  endDate: Date;
  coverImageUrl: string;
  organisers: Array<string>;
};

export async function getEvents(lang: string): Promise<Array<EventPreviewDto>> {
  const query = buildQuery({ language: toApiLanguage(lang) });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/events${query}`);

  if (!res.ok) {
    console.error(`Failed to fetch events (${res.status}): ${res.statusText}`);
    return [];
  }

  const events: Array<EventPreviewApiResponse> = await res.json();
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    startDate: event.startDate,
    coverImageUrl: event.coverImageUrl,
  }));
}

export async function getEventsBySaUnit(
  lang: string,
  saUnit: string,
): Promise<Array<EventPreviewDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), saUnit: toApiSaUnit(saUnit) });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/events${query}`);

  if (!res.ok) {
    console.error(`Failed to fetch events by SA unit (${res.status}): ${res.statusText}`);
    return [];
  }

  const events: Array<EventPreviewApiResponse> = await res.json();
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    startDate: event.startDate,
    coverImageUrl: event.coverImageUrl,
  }));
}

export async function getEvent(lang: string, id: string): Promise<EventContentDto> {
  const eventId = encodeURIComponent(id);
  const query = buildQuery({ language: toApiLanguage(lang) });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/events/${eventId}${query}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch event ${id} (${res.status}): ${res.statusText}`);
  }

  const event: EventContentApiResponse = await res.json();
  return {
    id: event.id,
    title: event.title,
    facebookUrl: event.facebookUrl,
    fientaTicketUrl: event.fientaTicketUrl ?? undefined,
    address: event.address ?? undefined,
    blocks: event.blocks ?? [],
    startDate: event.startDate,
    endDate: event.endDate,
    coverImageUrl: event.coverImageUrl,
    organisers: event.organisers,
  };
}
