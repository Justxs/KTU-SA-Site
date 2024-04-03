import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SocialMedia.module.css';
import SocialLinks from './components/SocialLinks';
import PlaceHolder1 from '../../../../assets/placeholder.png';
import PlaceHolder2 from '../../../../assets/placeholder2.png';
import PlaceHolder3 from '../../../../assets/placeholder3.jpg';
import PlaceHolder4 from '../../../../assets/placeholder4.jpg';
import DepthSvg from '../../../../assets/playfullImages/Depth.svg';
import SmileySvg from '../../../../assets/playfullImages/Smiley.svg';
import InfinitySvg from '../../../../assets/playfullImages/Infinity.svg';
import AbsoluteContainerMargin from '../../../../components/marginContainers/ObsoluteContainerMargin';

export default function SocialMedia() {
  const { t } = useTranslation();
  const elementRef = useRef(null);

  return (
    <div className={styles.Section}>
      <div className={styles.Triangle} />
      <AbsoluteContainerMargin elementRef={elementRef}>
        <div ref={elementRef}>
          <div className={styles.Container}>
            <div className={styles.Text}>
              {t('sections.follow')}
            </div>
            <SocialLinks />
            <div className={styles.ImagesContainer}>
              <img className={styles.Image} src={PlaceHolder1} alt="" />
              <img className={styles.Image} src={PlaceHolder2} alt="" />
              <img className={styles.Image} src={PlaceHolder3} alt="" />
              <img className={styles.Image} src={PlaceHolder4} alt="" />
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
