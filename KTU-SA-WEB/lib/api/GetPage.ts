type PageDto = {
    body: string
}

export async function getPage(lang : string, staticPages : string): Promise<PageDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/StaticPages/${staticPages}`);
      
  return res.json();
}
