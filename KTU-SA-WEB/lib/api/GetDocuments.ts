import { buildQuery, toApiLanguage } from './helpers';

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
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/documents${query}`);

  if (!res.ok) {
    console.error(`Failed to fetch documents (${res.status}): ${res.statusText}`);
    return [];
  }

  return res.json();
}
