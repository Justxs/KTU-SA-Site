import React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useFetchDuk } from '../../hooks/useFetchDuk';
import HeroImage from '../../components/heroImage/HeroImage';
import Smiley from '../../components/iconElements/Smiley';

export default function FaqList() {
  const { t } = useTranslation();

  const { data: duks, isLoading, error } = useFetchDuk();
  if (isLoading || error) {
    return null;
  }
  return (
    <>
      <HeroImage sectionName={t('sections.duk')} />
      {duks && duks.map((faq) => (
        <Accordion key={faq.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ background: '#F1F7FE' }}

          >
            <h2 style={{ margin: '0' }}>{faq.question}</h2>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Smiley />
    </>
  );
}
