import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SectionName from '../sectionName/SectionName';
import ReadMoreButton from '../readMoreButton/ReadMoreButton';
import styles from './Events.module.css';
import EventCarousel from '../eventCarousel/EventCarousel';
import { useFetchEvents } from '../../hooks/useFetchEvents';

export default function Events({ saUnit, handleLoading }) {
  const { t } = useTranslation();
  const { data: events, isLoading, error } = useFetchEvents(saUnit);

  useEffect(() => {
    handleLoading(isLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (error || events?.length === 0 || isLoading) return null;

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

Events.propTypes = {
  saUnit: PropTypes.string,
  handleLoading: PropTypes.func,
};

Events.defaultProps = {
  saUnit: null,
  handleLoading: () => {},
};
