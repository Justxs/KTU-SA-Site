import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './HeroImage.module.css';
import dateService from '../../../../services/dateService';

export default function HeroImage({
  img, title, date, readingTime,
}) {
  const { t } = useTranslation();

  return (
    <div className={styles.Container}>
      <img src={img} alt={title} className={styles.Image} />
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
    </div>
  );
}

HeroImage.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
};
