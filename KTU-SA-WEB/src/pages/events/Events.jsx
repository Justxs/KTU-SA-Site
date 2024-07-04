import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { useFetchEvents } from '../../hooks/useFetchEvents';
import HeroImage from '../../components/heroImage/HeroImage';
import EventCard from './components/EventCard';
import styles from './Events.module.css';
import EmptyData from '../../components/emptyData/EmptyData';

export default function Events() {
  const { t } = useTranslation();

  const { data: events, isLoading, error } = useFetchEvents();

  if (error) {
    return null;
  }

  return (
    <>
      <HeroImage sectionName={t('sections.events')} />
      <EmptyData length={events?.length} />
      <div className={styles.Margin}>
        <Grid container spacing={2}>
          {events && events.map((event, index) => (
            <Grid
              item
              xs={12}
              lg={6}
              xl={index < 2 ? 6 : 4}
              key={event.id}
            >
              <div className={styles.CardContainer}>
                <EventCard
                  event={event}
                  isLoading={isLoading}
                  isActive={index < 2}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
