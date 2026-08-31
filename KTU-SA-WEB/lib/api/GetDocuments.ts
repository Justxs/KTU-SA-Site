import { buildQuery, toApiLanguage } from './helpers';
import { apiFetch } from './client';
import { z } from 'zod';

const documentsCategorySchema = z.object({
  category: z.string(),
  documents: z.array(
    z.object({
      title: z.string(),
      pdfUrl: z.string(),
    }),
  ),
});

export type DocumentsDto = {
  title: string;
  pdfUrl: string;
};

type DocumentsCategoriesDto = {
  category: string;
  documents: DocumentsDto[];
};

function dedupeDocuments(documents: Array<DocumentsDto>): Array<DocumentsDto> {
  const seen = new Set<string>();

  return documents.filter((document) => {
    const key = `${document.title}|${document.pdfUrl}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

export async function getDocuments(lang: string): Promise<Array<DocumentsCategoriesDto>> {
  const query = buildQuery({ language: toApiLanguage(lang) });
  const categories = await apiFetch(`/documents${query}`, z.array(documentsCategorySchema));

  return categories.map((category) => ({
    category: category.category,
    documents: dedupeDocuments(category.documents),
  }));
}
