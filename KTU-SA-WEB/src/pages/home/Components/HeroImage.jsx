import React from "react";
import styles from "./HeroImage.module.css";

function HeroImage() {
  return (
    <div className={styles.Margins}>
      <div className={styles.Text}>
        <p className={styles.Title}>KTU Studentų atstovybė</p>
        <p className={styles.Description}>
          Organizacija siekanti vieno tikslo, ginti visų studentų interesus,
          sprendžiant šiandienos ir rytojaus iššūkius
        </p>
      </div>
    </div>
  );
}

export default HeroImage;
