'use client';

import { ReportDocumentDto } from '@api/GetActivityReport';
import EmptyData from '@components/emptyData/EmptyData';
import { Box, Card, Tooltip } from '@mui/material';
import dateService from '@utils/dateService';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DocumentDialog from '@components/documents/DocumentDialog';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';
import { focusOutline } from '@theme/styles';

export default function ActivityReport({
  reports,
}: Readonly<{ reports: Array<ReportDocumentDto> }>) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState<ReportDocumentDto>();
  const t = useTranslations();

  const formatTitle = (doc?: ReportDocumentDto): string => {
    if (doc === undefined) {
      return '';
    }

    return `${dateService.formatToDate(doc.from)} - ${dateService.formatToDate(doc.to)}`;
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: '30px', mb: '150px', flexWrap: 'wrap' }}>
        <EmptyData length={reports?.length} />
        {reports.map((report) => (
          <Tooltip
            title={`${t('activityReports.activityReport')} ${formatTitle(report)}`}
            key={report.id}
          >
            <Card
              variant="outlined"
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(true);
                  setDocument(report);
                }
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: 200,
                cursor: 'pointer',
                transition: '0.3s',
                p: '20px',
                '&:hover': {
                  bgcolor: colors.lightBlueBg,
                },
                ...focusOutline,
              }}
              onClick={() => {
                setOpen(true);
                setDocument(report);
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
                <Box sx={{ fontSize: 23, textAlign: 'center', width: 250 }}>
                  {t('activityReports.activityReport')}
                  <br />
                  {formatTitle(report)}
                </Box>
              </Box>
            </Card>
          </Tooltip>
        ))}
      </Box>
      <DocumentDialog
        title={formatTitle(document)}
        pdfUrl={document?.pdfUrl}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}
