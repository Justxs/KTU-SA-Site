import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';
import { apiFetch } from './client';
import { apiDateStringSchema, contentBlockSchema } from './schemas';
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

export async function getFaqs(lang: string, limit?: number): Promise<Array<FaqDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), limit });
  const faqs: Array<FaqApiResponse> = await apiFetch(`/faqs${query}`, z.array(faqSchema));
  return faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer ?? [],
    modifiedDate: faq.modifiedDate,
  }));
}
