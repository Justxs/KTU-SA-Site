import { buildQuery, ContentBlockResponse, toApiLanguage, toApiSaUnit } from './helpers';
import { apiFetch } from './client';
import { contentBlockSchema } from './schemas';
import { z } from 'zod';

const saUnitSchema = z.object({
  coverUrl: z.string(),
  blocks: z.array(contentBlockSchema).nullish(),
  email: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  linkedInUrl: z.string().nullish(),
  facebookUrl: z.string().nullish(),
  instagramUrl: z.string().nullish(),
});

type SaUnitDto = {
  coverUrl: string;
  blocks: Array<ContentBlockResponse>;
  email: string;
  phoneNumber: string;
  address: string;
  linkedInUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

type SaUnitApiResponse = {
  coverUrl: string;
  blocks?: Array<ContentBlockResponse> | null;
  email: string;
  phoneNumber: string;
  address: string;
  linkedInUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
};

export async function getSaUnit(lang: string, saUnitName: string): Promise<SaUnitDto> {
  const saUnit = encodeURIComponent(toApiSaUnit(saUnitName));
  const query = buildQuery({ language: toApiLanguage(lang) });
  const saUnitData: SaUnitApiResponse = await apiFetch(`/sa-units/${saUnit}${query}`, saUnitSchema);
  return {
    coverUrl: saUnitData.coverUrl,
    blocks: saUnitData.blocks ?? [],
    email: saUnitData.email,
    phoneNumber: saUnitData.phoneNumber,
    address: saUnitData.address,
    linkedInUrl: saUnitData.linkedInUrl ?? '',
    facebookUrl: saUnitData.facebookUrl ?? '',
    instagramUrl: saUnitData.instagramUrl ?? '',
  };
}
