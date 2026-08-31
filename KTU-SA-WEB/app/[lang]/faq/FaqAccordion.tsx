'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import DocumentDialog from '@components/documents/DocumentDialog';
import FaqAccordionItem from './FaqAccordionItem';
import { FaqItem, SelectedPdf } from './faqAccordion.types';

type Props = {
  items: FaqItem[];
  startNumber: number;
};

export default function FaqAccordion({ items, startNumber }: Readonly<Props>) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedPdf, setSelectedPdf] = useState<SelectedPdf | null>(null);

  const handleAccordionChange = (id: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  const openPdfPreview = (pdfUrl: string, pdfTitle: string) => {
    setSelectedPdf({ title: pdfTitle, pdfUrl });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {items.map((faq, index) => (
        <FaqAccordionItem
          key={faq.id}
          expanded={expanded === faq.id}
          faq={faq}
          itemNumber={startNumber + index}
          onChange={handleAccordionChange(faq.id)}
          onOpenPdf={openPdfPreview}
        />
      ))}

      <DocumentDialog
        title={selectedPdf?.title}
        pdfUrl={selectedPdf?.pdfUrl}
        open={Boolean(selectedPdf)}
        handleClose={() => setSelectedPdf(null)}
      />
    </Box>
  );
}
