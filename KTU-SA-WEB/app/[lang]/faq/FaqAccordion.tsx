'use client';

import React, { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import colors from '@theme/colors';
import { useTranslations } from 'next-intl';
import {
  blocksToPlainText,
  ContentBlockResponse,
  getParagraphBlocks,
  getPdfBlocks,
  getPdfTitleFromUrl,
} from '@api/helpers';
import DocumentListCard from '@components/documents/DocumentListCard';
import DocumentDialog from '@components/documents/DocumentDialog';

type FaqItem = {
  id: string;
  question: string;
  answer: Array<ContentBlockResponse>;
};

type Props = {
  items: FaqItem[];
};

type SelectedPdf = {
  title: string;
  pdfUrl: string;
};

const pdfIconSx = { fontSize: 26, color: colors.mediumBlue, transition: 'color 0.2s ease' };

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
      {/* Search bar */}
      <TextField
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setExpanded(false);
        }}
        placeholder={t('searchPlaceholder')}
        variant="outlined"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.mediumBlue }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            backgroundColor: colors.lightBlueBg,
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            '& fieldset': {
              borderColor: colors.navbarLightBlue,
            },
            '&:hover fieldset': {
              borderColor: colors.lightBlueAccent,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.mediumBlue,
              borderWidth: 2,
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 4px ${colors.mediumBlue}14`,
            },
          },
        }}
      />

      {/* Results indicator */}
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

      {/* No results */}
      {filtered.length === 0 && search.trim() && (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            px: 3,
            borderRadius: '16px',
            backgroundColor: colors.lightBlueBg,
            border: `1px dashed ${colors.navbarLightBlue}`,
          }}
        >
          <HelpOutlineIcon
            sx={{ fontSize: 48, color: colors.lightBlueAccent, mb: 1, opacity: 0.7 }}
          />
          <Typography
            sx={{
              color: colors.grayContact,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {t('noResults')}
          </Typography>
        </Box>
      )}

      {/* FAQ items */}
      {filtered.map((faq, index) => {
        const globalIndex = items.indexOf(faq) + 1;
        const paragraphBlocks = getParagraphBlocks(faq.answer);
        const pdfBlocks = getPdfBlocks(faq.answer);

        return (
          <Accordion
            key={faq.id}
            expanded={expanded === faq.id}
            onChange={handleAccordionChange(faq.id)}
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
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
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
              {/* Number badge */}
              <Box
                sx={{
                  minWidth: 32,
                  height: 32,
                  borderRadius: '10px',
                  backgroundColor: expanded === faq.id ? colors.mediumBlue : colors.navbarLightBlue,
                  color: expanded === faq.id ? colors.white : colors.mediumBlue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  flexShrink: 0,
                }}
              >
                {globalIndex}
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
              {paragraphBlocks.length > 0 && (
                <Box
                  sx={{
                    color: colors.grayContact,
                    fontSize: { xs: 14, sm: 16 },
                    lineHeight: 1.8,
                    '& p': {
                      mt: 0,
                      mb: '12px',
                    },
                    '& p:last-child': {
                      mb: 0,
                    },
                    '& a': {
                      color: colors.linkBlue,
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(35, 131, 212, 0.3)',
                      textDecorationThickness: '1.5px',
                      textUnderlineOffset: '3px',
                    },
                    '& strong, & b': {
                      fontWeight: 700,
                      color: colors.primaryDark,
                    },
                    '& em, & i': {
                      fontStyle: 'italic',
                    },
                    '& ul, & ol': {
                      pl: '24px',
                      mt: 0,
                      mb: '12px',
                    },
                    '& li': {
                      mb: '6px',
                    },
                  }}
                >
                  {paragraphBlocks.map((block, blockIndex) => (
                    <Box
                      // Paragraph HTML comes from trusted CMS content.
                      dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
                      key={`${faq.id}-paragraph-${blockIndex}`}
                    />
                  ))}
                </Box>
              )}

              {pdfBlocks.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    mt: paragraphBlocks.length > 0 ? 2 : 0,
                  }}
                >
                  {pdfBlocks.map((pdfBlock) => {
                    const pdfTitle = getPdfTitleFromUrl(pdfBlock.pdfUrl);

                    return (
                      <DocumentListCard
                        key={`${faq.id}-${pdfBlock.pdfUrl}`}
                        icon={<PictureAsPdfIcon sx={pdfIconSx} />}
                        onClick={() => {
                          setSelectedPdf({ title: pdfTitle, pdfUrl: pdfBlock.pdfUrl });
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: 14, sm: 15 },
                            fontWeight: 600,
                            color: colors.primaryDark,
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {pdfTitle}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: colors.grayText,
                            mt: 0.25,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: 500,
                          }}
                        >
                          PDF
                        </Typography>
                      </DocumentListCard>
                    );
                  })}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}

      <DocumentDialog
        title={selectedPdf?.title}
        pdfUrl={selectedPdf?.pdfUrl}
        open={Boolean(selectedPdf)}
        handleClose={() => setSelectedPdf(null)}
      />
    </Box>
  );
}
