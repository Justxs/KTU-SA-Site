import { buildQuery, toApiLanguage, toApiSaUnit } from './helpers';
import { apiFetch } from './client';
import { z } from 'zod';

const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  imageSrc: z.string(),
  position: z.string(),
  responsibilities: z.string(),
});

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
  return apiFetch(`/sa-units/${saUnit}/contacts${query}`, z.array(contactSchema));
}
