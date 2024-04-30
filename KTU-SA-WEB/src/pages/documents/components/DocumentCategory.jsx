import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from '@mui/icons-material/Description';
import { Card, Tooltip } from '@mui/material';
import SectionName from '../../../components/sectionName/SectionName';
import DocumentDialog from './DocumentDialog';
import styles from '../Documents.module.css';

export default function DocumentCategory({ category, documents }) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState(null);

  if (documents.length === 0) {
    return null;
  }

  return (
    <>
      <SectionName title={category} />
      <div className={styles.Container}>
        {documents.map((doc) => (
          <Tooltip title={doc.title}>
            <Card
              variant="outlined"
              key={doc.title}
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

DocumentCategory.propTypes = {
  category: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(Object).isRequired,
};
