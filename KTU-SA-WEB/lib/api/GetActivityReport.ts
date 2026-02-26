export type ReportDocumentDto = {
  id: string;
  title?: string;
  pdfUrl: string;
  from: Date;
  to: Date;
};

export async function getActivityReports(
  lang: string,
  saUnit: string,
): Promise<Array<ReportDocumentDto>> {
  const res = await fetch(
    `${process.env.KTU_SA_WEB_API_URL}/${lang}/ActivityReports/SaUnits/${saUnit}`,
  );

  if (!res.ok) {
    console.error(`Failed to fetch activity reports (${res.status}): ${res.statusText}`);
    return [];
  }

  return res.json();
}
