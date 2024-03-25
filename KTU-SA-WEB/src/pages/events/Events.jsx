import React from 'react';
import { useFetchEvents } from '../../hooks/useFetchEvents';
import HeroImage from '../../components/heroImage/HeroImage';
import { useTranslation } from 'react-i18next';
import EventCard from './components/EventCard';
import Body from '../../components/body/Body';
import styles from './Events.module.css';

export default function Events() {
  const {t} = useTranslation();

  const { data: events, isLoading, error } = useFetchEvents();

  if (error) {
    return <></>;
  }

  return (
    <>
      <HeroImage sectionName={t('sections.events')}/>
      <Body>
        <div className={styles.Latest}>
          {events && events.slice(0, 2).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isLoading={isLoading}
              isActive
            />
          ))}
          {isLoading && 
          <>
            <EventCard
              event={{}}
              isActive
              skeleton
            />
            <EventCard
              article={{}}
              isActive
              skeleton
            />
          </>
          }
        </div>
        <div className={styles.GridContainer}>
          {events && events.slice(2).map((event) => (
            <EventCard 
              key={event.id}
              event={event}
              isLoading={isLoading}
            />
          ))}
          {isLoading && 
            Array.from({ length: 6 }).map(() => (
              <EventCard
                key={Math.random()}
                event={{}}
                skeleton
              />
            ))
          }
        </div>
      </Body>
    </>
  );
}