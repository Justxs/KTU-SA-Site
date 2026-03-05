import {
  buildQuery,
  ContentBlockResponse,
  toApiLanguage,
  toApiSaUnit,
} from './helpers';

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
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/sa-units/${saUnit}${query}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch SA unit ${saUnitName} (${res.status}): ${res.statusText}`);
  }

  const saUnitData: SaUnitApiResponse = await res.json();
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
