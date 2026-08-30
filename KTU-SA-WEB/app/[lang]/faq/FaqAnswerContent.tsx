'use client';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Typography } from '@mui/material';
import colors from '@theme/colors';
import {
  ContentBlockResponse,
  getParagraphBlocks,
  getPdfBlocks,
  getPdfTitleFromUrl,
} from '@api/helpers';
import DocumentListCard from '@components/documents/DocumentListCard';
import { sanitizeCmsHtml } from '@/lib/content/sanitizeCmsHtml';

type Props = {
  faqId: string;
  onOpenPdf: (pdfUrl: string, pdfTitle: string) => void;
  answer: Array<ContentBlockResponse>;
};

const pdfIconSx = { fontSize: 26, color: colors.mediumBlue, transition: 'color 0.2s ease' };

export default function FaqAnswerContent({ faqId, onOpenPdf, answer }: Readonly<Props>) {
  const paragraphBlocks = getParagraphBlocks(answer);
  const pdfBlocks = getPdfBlocks(answer);
  const paragraphKeyCounts = new Map<string, number>();

  const getParagraphKey = (html: string) => {
    const baseKey = `${faqId}-paragraph-${html}`;
    const count = paragraphKeyCounts.get(baseKey) ?? 0;
    paragraphKeyCounts.set(baseKey, count + 1);
    return count === 0 ? baseKey : `${baseKey}-${count}`;
  };

  return (
    <>
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
          {paragraphBlocks.map((block) => (
            <Box
              dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(block.html) }}
              key={getParagraphKey(block.html ?? '')}
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
                key={`${faqId}-${pdfBlock.pdfUrl}`}
                icon={<PictureAsPdfIcon sx={pdfIconSx} />}
                onClick={() => onOpenPdf(pdfBlock.pdfUrl, pdfTitle)}
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
    </>
  );
}
