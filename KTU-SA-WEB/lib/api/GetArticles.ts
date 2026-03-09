import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';

export type ArticleDto = {
  id: string;
  title: string;
  preview: string;
  createdDate: Date;
  thumbnailImageId: string;
};

export type ArticleContentDto = {
  id: string;
  title: string;
  blocks: Array<ContentBlockResponse>;
  readingTime: string;
  createdDate: Date;
  thumbnailImageId: string;
  contentList?: Array<string>;
};

type ArticlePreviewApiResponse = {
  id: string;
  title: string;
  preview: string;
  createdDate: Date;
  thumbnailImageUrl: string;
};

type ArticleContentApiResponse = {
  id: string;
  title: string;
  blocks?: Array<ContentBlockResponse> | null;
  readingTime?: string | null;
  createdDate: Date;
  thumbnailImageUrl: string;
  contentList?: Array<string> | null;
};

export async function getArticles(lang: string, limit?: number): Promise<Array<ArticleDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), limit });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/articles${query}`);

  if (!res.ok) {
    console.error(`Failed to fetch articles (${res.status}): ${res.statusText}`);
    return [];
  }

  const articles: Array<ArticlePreviewApiResponse> = await res.json();
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
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/articles/${articleId}${query}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch article ${id} (${res.status}): ${res.statusText}`);
  }

  const article: ArticleContentApiResponse = await res.json();
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
