import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Tooltip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import HeroImage from '../../components/heroImage/HeroImage';
import { useFetchActivityReports } from '../../hooks/useFetchActivityReports';
import { SA_UNITS } from '../../constants/saUnits';
import SectionName from '../../components/sectionName/SectionName';
import styles from './ActivityReport.module.css';
import DocumentDialog from '../documents/components/DocumentDialog';
import dateService from '../../services/dateService';
import Smiley from '../../components/iconElements/Smiley';

export default function ActivityReport() {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const { t } = useTranslation();
  const { data: reports, isLoading, error } = useFetchActivityReports(SA_UNITS.CSA);

  if (isLoading || error) {
    return null;
  }

  return (
    <>
      <HeroImage sectionName={t('navbar.about.activityReports')} />
      <SectionName title={t('sections.activityReports')} showArrow />
      <div className={styles.Container}>
        {reports.map((report) => (
          <Tooltip title={`${dateService.formatToDate(report.from)} - ${dateService.formatToDate(report.to)}`}>
            <Card
              variant="outlined"
              className={styles.Card}
              onClick={() => {
                setOpen(true);
                setDocument(report);
              }}
              key={report.Id}
            >
              <div className={styles.CardContent}>
                <DescriptionIcon sx={{ fontSize: '100px' }} />
                <div className={styles.Text}>
                  {`${dateService.formatToDate(report.from)} - ${dateService.formatToDate(report.to)}`}
                </div>
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
      <Smiley />
      <DocumentDialog
        title={`${dateService.formatToDate(document?.from)} - ${dateService.formatToDate(document?.to)}`}
        pdfUrl={document?.pdfUrl}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}
