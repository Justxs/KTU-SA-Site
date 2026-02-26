export type SponsorDto = {
  id: string;
  name: string;
  websiteUrl: string;
  logoId: string;
};

export async function getSponsors(): Promise<Array<SponsorDto>> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/Sponsors`);

  if (!res.ok) {
    console.error(`Failed to fetch sponsors (${res.status}): ${res.statusText}`);
    return [];
  }

  return res.json();
}
