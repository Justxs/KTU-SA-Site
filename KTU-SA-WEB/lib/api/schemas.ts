import { z } from 'zod';

export const apiDateStringSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), { message: 'Expected a valid date string' });

export const contentBlockSchema = z.object({
  type: z.string(),
  html: z.string().nullish(),
  imageUrl: z.string().nullish(),
  videoUrl: z.string().nullish(),
  pdfUrl: z.string().nullish(),
  imageUrls: z.array(z.string()).nullish(),
});
