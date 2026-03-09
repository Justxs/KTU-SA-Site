'use client';

import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import colors from '@theme/colors';
import FaqAnswerContent from './FaqAnswerContent';
import { FaqItem } from './faqAccordion.types';

type Props = {
  expanded: boolean;
  faq: FaqItem;
  itemNumber: number;
  onChange: (_: React.SyntheticEvent, isExpanded: boolean) => void;
  onOpenPdf: (pdfUrl: string, pdfTitle: string) => void;
};

export default function FaqAccordionItem({
  expanded,
  faq,
  itemNumber,
  onChange,
  onOpenPdf,
}: Readonly<Props>) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      disableGutters
      elevation={0}
      sx={{
        border: `1px solid ${colors.navbarLightBlue}`,
        borderRadius: '14px !important',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
        '&:hover': {
          borderColor: colors.lightBlueAccent,
          boxShadow: `0 4px 20px ${colors.mediumBlue}10`,
        },
        '&::before': { display: 'none' },
        '&.Mui-expanded': {
          borderColor: colors.mediumBlue,
          boxShadow: `0 6px 28px ${colors.mediumBlue}18`,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: colors.mediumBlue,
              fontSize: 28,
              transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        }
        aria-controls={`faq-${itemNumber - 1}-content`}
        id={`faq-${itemNumber - 1}-header`}
        sx={{
          background: colors.lightBlueBg,
          px: 3,
          py: 1,
          minHeight: 68,
          '&.Mui-expanded': {
            borderBottom: `1px solid ${colors.navbarLightBlue}`,
          },
          '& .MuiAccordionSummary-content': {
            my: 1.5,
            alignItems: 'center',
            gap: 2,
          },
        }}
      >
        <Box
          sx={{
            minWidth: 32,
            height: 32,
            borderRadius: '10px',
            backgroundColor: expanded ? colors.mediumBlue : colors.navbarLightBlue,
            color: expanded ? colors.white : colors.mediumBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 14,
            transition: 'background-color 0.3s ease, color 0.3s ease',
            flexShrink: 0,
          }}
        >
          {itemNumber}
        </Box>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 15, sm: 17 },
            fontWeight: 600,
            color: colors.primaryDark,
            lineHeight: 1.5,
          }}
        >
          {faq.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: 3,
          py: 2.5,
          pl: { xs: 3, sm: 8 },
          background: colors.white,
        }}
      >
        <FaqAnswerContent answer={faq.answer} faqId={faq.id} onOpenPdf={onOpenPdf} />
      </AccordionDetails>
    </Accordion>
  );
}
