import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';
import { apiFetch } from './client';
import { contentBlockSchema } from './schemas';
import { z } from 'zod';

const staticPageSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  imgSrc: z.string().nullish(),
  blocks: z.array(contentBlockSchema).nullish(),
});

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
  const page: StaticPageApiResponse = await apiFetch(
    `/static-pages/${pageName}${query}`,
    staticPageSchema,
  );

  return {
    title: page.title,
    description: page.description ?? '',
    imgSrc: page.imgSrc ?? '',
    blocks: page.blocks ?? [],
  };
}
