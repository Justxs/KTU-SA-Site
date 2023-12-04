import React from "react";
import styles from "./HeroImage.module.css";
import img1 from "../../../../assets/ImageCard2.png";
import img2 from "../../../../assets/ImageCard3.png";
import img3 from "../../../../assets/ImageCard1.png";

export default function HeroImage() {
  return (
    <div className={styles.Container}>
      <div className={styles.Text}>
        <p className={styles.Title}>KTU Studentų atstovybė</p>
        <p className={styles.Description}>
          Organizacija siekanti vieno tikslo, ginti visų studentų interesus,
          sprendžiant šiandienos ir rytojaus iššūkius
        </p>
      </div>
      <div className={styles.ImagesContainer}>
        <div className={styles.ImagePos1}>
          <div className={styles.ImageCard1}>
            <img src={img1} className={styles.Image} />
          </div>
        </div>
        <div className={styles.ImagePos2}>
          <div className={styles.ImageCard2}>
            <img src={img2} className={styles.Image} />
          </div>
        </div>
        <div className={styles.ImagePos3}>
          <div className={styles.ImageCard3}>
            <img src={img3} className={styles.Image} />
          </div>
        </div>
      </div>
    </div>
  );
}
