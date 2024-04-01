import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import styles from './HeroImage.module.css';
import dateService from '../../../../services/dateService';

export default function HeroImage(props) {
  const {
    img,
    title,
    date,
    readingTime,
    isLoading,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.Container}>
      {!isLoading
        ? <img src={img} alt={title} className={styles.Image} />
        : <Skeleton className={styles.Image} height={300} animation="wave" />}
      {!isLoading
        ? (
          <div className={styles.TextContainer}>
            <h1 className={styles.Title}>{title}</h1>
            <div className={styles.Info}>
              <div>{dateService.formatToDate(date)}</div>
              <div>
                {t('article.readingTime')}
                {' '}
                -
                {' '}
                {readingTime}
              </div>
            </div>
          </div>
        )
        : (
          <div className={styles.TextContainer}>
            <Skeleton className={styles.Title} animation="wave" />
            <Skeleton animation="wave" width={200} />
          </div>
        )}
    </div>
  );
}

HeroImage.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  readingTime: PropTypes.string,
  isLoading: PropTypes.bool,
};

HeroImage.defaultProps = {
  img: '',
  title: '',
  date: '',
  readingTime: '',
  isLoading: false,
};
