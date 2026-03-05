const DEFAULT_BASE_URL = 'http://localhost:3000';

let cachedBaseUrl: string | null = null;

function normalizeBaseUrl(input: string): string {
  const trimmed = input.trim().replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_BASE_URL;

  try {
    const parsed = new URL(trimmed);
    const normalizedPath = parsed.pathname.replace(/\/+$/, '');
    return `${parsed.origin}${normalizedPath === '/' ? '' : normalizedPath}`;
  } catch {
    console.warn(
      `Invalid KTU_SA_WEB_URL value "${input}". Falling back to ${DEFAULT_BASE_URL}.`,
    );
    return DEFAULT_BASE_URL;
  }
}

export function getBaseUrl(): string {
  if (cachedBaseUrl) return cachedBaseUrl;

  cachedBaseUrl = normalizeBaseUrl(process.env.KTU_SA_WEB_URL ?? DEFAULT_BASE_URL);
  return cachedBaseUrl;
}

export function getMetadataBase(): URL {
  return new URL(`${getBaseUrl()}/`);
}

export function toAbsoluteUrl(path: string): string {
  if (!path) return getBaseUrl();
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}
