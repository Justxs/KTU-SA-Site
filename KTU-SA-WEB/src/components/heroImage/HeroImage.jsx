import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import styles from './HeroImage.module.css';
import { useFetchHeroSection } from '../../hooks/useFetchHeroSection';
import AbsoluteContainerMargin from '../marginContainers/ObsoluteContainerMargin';

export default function HeroImage({ sectionName }) {
  const { data: heroSection, isLoading, error } = useFetchHeroSection(sectionName);
  const elementRef = useRef(null);
  if (error) return null;

  return (
    <AbsoluteContainerMargin elementRef={elementRef}>
      <div className={styles.Container} ref={elementRef}>
        <div className={styles.TextContainer}>
          <div className={styles.Text}>
            {heroSection && !isLoading
              ? (
                <>
                  <h1 className={styles.Title}>{heroSection.title}</h1>
                  <p className={styles.Description}>{heroSection.description}</p>
                </>
              )
              : (
                <>
                  <Skeleton className={styles.Title} variant="text" animation="wave" />
                  <Skeleton className={styles.Description} variant="text" animation="wave" />
                </>
              )}
          </div>
          <div className={styles.HeroImageContainer}>
            {heroSection && !isLoading
              ? <img className={styles.HeroImage} src={heroSection.imgSrc} alt="" />
              : <Skeleton className={styles.HeroImage} variant="rounded" animation="wave" width={433} height={200} />}
          </div>
          <div className={styles.Divder} />
        </div>
      </div>
    </AbsoluteContainerMargin>
  );
}

HeroImage.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
