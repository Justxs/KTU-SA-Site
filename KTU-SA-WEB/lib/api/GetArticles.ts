import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';
import { apiFetch } from './client';
import { apiDateStringSchema, contentBlockSchema } from './schemas';
import { z } from 'zod';

const articlePreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  preview: z.string(),
  createdDate: apiDateStringSchema,
  thumbnailImageUrl: z.string(),
});

const articleContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  blocks: z.array(contentBlockSchema).nullish(),
  readingTime: z.string().nullish(),
  createdDate: apiDateStringSchema,
  thumbnailImageUrl: z.string(),
  contentList: z.array(z.string()).nullish(),
});

export type ArticleDto = {
  id: string;
  title: string;
  preview: string;
  createdDate: string;
  thumbnailImageId: string;
};

export type ArticleContentDto = {
  id: string;
  title: string;
  blocks: Array<ContentBlockResponse>;
  readingTime: string;
  createdDate: string;
  thumbnailImageId: string;
  contentList?: Array<string>;
};

type ArticlePreviewApiResponse = {
  id: string;
  title: string;
  preview: string;
  createdDate: string;
  thumbnailImageUrl: string;
};

type ArticleContentApiResponse = {
  id: string;
  title: string;
  blocks?: Array<ContentBlockResponse> | null;
  readingTime?: string | null;
  createdDate: string;
  thumbnailImageUrl: string;
  contentList?: Array<string> | null;
};

export async function getArticles(lang: string, limit?: number): Promise<Array<ArticleDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), limit });
  const articles: Array<ArticlePreviewApiResponse> = await apiFetch(
    `/articles${query}`,
    z.array(articlePreviewSchema),
  );
  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    preview: article.preview,
    createdDate: article.createdDate,
    thumbnailImageId: article.thumbnailImageUrl,
  }));
}

export async function getArticle(lang: string, id: string): Promise<ArticleContentDto> {
  const query = buildQuery({ language: toApiLanguage(lang) });
  const articleId = encodeURIComponent(id);
  const article: ArticleContentApiResponse = await apiFetch(
    `/articles/${articleId}${query}`,
    articleContentSchema,
  );
  return {
    id: article.id,
    title: article.title,
    blocks: article.blocks ?? [],
    readingTime: article.readingTime ?? '',
    createdDate: article.createdDate,
    thumbnailImageId: article.thumbnailImageUrl,
    contentList: article.contentList ?? undefined,
  };
}
