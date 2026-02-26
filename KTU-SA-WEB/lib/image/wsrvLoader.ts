import type { ImageLoader } from 'next/image';

export const wsrvLoader: ImageLoader = ({ src, width, quality }) => {
  const q = typeof quality === 'number' ? `&q=${quality}` : '';
  // Force WebP output to ensure cached images are stored and delivered as WebP
  const format = `&output=webp`;
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}${q}${format}`;
};

export default wsrvLoader;
