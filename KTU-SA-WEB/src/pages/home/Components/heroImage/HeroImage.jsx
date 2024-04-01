import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HeroImage.module.css';
import HeroImg from '../../../../assets/MainHeroImage.png';
import Smiley from '../../../../assets/playfullImages/Smiley.svg';

export default function HeroImage() {
  const { t } = useTranslation();

  return (
    <div className={styles.Container}>
      <div className={styles.Text}>
        <div className={styles.Title}>{t('common.ktusa')}</div>
        <div className={styles.Description}>
          {t('home.text')}
        </div>
      </div>
      <div className={styles.ImagesContainer}>
        <img src={HeroImg} className={styles.Image} alt={t('common.ktusa')} />
      </div>
      <img src={Smiley} className={styles.Svg} alt="Smile" />
    </div>
  );
}
