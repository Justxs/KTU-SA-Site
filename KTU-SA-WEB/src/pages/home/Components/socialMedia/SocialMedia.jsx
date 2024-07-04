import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SocialMedia.module.css';
import SocialLinks from './components/SocialLinks';
import DepthSvg from '../../../../assets/playfullImages/Depth.svg';
import SmileySvg from '../../../../assets/playfullImages/Smiley.svg';
import InfinitySvg from '../../../../assets/playfullImages/Infinity.svg';
import AbsoluteContainerMargin from '../../../../components/marginContainers/ObsoluteContainerMargin';
import { PHOTOS } from '../../../../constants/photos';

export default function SocialMedia() {
  const { t } = useTranslation();
  const elementRef = useRef(null);

  return (
    <div className={styles.Section} id={t('sections.follow')}>
      <div className={styles.Triangle} />
      <AbsoluteContainerMargin elementRef={elementRef}>
        <div ref={elementRef}>
          <div className={styles.Container}>
            <div className={styles.Text}>
              {t('sections.follow').toUpperCase()}
            </div>
            <SocialLinks />
            <div className={styles.ImagesContainer}>
              <img className={styles.Image} src={PHOTOS.DISCUSSION_PHOTO_URL} alt="Discussion" />
              <img className={styles.Image} src={PHOTOS.SHM_GIRLS_PHOTO_URL} alt="KTU FSA SHM girls" />
              <img className={styles.Image} src={PHOTOS.KTU_SA_PRESIDENT_PHOTO_URL} alt="KTU SA President running" />
              <img className={styles.Image} src={PHOTOS.KTU_SA_PHOTO_URL} alt="KTU SA" />
              <img className={styles.Icon} src={DepthSvg} alt="" />
              <img className={styles.Icon} src={SmileySvg} alt="" />
              <img className={styles.Icon} src={InfinitySvg} alt="" />
            </div>
          </div>
        </div>
      </AbsoluteContainerMargin>
      <div className={styles.TriangleDown} />
    </div>
  );
}
