import React from "react";
import styles from "./SocialMedia.module.css";
import SocialLinks from "./components/SocialLinks";
import PlaceHolder1 from "../../../../assets/placeholder.png";
import PlaceHolder2 from "../../../../assets/placeholder2.png";
import PlaceHolder3 from "../../../../assets/placeholder3.jpg";
import PlaceHolder4 from "../../../../assets/placeholder4.jpg";
import DepthSvg from "../../../../assets/playfullImages/Depth.svg";
import SmileySvg from "../../../../assets/playfullImages/Smiley.svg";
import InfinitySvg from "../../../../assets/playfullImages/Infinity.svg";
import { useTranslation } from "react-i18next";

export default function SocialMedia() {
  const { t } = useTranslation();
  return(
    <div className={styles.Section}>
      <div className={styles.Triangle} />
      <div>
        <div className={styles.Container}>
          <div className={styles.Text}>
            {t('sections.follow')}
          </div>
          <SocialLinks />
          <div className={styles.ImagesContainer}>
            <img className={styles.Image} src={PlaceHolder1} />
            <img className={styles.Image} src={PlaceHolder2} />
            <img className={styles.Image} src={PlaceHolder3} />
            <img className={styles.Image} src={PlaceHolder4} />
            <img className={styles.Icon} src={DepthSvg}/>
            <img className={styles.Icon} src={SmileySvg}/>
            <img className={styles.Icon} src={InfinitySvg}/>
          </div>
        </div>
      </div>
      <div className={styles.TriangleDown} />
    </div>
  );
}
