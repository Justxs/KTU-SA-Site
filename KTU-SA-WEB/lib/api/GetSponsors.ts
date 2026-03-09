type SponsorDto = {
  id: string;
  name: string;
  websiteUrl: string;
  logoId: string;
};

type SponsorApiResponse = {
  id: string;
  name: string;
  websiteUrl: string;
  logoUrl: string;
};

export async function getSponsors(): Promise<Array<SponsorDto>> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/sponsors`);

  if (!res.ok) {
    console.error(`Failed to fetch sponsors (${res.status}): ${res.statusText}`);
    return [];
  }

  const sponsors: Array<SponsorApiResponse> = await res.json();
  return sponsors.map((sponsor) => ({
    id: sponsor.id,
    name: sponsor.name,
    websiteUrl: sponsor.websiteUrl,
    logoId: sponsor.logoUrl,
  }));
}
