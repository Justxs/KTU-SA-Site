'use client';

import { ReportDocumentDto } from '@api/GetActivityReport';
import EmptyData from '@components/emptyData/EmptyData';
import { Card, Tooltip } from '@mui/material';
import dateService from '@utils/dateService';
import styles from './ActivityReport.module.css';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DocumentDialog from '@components/documents/DocumentDialog';
import { useTranslations } from 'next-intl';

export default function ActivityReport({reports} : {reports : Array<ReportDocumentDto>}) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState<ReportDocumentDto>();
  const t = useTranslations();

  const formatTitle = (doc? : ReportDocumentDto) : string => {
    if (doc === undefined) {
      return '';
    }

    return `${dateService.formatToDate(doc.from)} - ${dateService.formatToDate(doc.to)}`;
  };

  return (
    <>
      <div className={styles.Container}>
        <EmptyData length={reports?.length} />
        {reports.map((report) => (
          <Tooltip title={t('activityReports.activityReport') + ' ' + formatTitle(report)} 
            key={report.id}
          >
            <Card
              variant="outlined"
              className={styles.Card}
              onClick={() => {
                setOpen(true);
                setDocument(report);
              }}
            >
              <div className={styles.CardContent}>
                <DescriptionIcon sx={{ fontSize: '100px' }} />
                <div className={styles.Text}>
                  {t('activityReports.activityReport')}
                  <br />
                  {formatTitle(report)}
                </div>
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
      <DocumentDialog
        title={formatTitle(document)}
        pdfUrl={document?.pdfUrl}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}
