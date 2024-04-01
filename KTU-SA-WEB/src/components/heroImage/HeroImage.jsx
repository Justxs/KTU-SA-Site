import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import styles from './HeroImage.module.css';
import { useFetchHeroSection } from '../../hooks/useFetchHeroSection';

export default function HeroImage({ sectionName }) {
  const { data: heroSection, isLoading, error } = useFetchHeroSection(sectionName);

  if (error) return <></>;

  return (
    <div className={styles.Container}>
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
            ? <img className={styles.HeroImage} src={heroSection.imgSrc} />
            : <Skeleton className={styles.HeroImage} variant="rounded" animation="wave" width={433} height={200} />}
        </div>
        <div className={styles.Divder} />
      </div>
    </div>
  );
}

HeroImage.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
