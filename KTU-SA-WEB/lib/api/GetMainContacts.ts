import { toApiSaUnit } from './helpers';

type MainContactDto = {
  email: string;
  address: string;
  phoneNumber: string;
};

export async function getMainContacts(saUnitName: string): Promise<MainContactDto> {
  const saUnit = encodeURIComponent(toApiSaUnit(saUnitName));
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/sa-units/${saUnit}/main-contact`);

  if (!res.ok) {
    console.error(`Failed to fetch main contacts (${res.status}): ${res.statusText}`);
    return { email: '', address: '', phoneNumber: '' };
  }

  return res.json();
}
