import { buildQuery, toApiLanguage, toApiSaUnit } from './helpers';

export type ContactDto = {
  id: string;
  name: string;
  email: string;
  imageSrc: string;
  position: string;
  responsibilities: string;
};

export async function getContacts(lang: string, saUnitName: string): Promise<Array<ContactDto>> {
  const saUnit = encodeURIComponent(toApiSaUnit(saUnitName));
  const query = buildQuery({ language: toApiLanguage(lang) });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/sa-units/${saUnit}/contacts${query}`);

  if (!res.ok) {
    console.error(`Failed to fetch contacts (${res.status}): ${res.statusText}`);
    return [];
  }

  return res.json();
}
