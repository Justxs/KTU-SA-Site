'use client';

import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Card, Tooltip } from '@mui/material';
import styles from './Documents.module.css';
import { ReportDocumentDto } from '@api/GetActivityReport';
import SectionName from '@components/sectionName/SectionName';
import DocumentDialog from './DocumentDialog';
import { DocumentsDto } from '@api/GetDocuments';

export default function DocumentCategory({ category, documents } : { category : string, documents : Array<ReportDocumentDto | DocumentsDto> }) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState<ReportDocumentDto | DocumentsDto>();

  if (documents.length === 0) {
    return null;
  }

  return (
    <>
      <SectionName title={category} />
      <div className={styles.Container}>
        {documents.map((doc) => (
          <Tooltip 
            title={doc.title} 
            key={doc.title}
          >
            <Card
              variant="outlined"
              className={styles.Card}
              onClick={() => {
                setOpen(true);
                setDocument(doc);
              }}
            >
              <div className={styles.CardContent}>
                <DescriptionIcon sx={{ fontSize: '100px' }} />
                <div className={styles.Text}>{doc.title}</div>
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
      <DocumentDialog
        title={document?.title}
        pdfUrl={document?.pdfUrl}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

