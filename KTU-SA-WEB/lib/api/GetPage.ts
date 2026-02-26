type PageDto = {
  body: string;
};

export async function getPage(lang: string, staticPages: string): Promise<PageDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/StaticPages/${staticPages}`);

  if (!res.ok) {
    console.error(`Failed to fetch page ${staticPages} (${res.status}): ${res.statusText}`);
    return { body: '' };
  }

  return res.json();
}
