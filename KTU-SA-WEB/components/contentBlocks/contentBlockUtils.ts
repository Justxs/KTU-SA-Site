import { ContentBlockResponse } from '@api/helpers';
import stringService from '@utils/stringService';

export function getBlockContentKey(block: ContentBlockResponse): string {
  if (block.type === 'paragraph') return `paragraph-${block.html ?? ''}`;
  if (block.type === 'image') return `image-${block.imageUrl ?? ''}`;
  if (block.type === 'video') return `video-${block.videoUrl ?? ''}`;
  if (block.type === 'pdf') return `pdf-${block.pdfUrl ?? ''}`;
  if (block.type === 'carousel') return `carousel-${(block.imageUrls ?? []).join('|')}`;
  return block.type;
}

export function addHeadingIds(html: string, usedIds: Map<string, number>): string {
  return html.replaceAll(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (fullMatch, level, attrs, inner) => {
      const headingText = inner
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();
      const slug = stringService.toSlug(headingText);
      if (!slug) return fullMatch;

      const count = (usedIds.get(slug) ?? 0) + 1;
      usedIds.set(slug, count);
      const uniqueId = count === 1 ? slug : `${slug}-${count}`;
      const attrsWithoutId = String(attrs).replaceAll(/\sid\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '');

      return `<h${level}${attrsWithoutId} id="${uniqueId}">${inner}</h${level}>`;
    },
  );
}
