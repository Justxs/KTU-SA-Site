export type DocumentsDto = {
  title: string;
  pdfUrl: string;
};

export type DocumentsCategoriesDto = {
  category: string;
  documents: DocumentsDto[];
};

export async function getDocuments(lang: string): Promise<Array<DocumentsCategoriesDto>> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Documents`);

  return res.json();
}
