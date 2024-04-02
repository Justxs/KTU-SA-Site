import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbarContext } from '../../context/SnackbarContext';
import { useFetchEventsById } from '../../hooks/useFetchEventsById';
import HeroImage from './components/eventHero/HeroImage';
import Body from './components/eventBody/Body';
import styles from './Event.module.css';
import Smiley from '../../assets/playfullImages/Smiley.svg';

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
        img={event.thumbnailImageId}
        title={event.title}
        startDate={event.date}
        endDate={event.date}
      />
      <div className={styles.Container}>
        <Body
          htmlBody={event.htmlBody}
        />
      </div>
      <div className={styles.Svg}>
        <img src={Smiley} alt="" />
      </div>
    </>
  );
}
