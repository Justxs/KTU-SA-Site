type DukDto = {
  id: string;
  question: string;
  answer: string;
  modifiedDate: Date;
};

export async function getDuks(lang: string, limit?: number): Promise<Array<DukDto>> {
  const queryParam = limit ? `?limit=${limit}` : '';
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Duks${queryParam}`);

  return res.json();
}
