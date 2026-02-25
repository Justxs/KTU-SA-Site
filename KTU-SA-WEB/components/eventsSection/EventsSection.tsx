'use client';

import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import { Box } from '@mui/material';
import { EventPreviewDto } from '@api/GetEvents';
import SectionName from '@components/sectionName/SectionName';
import EventCarousel from '@components/eventCarousel/EventCarousel';
import { useTranslations } from 'next-intl';

export default function EventsSection({ events }: Readonly<{ events: Array<EventPreviewDto> }>) {
  const t = useTranslations();

  if (events?.length === 0) return null;

  return (
    <Box sx={{ mb: '44px' }}>
      <SectionName title={t('sections.events')} showArrow />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EventCarousel events={events} />
      </Box>
      <Box>
        <ReadMoreButton title={t('button.events')} path="/events" isCenter />
      </Box>
    </Box>
  );
}
