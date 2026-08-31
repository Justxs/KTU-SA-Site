import { z } from 'zod';

export const MAX_PAGE_SIZE = 100;

const MAX_PAGES_WALKED = 100;

export type PagedResult<T> = {
  items: Array<T>;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PageRequest = {
  page?: number;
  pageSize?: number;
};

export function pagedSchema<Item extends z.ZodType>(itemSchema: Item) {
  return z.object({
    items: z.array(itemSchema),
    page: z.number().int(),
    pageSize: z.number().int(),
    totalCount: z.number().int(),
    totalPages: z.number().int(),
    hasPreviousPage: z.boolean(),
    hasNextPage: z.boolean(),
  });
}

export async function fetchAllPages<T>(
  fetchPage: (page: number, pageSize: number) => Promise<PagedResult<T>>,
): Promise<Array<T>> {
  const items: Array<T> = [];

  for (let page = 1; page <= MAX_PAGES_WALKED; page += 1) {
    const result = await fetchPage(page, MAX_PAGE_SIZE);
    items.push(...result.items);

    if (!result.hasNextPage) break;
  }

  return items;
}

export function parsePageParam(value: string | Array<string> | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '', 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
