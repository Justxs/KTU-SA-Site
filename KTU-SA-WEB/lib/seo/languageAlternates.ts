export const SUPPORTED_LOCALES = ['en', 'lt'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: SupportedLocale = 'en';

function normalizePath(path: string): string {
  if (!path || path === '/') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

export function getLocalizedPath(lang: string, path: string): string {
  return `/${lang}${normalizePath(path)}`;
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const normalizedPath = normalizePath(path);

  return {
    en: `/en${normalizedPath}`,
    lt: `/lt${normalizedPath}`,
    'x-default': `/${DEFAULT_LOCALE}${normalizedPath}`,
  };
}
