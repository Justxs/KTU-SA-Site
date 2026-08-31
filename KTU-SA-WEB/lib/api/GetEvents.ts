import {
  buildQuery,
  ContentBlockResponse,
  normalizeCmsText,
  toApiLanguage,
  toApiSaUnit,
} from './helpers';
import { apiFetch } from './client';
import { apiDateStringSchema, contentBlockSchema } from './schemas';
import { z } from 'zod';

const eventPreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  startDate: apiDateStringSchema,
  coverImageUrl: z.string(),
});

const eventContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  facebookUrl: z.string(),
  fientaTicketUrl: z.string().nullish(),
  address: z.string().nullish(),
  blocks: z.array(contentBlockSchema).nullish(),
  startDate: apiDateStringSchema,
  endDate: apiDateStringSchema,
  coverImageUrl: z.string(),
  organisers: z.array(z.string()),
});

export type EventPreviewDto = {
  id: string;
  title: string;
  startDate: string;
  coverImageUrl: string;
};

type EventContentDto = {
  id: string;
  title: string;
  facebookUrl: string;
  fientaTicketUrl?: string;
  address?: string;
  blocks: Array<ContentBlockResponse>;
  startDate: string;
  endDate: string;
  coverImageUrl: string;
  organisers: Array<string>;
};

type EventPreviewApiResponse = {
  id: string;
  title: string;
  startDate: string;
  coverImageUrl: string;
};

type EventContentApiResponse = {
  id: string;
  title: string;
  facebookUrl: string;
  fientaTicketUrl?: string | null;
  address?: string | null;
  blocks?: Array<ContentBlockResponse> | null;
  startDate: string;
  endDate: string;
  coverImageUrl: string;
  organisers: Array<string>;
};

export async function getEvents(lang: string): Promise<Array<EventPreviewDto>> {
  const query = buildQuery({ language: toApiLanguage(lang) });
  const events: Array<EventPreviewApiResponse> = await apiFetch(
    `/events${query}`,
    z.array(eventPreviewSchema),
  );
  return events.map((event) => ({
    id: event.id,
    title: normalizeCmsText(event.title),
    startDate: event.startDate,
    coverImageUrl: event.coverImageUrl,
  }));
}

export async function getEventsBySaUnit(
  lang: string,
  saUnit: string,
): Promise<Array<EventPreviewDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), saUnit: toApiSaUnit(saUnit) });
  const events: Array<EventPreviewApiResponse> = await apiFetch(
    `/events${query}`,
    z.array(eventPreviewSchema),
  );
  return events.map((event) => ({
    id: event.id,
    title: normalizeCmsText(event.title),
    startDate: event.startDate,
    coverImageUrl: event.coverImageUrl,
  }));
}

export async function getEvent(lang: string, id: string): Promise<EventContentDto> {
  const eventId = encodeURIComponent(id);
  const query = buildQuery({ language: toApiLanguage(lang) });
  const event: EventContentApiResponse = await apiFetch(
    `/events/${eventId}${query}`,
    eventContentSchema,
  );
  return {
    id: event.id,
    title: normalizeCmsText(event.title),
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
