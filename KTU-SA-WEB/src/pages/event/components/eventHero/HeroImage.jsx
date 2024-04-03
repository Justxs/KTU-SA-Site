import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import styles from './HeroImage.module.css';
import dateService from '../../../../services/dateService';
import AbsoluteContainerMargin from '../../../../components/marginContainers/ObsoluteContainerMargin';

export default function HeroImage(props) {
  const {
    img,
    title,
    startDate,
    endDate,
    isLoading,
    address,
  } = props;
  const elementRef = useRef(null);

  return (
    <AbsoluteContainerMargin elementRef={elementRef}>
      <div className={styles.Container} ref={elementRef}>
        {!isLoading
          ? <img src={img} alt={title} className={styles.Image} />
          : <Skeleton className={styles.Image} height={300} animation="wave" />}
        {!isLoading
          ? (
            <div className={styles.TextContainer}>
              <h1 className={styles.Title}>{title}</h1>
              <div className={styles.Info}>
                <div>{dateService.formatToDateAndTime(startDate)}</div>
                <div>{dateService.formatToDateAndTime(endDate)}</div>
                <div>{address}</div>
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
    </AbsoluteContainerMargin>
  );
}

HeroImage.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  address: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isLoading: PropTypes.bool,
};

HeroImage.defaultProps = {
  img: '',
  title: '',
  startDate: '',
  endDate: '',
  address: '',
  isLoading: false,
};
