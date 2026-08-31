export type PageToken = {
  key: string;
  page: number | null;
};

export function buildPageWindow(page: number, totalPages: number, siblings = 1): Array<PageToken> {
  if (totalPages <= 1) return [];

  const shown = new Set<number>([1, totalPages]);

  for (let offset = -siblings; offset <= siblings; offset += 1) {
    const candidate = page + offset;
    if (candidate >= 1 && candidate <= totalPages) shown.add(candidate);
  }

  const tokens: Array<PageToken> = [];
  let previous = 0;

  for (const current of [...shown].sort((a, b) => a - b)) {
    if (previous && current - previous > 1) {
      tokens.push({ key: `gap-${previous}-${current}`, page: null });
    }

    tokens.push({ key: `page-${current}`, page: current });
    previous = current;
  }

  return tokens;
}
