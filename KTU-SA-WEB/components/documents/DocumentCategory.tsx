'use client';

import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Typography } from '@mui/material';
import { ReportDocumentDto } from '@api/GetActivityReport';
import SectionName from '@components/sectionName/SectionName';
import DocumentDialog from './DocumentDialog';
import DocumentListCard from './DocumentListCard';
import { DocumentsDto } from '@api/GetDocuments';
import colors from '@theme/colors';

const iconSx = { fontSize: 26, color: colors.mediumBlue, transition: 'color 0.2s ease' };

export default function DocumentCategory({
  category,
  documents,
}: Readonly<{ category: string; documents: Array<ReportDocumentDto | DocumentsDto> }>) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState<ReportDocumentDto | DocumentsDto>();

  if (documents.length === 0) {
    return null;
  }

  return (
    <>
      <SectionName title={category} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {documents.map((doc) => {
          const isPdf = doc.pdfUrl?.toLowerCase().endsWith('.pdf');

          return (
            <DocumentListCard
              key={doc.title}
              icon={isPdf ? <PictureAsPdfIcon sx={iconSx} /> : <DescriptionIcon sx={iconSx} />}
              onClick={() => {
                setOpen(true);
                setDocument(doc);
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
                {doc.title}
              </Typography>
              {isPdf && (
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
              )}
            </DocumentListCard>
          );
        })}
      </Box>
      <DocumentDialog
        title={document?.title}
        pdfUrl={document?.pdfUrl}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}
