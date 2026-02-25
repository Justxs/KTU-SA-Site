import { getArticles } from '@api/GetArticles';
import { getEvents } from '@api/GetEvents';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles('lt');
  const events = await getEvents('lt');

  const articlesLtEntires: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${process.env.KTU_SA_WEB_URL}/lt/articles/${article.id}`,
    lastModified: new Date(article.createdDate),
  }));

  const articlesEnEntires: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${process.env.KTU_SA_WEB_URL}/en/articles/${article.id}`,
    lastModified: new Date(article.createdDate),
  }));

  const eventsLtEntires: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${process.env.KTU_SA_WEB_URL}/lt/events/${event.id}`,
  }));

  const eventsEnEntires: MetadataRoute.Sitemap = events.map((article) => ({
    url: `${process.env.KTU_SA_WEB_URL}/en/events/${article.id}`,
  }));

  return [
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/VIVAT%20chemija`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/VIVAT%20chemija`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/FUMSA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/FUMSA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/InDi`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/InDi`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/SHM`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/SHM`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/STATIUS`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/STATIUS`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/VFSA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/VFSA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/ESA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/ESA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/fsa/InfoSA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/fsa/InfoSA`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/about-us`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/about-us`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/documents`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/documents`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/activity-reports`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/activity-reports`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/scholarships`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/scholarships`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/articles`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/articles`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/events`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/events`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/elders`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/elders`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/student-representatives-faculties`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/student-representatives-faculties`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/student-representatives`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/student-representatives`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/faq`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/faq`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/emotional-help`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/emotional-help`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/academic-help`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/academic-help`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/lt/contacts`,
    },
    {
      url: `${process.env.KTU_SA_WEB_URL}/en/contacts`,
    },
    ...articlesLtEntires,
    ...articlesEnEntires,
    ...eventsLtEntires,
    ...eventsEnEntires,
  ];
}
