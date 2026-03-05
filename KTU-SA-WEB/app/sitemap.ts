import { getArticles } from '@api/GetArticles';
import { getEvents } from '@api/GetEvents';
import { FSA_ROUTE_NAMES } from '@constants/FsaRouteNames';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/lib/seo/languageAlternates';
import { getBaseUrl } from '@/lib/seo/siteUrl';
import { MetadataRoute } from 'next';

const baseUrl = getBaseUrl();
const allLocales = new Set<SupportedLocale>(SUPPORTED_LOCALES);

type DynamicEntryState = {
  locales: Set<SupportedLocale>;
  lastModified?: Date;
};

type DynamicInput = {
  id: string;
  lastModified?: string | Date;
};

function parseDate(value: string | Date | undefined): Date | undefined {
  if (!value) return undefined;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function localizedUrl(locale: SupportedLocale, path: string): string {
  return `${baseUrl}/${locale}${path}`;
}

function buildSitemapAlternates(path: string, locales: Set<SupportedLocale>): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    if (locales.has(locale)) {
      languages[locale] = localizedUrl(locale, path);
    }
  }

  const defaultLocale = locales.has('en')
    ? 'en'
    : SUPPORTED_LOCALES.find((locale) => locales.has(locale));

  if (defaultLocale) {
    languages['x-default'] = localizedUrl(defaultLocale, path);
  }

  return languages;
}

function upsertDynamicState(
  map: Map<string, DynamicEntryState>,
  id: string,
  locale: SupportedLocale,
  lastModifiedRaw?: string | Date,
): void {
  const existing = map.get(id) ?? { locales: new Set<SupportedLocale>() };
  existing.locales.add(locale);

  const parsedDate = parseDate(lastModifiedRaw);
  if (parsedDate && (!existing.lastModified || parsedDate > existing.lastModified)) {
    existing.lastModified = parsedDate;
  }

  map.set(id, existing);
}

function createDynamicEntries(
  itemsByLocale: Readonly<Record<SupportedLocale, Array<DynamicInput>>>,
  pathBuilder: (encodedId: string) => string,
  changeFrequency: 'daily' | 'weekly' | 'monthly',
  priority: number,
): MetadataRoute.Sitemap {
  const stateById = new Map<string, DynamicEntryState>();

  for (const locale of SUPPORTED_LOCALES) {
    for (const item of itemsByLocale[locale]) {
      upsertDynamicState(stateById, item.id, locale, item.lastModified);
    }
  }

  return Array.from(stateById.entries()).map(([id, state]) => {
    const encodedId = encodeURIComponent(id);
    const path = pathBuilder(encodedId);
    const primaryLocale: SupportedLocale = state.locales.has('lt') ? 'lt' : 'en';

    return {
      url: localizedUrl(primaryLocale, path),
      ...(state.lastModified ? { lastModified: state.lastModified } : {}),
      changeFrequency,
      priority,
      alternates: {
        languages: buildSitemapAlternates(path, state.locales),
      },
    };
  });
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ltArticles, enArticles, ltEvents, enEvents] = await Promise.all([
    getArticles('lt'),
    getArticles('en'),
    getEvents('lt'),
    getEvents('en'),
  ]);

  const articlesEntries = createDynamicEntries(
    {
      lt: ltArticles.map((article) => ({ id: article.id, lastModified: article.createdDate })),
      en: enArticles.map((article) => ({ id: article.id, lastModified: article.createdDate })),
    },
    (encodedId) => `/articles/${encodedId}`,
    'monthly',
    0.7,
  );

  const eventsEntries = createDynamicEntries(
    {
      lt: ltEvents.map((event) => ({ id: event.id, lastModified: event.startDate })),
      en: enEvents.map((event) => ({ id: event.id, lastModified: event.startDate })),
    },
    (encodedId) => `/events/${encodedId}`,
    'weekly',
    0.6,
  );

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
      url: localizedUrl('lt', path),
      changeFrequency,
      priority,
      alternates: {
        languages: buildSitemapAlternates(path, allLocales),
      },
    }),
  );

  const fsaEntries: MetadataRoute.Sitemap = FSA_ROUTE_NAMES.map((unit) => {
    const path = `/fsa/${encodeURIComponent(unit)}`;

    return {
      url: localizedUrl('lt', path),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: buildSitemapAlternates(path, allLocales),
      },
    };
  });

  return [...staticEntries, ...fsaEntries, ...articlesEntries, ...eventsEntries];
}
