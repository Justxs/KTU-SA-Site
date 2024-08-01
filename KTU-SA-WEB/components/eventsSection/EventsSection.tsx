'use client';

import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import styles from './EventsSection.module.css';
import { EventPreviewDto } from '@api/GetEvents';
import SectionName from '@components/sectionName/SectionName';
import EventCarousel from '@components/eventCarousel/EventCarousel';
import { useTranslations } from 'next-intl';

export default function EventsSection({ events }: { events: Array<EventPreviewDto>}) {
  const t = useTranslations();
  
  if (events?.length === 0) return null;

  return (
    <div className={styles.Margin}>
      <SectionName title={t('sections.events')} showArrow />
      <div className={styles.Container}>
        <EventCarousel
          events={events}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <ReadMoreButton
          title={t('button.events')}
          path="/events"
          isCenter
        />
      </div>
    </div>
  );
}
