export type HeroSectionDto = {
  title: string;
  description: string;
  imgSrc: string;
};

export async function getHeroImage(lang: string, sectionName: string): Promise<HeroSectionDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/HeroSections/${sectionName}`);

  if (!res.ok) {
    console.error(`Failed to fetch hero image (${res.status}): ${res.statusText}`);
    return { title: '', description: '', imgSrc: '' };
  }

  return res.json();
}
