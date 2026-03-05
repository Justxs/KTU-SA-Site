export type ContentBlockResponse = {
  type: string;
  html?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  pdfUrl?: string | null;
  imageUrls?: Array<string> | null;
};

type ParagraphContentBlock = ContentBlockResponse & {
  type: 'paragraph';
  html: string;
};

type PdfContentBlock = ContentBlockResponse & {
  type: 'pdf';
  pdfUrl: string;
};

const saUnitMap: Record<string, string> = {
  csa: 'CSA',
  infosa: 'InfoSA',
  vivatchemija: 'Vivat_Chemija',
  indi: 'InDi',
  statius: 'STATIUS',
  fumsa: 'FUMSA',
  esa: 'ESA',
  shm: 'SHM',
  vfsa: 'VFSA',
  brk: 'BRK',
};

function stripHtml(html: string): string {
  return html
    .replaceAll(/<[^>]*>/g, ' ')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

function normalizeBlocks(
  blocks: Array<ContentBlockResponse> | null | undefined,
): Array<ContentBlockResponse> {
  return blocks ?? [];
}

function isParagraphBlock(block: ContentBlockResponse): block is ParagraphContentBlock {
  return (
    block.type === 'paragraph' && typeof block.html === 'string' && block.html.trim().length > 0
  );
}

function isPdfBlock(block: ContentBlockResponse): block is PdfContentBlock {
  return block.type === 'pdf' && typeof block.pdfUrl === 'string' && block.pdfUrl.trim().length > 0;
}

export function getParagraphBlocks(
  blocks: Array<ContentBlockResponse> | null | undefined,
): Array<ParagraphContentBlock> {
  return normalizeBlocks(blocks).filter(isParagraphBlock);
}

export function getPdfBlocks(
  blocks: Array<ContentBlockResponse> | null | undefined,
): Array<PdfContentBlock> {
  return normalizeBlocks(blocks).filter(isPdfBlock);
}

export function getPdfTitleFromUrl(pdfUrl: string): string {
  const withoutQuery = pdfUrl.split('?')[0]?.split('#')[0] ?? pdfUrl;
  const fileName = withoutQuery.split('/').findLast(Boolean) ?? '';
  if (!fileName) return pdfUrl;

  let decodedName = fileName;
  try {
    decodedName = decodeURIComponent(fileName);
  } catch {
    decodedName = fileName;
  }

  const normalizedTitle = decodedName
    .replace(/\.pdf$/i, '')
    .replaceAll(/[-_]+/g, ' ')
    .trim();
  return normalizedTitle || decodedName;
}

function parseTimeToSeconds(value: string | null | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d+$/.test(trimmed)) {
    const seconds = Number.parseInt(trimmed, 10);
    return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
  }

  const timeMatch = new RegExp(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i).exec(trimmed);
  if (!timeMatch) return null;

  const hours = Number.parseInt(timeMatch[1] ?? '0', 10);
  const minutes = Number.parseInt(timeMatch[2] ?? '0', 10);
  const seconds = Number.parseInt(timeMatch[3] ?? '0', 10);
  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

export function isDirectVideoFileUrl(videoUrl: string): boolean {
  try {
    const parsed = new URL(videoUrl);
    return /\.(mp4|webm|ogg|mov|m4v)$/i.test(parsed.pathname);
  } catch {
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(videoUrl);
  }
}

function getYoutubeEmbedUrl(
  host: string,
  pathSegments: Array<string>,
  parsed: URL,
): string | null {
  const youtubeHosts = new Set([
    'youtube.com',
    'm.youtube.com',
    'music.youtube.com',
    'youtu.be',
    'youtube-nocookie.com',
  ]);

  if (!youtubeHosts.has(host)) return null;

  let videoId = '';

  if (host === 'youtu.be') {
    videoId = pathSegments[0] ?? '';
  } else if (pathSegments[0] === 'watch') {
    videoId = parsed.searchParams.get('v') ?? '';
  } else if (pathSegments[0] === 'shorts' || pathSegments[0] === 'embed') {
    videoId = pathSegments[1] ?? '';
  }

  if (!videoId) return null;

  const embedParams = new URLSearchParams();
  const startSeconds = parseTimeToSeconds(
    parsed.searchParams.get('start') ?? parsed.searchParams.get('t'),
  );
  if (startSeconds) embedParams.set('start', String(startSeconds));

  const query = embedParams.toString();
  const queryString = query ? `?${query}` : '';
  return `https://www.youtube.com/embed/${videoId}${queryString}`;
}

function getVimeoEmbedUrl(host: string, pathSegments: Array<string>): string | null {
  const vimeoHosts = new Set(['vimeo.com', 'player.vimeo.com']);
  if (!vimeoHosts.has(host)) return null;

  const videoId = pathSegments.find((segment) => /^\d+$/.test(segment)) ?? '';
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
}

export function toVideoEmbedUrl(videoUrl: string): string {
  const trimmed = videoUrl.trim();
  if (!trimmed) return videoUrl;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./i, '').toLowerCase();
    const pathSegments = parsed.pathname.split('/').filter(Boolean);

    const youtubeUrl = getYoutubeEmbedUrl(host, pathSegments, parsed);
    if (youtubeUrl) return youtubeUrl;

    const vimeoUrl = getVimeoEmbedUrl(host, pathSegments);
    if (vimeoUrl) return vimeoUrl;
  } catch {
    return videoUrl;
  }

  return videoUrl;
}

export function blocksToPlainText(blocks: Array<ContentBlockResponse> | null | undefined): string {
  return getParagraphBlocks(blocks)
    .map((block) => stripHtml(block.html))
    .filter(Boolean)
    .join('\r\n\r\n');
}

export function toApiLanguage(lang: string): string {
  const normalized = lang.trim().toLowerCase();
  return normalized === 'lt' || normalized === 'en' ? normalized : lang;
}

export function toApiSaUnit(saUnit: string): string {
  const normalizedKey = saUnit
    .trim()
    .toLowerCase()
    .replaceAll(/[\s_-]/g, '');
  return saUnitMap[normalizedKey] ?? saUnit;
}

export function buildQuery(
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}
