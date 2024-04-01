import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionName from '../../../../components/sectionName/SectionName';
import ReadMoreButton from '../../../../components/readMoreButton/ReadMoreButton';
import styles from './Events.module.css';
import EventCarousel from '../../../../components/eventCarousel/EventCarousel';
import { useFetchEvents } from '../../../../hooks/useFetchEvents';

export default function Events() {
  const { t } = useTranslation();
  const { data: events, isLoading, error } = useFetchEvents();

  if (error || events?.length === 0) return null;

  return (
    <>
      <SectionName title={t('sections.events')} showArrow />
      <div className={styles.Container}>
        <EventCarousel
          isLoading={isLoading}
          events={events}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title={t('button.events')} path="/events" />
      </div>
    </>
  );
}
