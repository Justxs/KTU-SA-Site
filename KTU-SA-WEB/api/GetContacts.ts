export type ContactDto = {
  id: string;
  name: string;
  email: string;
  imageSrc: string;
  position: string;
  responsibilities: string;
}

export type MainContactDto = {
    email: string;
    address: string;
    phoneNumber: string;
};

export async function getContacts(lang : string, saUnitName : string): Promise<Array<ContactDto>> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Contacts?saUnit=${saUnitName}`);
  
  return res.json();
}

export async function getMainContacts(saUnitName : string): Promise<MainContactDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/MainContacts/${saUnitName}`);
    
  return res.json();
}
  
