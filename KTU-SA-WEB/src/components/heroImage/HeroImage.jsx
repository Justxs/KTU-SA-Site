/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './HeroImage.module.css';
import { useFetchHeroSection } from '../../hooks/useFetchHeroSection';

export default function HeroImage({ sectionName }) {
  const { t } = useTranslation();
  const { data: heroSection, isLoading, error } = useFetchHeroSection(sectionName);
  const elementRef = useRef(null);
  const [Height, setHeight] = useState({});

  useEffect(() => {
    const updateSize = () => {
      if (elementRef.current) {
        const height = elementRef.current.offsetHeight;
        setHeight(height);
      }
    };

    const observer = new ResizeObserver(updateSize);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef]);

  if (error) return null;

  return (
    <div style={{ marginBottom: `${Height + 50}px` }}>
      <div className={styles.Container} ref={elementRef}>
        <div className={styles.TextContainer}>
          <div className={styles.Text}>
            {heroSection && !isLoading
              ? (
                <>
                  <h1>{t('pages.socialHelp') === heroSection.title ? t('navbar.needHelp.EmotionalHelp') : heroSection.title}</h1>
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
          <div
            className={styles.Divider}
            style={{ top: `${Height}px` }}
          />
        </div>
      </div>
    </div>
  );
}

HeroImage.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
