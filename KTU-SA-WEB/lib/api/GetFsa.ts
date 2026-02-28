type SaUnitDto = {
  coverUrl: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: string;
  linkedInUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

export async function getSaUnit(lang: string, name: string): Promise<SaUnitDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/SaUnits/${name}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch SA unit ${name} (${res.status}): ${res.statusText}`);
  }

  return res.json();
}
