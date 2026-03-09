function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .replaceAll(/[^a-z0-9\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
}

const stringService = {
  toSlug,

  transformTextToId(text: string): string {
    const slug = toSlug(text);
    return slug ? `#${slug}` : '#';
  },
};

export default stringService;
