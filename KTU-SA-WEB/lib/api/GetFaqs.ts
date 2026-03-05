import { buildQuery, ContentBlockResponse, toApiLanguage } from './helpers';

type FaqDto = {
  id: string;
  question: string;
  answer: Array<ContentBlockResponse>;
  modifiedDate: Date;
};

type FaqApiResponse = {
  id: string;
  question: string;
  answer?: Array<ContentBlockResponse> | null;
  modifiedDate: Date;
};

export async function getFaqs(lang: string, limit?: number): Promise<Array<FaqDto>> {
  const query = buildQuery({ language: toApiLanguage(lang), limit });
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/faqs${query}`);

  if (!res.ok) {
    console.error(`Failed to fetch FAQs (${res.status}): ${res.statusText}`);
    return [];
  }

  const faqs: Array<FaqApiResponse> = await res.json();
  return faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer ?? [],
    modifiedDate: faq.modifiedDate,
  }));
}
