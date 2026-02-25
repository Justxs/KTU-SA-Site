interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function wsrvLoader({ src, width, quality }: ImageLoaderParams): string {
  // Local/relative images — serve as-is without the proxy
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }

  const url = new URL('https://wsrv.nl/');
  url.searchParams.set('url', src);
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('output', 'webp');

  return url.toString();
}
