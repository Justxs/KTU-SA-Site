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
  htmlBody: string;
  readingTime: string;
  createdDate: Date;
  thumbnailImageId: string;
  contentList?: Array<string>;
};

export async function getArticles(lang: string, limit?: number): Promise<Array<ArticleDto>> {
  const queryParam = limit ? `?limit=${limit}` : '';
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Articles${queryParam}`);

  return res.json();
}

export async function getArticle(lang: string, id: string): Promise<ArticleContentDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Articles/${id}`);

  return res.json();
}
