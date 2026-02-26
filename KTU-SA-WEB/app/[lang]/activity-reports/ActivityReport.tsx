'use client';

import { ReportDocumentDto } from '@api/GetActivityReport';
import EmptyData from '@components/emptyData/EmptyData';
import DocumentDialog from '@components/documents/DocumentDialog';
import DocumentListCard from '@components/documents/DocumentListCard';
import { Box, Typography } from '@mui/material';
import dateService from '@utils/dateService';
import { useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';

const pdfIconSx = { fontSize: 26, color: colors.mediumBlue, transition: 'color 0.2s ease' };

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 8 }}>
        <EmptyData length={reports?.length} />
        {reports.map((report) => (
          <DocumentListCard
            key={report.id}
            icon={<PictureAsPdfIcon sx={pdfIconSx} />}
            onClick={() => {
              setOpen(true);
              setDocument(report);
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
              {t('activityReports.activityReport')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
              <CalendarTodayIcon sx={{ fontSize: 13, color: colors.grayText }} />
              <Typography
                sx={{
                  fontSize: 12,
                  color: colors.grayText,
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                }}
              >
                {formatTitle(report)}
              </Typography>
            </Box>
          </DocumentListCard>
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
