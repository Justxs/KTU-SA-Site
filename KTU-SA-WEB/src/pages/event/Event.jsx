import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbarContext } from '../../context/SnackbarContext';
import { useFetchEventsById } from '../../hooks/useFetchEventsById';
import HeroImage from './components/eventHero/HeroImage';
import Body from './components/eventBody/Body';
import styles from './Event.module.css';
import Smiley from '../../components/iconElements/Smiley';
import Sidebar from './components/sidebar/Sidebar';

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
        startDate={event.date}
        endDate={event.date}
        address="test address"
      />
      <div className={styles.Container}>
        <Sidebar
          ticketUrl="test"
          facebookUrl="test"
          organisers="test"
        />
        <Body
          htmlBody={event.htmlBody}
        />
      </div>
      <Smiley />
    </>
  );
}
