import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';
import { apiFetch } from './client';
import { apiDateStringSchema, contentBlockSchema } from './schemas';
import { fetchAllPages, pagedSchema, type PagedResult, type PageRequest } from './pagination';
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

const pagedArticlePreviewSchema = pagedSchema(articlePreviewSchema);

function toArticleDto(article: ArticlePreviewApiResponse): ArticleDto {
  return {
    id: article.id,
    title: article.title,
    preview: article.preview,
    createdDate: article.createdDate,
    thumbnailImageId: article.thumbnailImageUrl,
  };
}

export async function getArticlesPage(
  lang: string,
  { page, pageSize }: PageRequest = {},
): Promise<PagedResult<ArticleDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), page, pageSize });
  const response = await apiFetch(`/articles${query}`, pagedArticlePreviewSchema);

  return { ...response, items: response.items.map(toArticleDto) };
}

export async function getArticles(lang: string, limit: number): Promise<Array<ArticleDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), limit, pageSize: limit });
  const response = await apiFetch(`/articles${query}`, pagedArticlePreviewSchema);

  return response.items.map(toArticleDto);
}

export async function getAllArticles(lang: string): Promise<Array<ArticleDto>> {
  return fetchAllPages((page, pageSize) => getArticlesPage(lang, { page, pageSize }));
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
