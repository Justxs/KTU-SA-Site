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
  const sponsors: Array<SponsorApiResponse> = await apiFetch('/sponsors', z.array(sponsorSchema));
  return sponsors.map((sponsor) => ({
    id: sponsor.id,
    name: sponsor.name,
    websiteUrl: sponsor.websiteUrl,
    logoId: sponsor.logoUrl,
  }));
}
import { apiFetch } from './client';
import { z } from 'zod';

const sponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  websiteUrl: z.string(),
  logoUrl: z.string(),
});
