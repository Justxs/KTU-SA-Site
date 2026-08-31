import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';
import { apiFetch } from './client';
import { apiDateStringSchema, contentBlockSchema } from './schemas';
import { pagedSchema, type PagedResult, type PageRequest } from './pagination';
import { z } from 'zod';

const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.array(contentBlockSchema).nullish(),
  modifiedDate: apiDateStringSchema,
});

type FaqDto = {
  id: string;
  question: string;
  answer: Array<ContentBlockResponse>;
  modifiedDate: string;
};

type FaqApiResponse = {
  id: string;
  question: string;
  answer?: Array<ContentBlockResponse> | null;
  modifiedDate: string;
};

const pagedFaqSchema = pagedSchema(faqSchema);

function toFaqDto(faq: FaqApiResponse): FaqDto {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer ?? [],
    modifiedDate: faq.modifiedDate,
  };
}

export async function getFaqsPage(
  lang: string,
  { page, pageSize, search }: PageRequest & { search?: string } = {},
): Promise<PagedResult<FaqDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), page, pageSize, search });
  const response = await apiFetch(`/faqs${query}`, pagedFaqSchema);

  return { ...response, items: response.items.map(toFaqDto) };
}

export async function getFaqs(lang: string, limit: number): Promise<Array<FaqDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), limit });
  const response = await apiFetch(`/faqs${query}`, pagedFaqSchema);

  return response.items.map(toFaqDto);
}
