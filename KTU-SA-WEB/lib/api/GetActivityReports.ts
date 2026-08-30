import { buildQuery, toApiLanguage, toApiSaUnit } from './helpers';
import { apiFetch } from './client';
import { apiDateStringSchema } from './schemas';
import { z } from 'zod';

const reportDocumentSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  pdfUrl: z.string(),
  from: apiDateStringSchema,
  to: apiDateStringSchema,
});

const activityReportsSchema = z.array(reportDocumentSchema);

export type ReportDocumentDto = {
  id: string;
  title?: string;
  pdfUrl: string;
  from: string;
  to: string;
};

export async function getActivityReports(
  lang: string,
  saUnit: string,
): Promise<Array<ReportDocumentDto>> {
  const saUnitParam = encodeURIComponent(toApiSaUnit(saUnit));
  const query = buildQuery({ language: toApiLanguage(lang) });
  return apiFetch(`/sa-units/${saUnitParam}/activity-reports${query}`, activityReportsSchema);
}
