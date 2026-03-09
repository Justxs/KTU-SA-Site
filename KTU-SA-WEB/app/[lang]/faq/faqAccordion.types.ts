import { ContentBlockResponse } from '@api/helpers';

export type FaqItem = {
  id: string;
  question: string;
  answer: Array<ContentBlockResponse>;
};

export type SelectedPdf = {
  title: string;
  pdfUrl: string;
};
