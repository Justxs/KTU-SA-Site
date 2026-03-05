import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';

export type StaticPageDto = {
  title: string;
  description: string;
  imgSrc: string;
  blocks: Array<ContentBlockResponse>;
};

export type StaticPageHeroDto = Pick<StaticPageDto, 'title' | 'description' | 'imgSrc'>;

type StaticPageApiResponse = {
  title: string;
  description?: string | null;
  imgSrc?: string | null;
  blocks?: Array<ContentBlockResponse> | null;
};

export async function getStaticPage(lang: string, pageNameValue: string): Promise<StaticPageDto> {
  const pageName = encodeURIComponent(pageNameValue);
  const query = buildQuery({ language: toApiLanguage(lang) });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/static-pages/${pageName}${query}`);

  if (!res.ok) {
    console.error(
      `Failed to fetch static page ${pageNameValue} (${res.status}): ${res.statusText}`,
    );
    return { title: '', description: '', imgSrc: '', blocks: [] };
  }

  const page: StaticPageApiResponse = await res.json();

  return {
    title: page.title,
    description: page.description ?? '',
    imgSrc: page.imgSrc ?? '',
    blocks: page.blocks ?? [],
  };
}
