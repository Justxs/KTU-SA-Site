import { getArticles } from '@api/GetArticles';
import { getEvents } from '@api/GetEvents';
import { MetadataRoute } from 'next';

const baseUrl = process.env.KTU_SA_WEB_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles('lt');
  const events = await getEvents('lt');

  const articlesEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/lt/articles/${article.id}`,
    lastModified: new Date(article.createdDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        lt: `${baseUrl}/lt/articles/${article.id}`,
        en: `${baseUrl}/en/articles/${article.id}`,
      },
    },
  }));

  const eventsEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/lt/events/${event.id}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        lt: `${baseUrl}/lt/events/${event.id}`,
        en: `${baseUrl}/en/events/${event.id}`,
      },
    },
  }));

  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/articles', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/fsa', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/documents', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/activity-reports', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/scholarships', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/elders', priority: 0.5, changeFrequency: 'monthly' as const },
    {
      path: '/student-representatives-faculties',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    { path: '/student-representatives', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/emotional-help', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/academic-help', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contacts', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/lt${path}`,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          lt: `${baseUrl}/lt${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    }),
  );

  const fsaUnits = ['VIVAT%20chemija', 'FUMSA', 'InDi', 'SHM', 'STATIUS', 'VFSA', 'ESA', 'InfoSA'];

  const fsaEntries: MetadataRoute.Sitemap = fsaUnits.map((unit) => ({
    url: `${baseUrl}/lt/fsa/${unit}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
    alternates: {
      languages: {
        lt: `${baseUrl}/lt/fsa/${unit}`,
        en: `${baseUrl}/en/fsa/${unit}`,
      },
    },
  }));

  return [...staticEntries, ...fsaEntries, ...articlesEntries, ...eventsEntries];
}
