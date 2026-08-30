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

export async function getDocuments(lang: string): Promise<Array<DocumentsCategoriesDto>> {
  const query = buildQuery({ language: toApiLanguage(lang) });
  return apiFetch(`/documents${query}`, z.array(documentsCategorySchema));
}
