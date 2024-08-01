import React from 'react';
import styles from './HeroImage.module.css';
import HeroImg from '@public/assets/design-elements/MainHeroImage.png';
import Smiley from '@public/assets/design-elements/Smiley.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HeroImage() {
  const t = useTranslations();

  return (
    <div className={styles.Container}>
      <div className={styles.Text}>
        <div className={styles.Title}>{t('common.ktusa')}</div>
        <div className={styles.Description}>
          {t('home.text')}
        </div>
      </div>
      <div className={styles.ImagesContainer}>
        <Image 
          src={HeroImg} 
          alt="Hero image"
          sizes="90%"
          className={styles.Image}
        />
      </div>
      <Image 
        src={Smiley} 
        className={styles.Svg} 
        alt="" 
      />
    </div>
  );
}
