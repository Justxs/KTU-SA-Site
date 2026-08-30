import type { z } from 'zod';

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_REVALIDATE_SECONDS = 3_600;
const MAX_ATTEMPTS = 2;

let cachedApiBaseUrl: string | null = null;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ApiRequestError';
  }
}

function getApiBaseUrl(): string {
  if (cachedApiBaseUrl) return cachedApiBaseUrl;

  const value = process.env.KTU_SA_WEB_API_URL?.trim();
  if (!value) {
    throw new ApiRequestError(
      'KTU_SA_WEB_API_URL is required. Add it to .env.local before starting the application.',
    );
  }

  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('Only HTTP and HTTPS URLs are supported.');
    }

    cachedApiBaseUrl = `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
    return cachedApiBaseUrl;
  } catch (error) {
    throw new ApiRequestError(
      `KTU_SA_WEB_API_URL is not a valid HTTP(S) URL: "${value}".`,
      undefined,
      {
        cause: error,
      },
    );
  }
}

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

async function fetchWithRetry(path: string): Promise<Response> {
  const url = buildApiUrl(path);
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });

      if (response.ok || !isRetryableStatus(response.status) || attempt === MAX_ATTEMPTS) {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === MAX_ATTEMPTS) break;
    }
  }

  throw new ApiRequestError(`Unable to reach the KTU SA API at ${url}.`, undefined, {
    cause: lastError,
  });
}

export async function apiFetch<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  const response = await fetchWithRetry(path);

  if (!response.ok) {
    throw new ApiRequestError(
      `KTU SA API request failed for ${path} (${response.status}): ${response.statusText}`,
      response.status,
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    throw new ApiRequestError(`KTU SA API returned invalid JSON for ${path}.`, response.status, {
      cause: error,
    });
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`)
      .join('; ');
    throw new ApiRequestError(`KTU SA API returned an invalid response for ${path}: ${issues}`);
  }

  return result.data;
}

export function isApiNotFoundError(error: unknown): boolean {
  return error instanceof ApiRequestError && error.status === 404;
}
