import { toApiSaUnit } from './helpers';
import { apiFetch } from './client';
import { z } from 'zod';

const mainContactSchema = z.object({
  email: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
});

type MainContactDto = {
  email: string;
  address: string;
  phoneNumber: string;
};

export async function getMainContacts(saUnitName: string): Promise<MainContactDto> {
  const saUnit = encodeURIComponent(toApiSaUnit(saUnitName));
  return apiFetch(`/sa-units/${saUnit}/main-contact`, mainContactSchema);
}
