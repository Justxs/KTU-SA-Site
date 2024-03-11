import React from "react";
import styles from "./HeroImage.module.css";
import HeroImg from "../../../../assets/MainHeroImage.png";
import Smiley from "../../../../assets/playfullImages/Smiley.svg";

export default function HeroImage() {
  return (
    <div className={styles.Container}>
      <div className={styles.Text}>
        <div className={styles.Title}>KTU Studentų atstovybė</div>
        <div className={styles.Description}>
          Organizacija siekanti vieno tikslo, ginti visų studentų interesus,
          sprendžiant šiandienos ir rytojaus iššūkius
        </div>
      </div>
      <div className={styles.ImagesContainer}>
        <img src={HeroImg} className={styles.Image} />
      </div>
      <img src={Smiley} className={styles.Svg} />
    </div>
  );
}
