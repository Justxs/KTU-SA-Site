import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import ReadMoreButton from '../../../components/readMoreButton/ReadMoreButton';
import dateService from '../../../services/dateService';
import styles from './EventCard.module.css';

export default function EventCard(props) {
  const { 
    event,
    isActive,
    skeleton 
  } = props;
    
  const { t } = useTranslation();
    
  const color = isActive ? "#FFD324" : null;
  const dateColor = isActive ? "#A46304" : "#8C9BA4";
    
  const width = isActive ? "532px" : "400px";
  const height = isActive ? "270px" : "200px";
    
  const size = isActive ? "28px" : "20px";
    
  return (
    <div className={styles.Card} style={{backgroundColor: color}}>
      {!skeleton 
        ? <>
          <img 
            src={event.thumbnailImageId} 
            alt={event.title} 
            className={styles.Image} 
            width={width} 
            height={height}
          />
          <div className={styles.Text} style={{width: width}}>
            <div className={styles.Title} style={{fontSize: size}}>{event.title}</div>
            <div className={styles.Date} style={{color: dateColor}}>
              {dateService.formatToDateAndTime(event.date)}
            </div>
            <div className={styles.Button}>
              <ReadMoreButton title={t('button.readMore')} path={`/events/${event.id}`}></ReadMoreButton>
            </div>
          </div>
        </> 
        : <>
          <div className={styles.Image}>
            <Skeleton variant="rounded" width={width} height={height} animation="wave"/>
          </div>
          <div className={styles.Text}>
            <div className={styles.Title}>
              <Skeleton animation="wave"/>
            </div>
            <Skeleton className={styles.Date} width={100} animation="wave"/>
          </div>
        </>
      }
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.instanceOf(Object).isRequired,
  isActive: PropTypes.bool.isRequired,
  skeleton: PropTypes.bool.isRequired,
};

