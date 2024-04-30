import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbarContext } from '../../context/SnackbarContext';
import { useFetchEventsById } from '../../hooks/useFetchEventsById';
import HeroImage from './components/eventHero/HeroImage';
import styles from './Event.module.css';
import EventInfo from './components/eventInfo/EventInfo';
import Body from '../../components/htmlBody/Body';

export default function Event() {
  const { eventId } = useParams();
  const { data: event, isLoading, error } = useFetchEventsById(eventId);
  const { openSnackbar } = useSnackbarContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (error) {
    openSnackbar(t('common.notFound'));
    navigate('/');
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <HeroImage
        img={event.coverImageUrl}
        title={event.title}
      />
      <div className={styles.Container}>
        <Body
          htmlBody={event.htmlBody}
        />
        <EventInfo
          ticketUrl={event.fientaTicketUrl}
          facebookUrl={event.facebookUrl}
          organisers={event.organisers}
          address={event.address}
          startDate={event.startDate}
          endDate={event.endDate}
        />
      </div>
    </>
  );
}
