'use client';

import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Card, Tooltip } from '@mui/material';
import { ReportDocumentDto } from '@api/GetActivityReport';
import SectionName from '@components/sectionName/SectionName';
import DocumentDialog from './DocumentDialog';
import { DocumentsDto } from '@api/GetDocuments';
import colors from '@theme/colors';

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
      <Box
        sx={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          mb: '25px',
          '@media (max-width: 940px)': {
            justifyContent: 'center',
          },
        }}
      >
        {documents.map((doc) => (
          <Tooltip title={doc.title} key={doc.title}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 200,
                minHeight: 200,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  bgcolor: colors.lightBlueBg,
                },
              }}
              onClick={() => {
                setOpen(true);
                setDocument(doc);
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <DescriptionIcon sx={{ fontSize: '100px' }} />
                <Box
                  sx={{
                    fontSize: 23,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    width: 190,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {doc.title}
                </Box>
              </Box>
            </Card>
          </Tooltip>
        ))}
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
