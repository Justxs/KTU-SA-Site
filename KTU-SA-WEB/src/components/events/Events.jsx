import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SectionName from '../sectionName/SectionName';
import ReadMoreButton from '../readMoreButton/ReadMoreButton';
import styles from './Events.module.css';
import EventCarousel from '../eventCarousel/EventCarousel';
import { useFetchEvents } from '../../hooks/useFetchEvents';

export default function Events({ saUnit }) {
  const { t } = useTranslation();
  const { data: events, isLoading, error } = useFetchEvents(saUnit);

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
        <ReadMoreButton
          title={t('button.events')}
          path="/events"
          isCenter
        />
      </div>
    </>
  );
}

Events.propTypes = {
  saUnit: PropTypes.string,
};

Events.defaultProps = {
  saUnit: null,
};
