'use client';

import React, { useMemo, useState } from 'react';
import { Box, Chip } from '@mui/material';
import colors from '@theme/colors';
import { useTranslations } from 'next-intl';
import { blocksToPlainText } from '@api/helpers';
import DocumentDialog from '@components/documents/DocumentDialog';
import FaqAccordionItem from './FaqAccordionItem';
import FaqEmptyState from './FaqEmptyState';
import FaqSearchField from './FaqSearchField';
import { FaqItem, SelectedPdf } from './faqAccordion.types';

type Props = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: Readonly<Props>) {
  const t = useTranslations('faq');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedPdf, setSelectedPdf] = useState<SelectedPdf | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        blocksToPlainText(faq.answer).toLowerCase().includes(q),
    );
  }, [items, search]);

  const handleAccordionChange = (id: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setExpanded(false);
  };

  const openPdfPreview = (pdfUrl: string, pdfTitle: string) => {
    setSelectedPdf({ title: pdfTitle, pdfUrl });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
      <FaqSearchField
        value={search}
        onChange={handleSearchChange}
        placeholder={t('searchPlaceholder')}
      />

      {search.trim() && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={t('questionsCount', { count: filtered.length })}
            size="small"
            sx={{
              backgroundColor: colors.lightBlueBg,
              color: colors.mediumBlue,
              fontWeight: 600,
              border: `1px solid ${colors.navbarLightBlue}`,
            }}
          />
        </Box>
      )}

      {filtered.length === 0 && search.trim() && <FaqEmptyState message={t('noResults')} />}

      {filtered.map((faq) => (
        <FaqAccordionItem
          key={faq.id}
          expanded={expanded === faq.id}
          faq={faq}
          itemNumber={items.indexOf(faq) + 1}
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
