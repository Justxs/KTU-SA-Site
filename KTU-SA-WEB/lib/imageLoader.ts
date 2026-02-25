interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function wsrvLoader({ src, width, quality }: ImageLoaderParams): string {
  if (src.startsWith('data:')) {
    return src;
  }

  if (src.startsWith('/')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  const url = new URL('https://wsrv.nl/');
  url.searchParams.set('url', src);
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('output', 'webp');

  return url.toString();
}
