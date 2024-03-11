import React from 'react';
import ESA from "../../assets/FsaLogo/ESA.png";
import FUMSA from "../../assets/FsaLogo/FUMSA.png";
import INDI from "../../assets/FsaLogo/INDI.png";
import INFOSA from "../../assets/FsaLogo/INFOSA.png";
import SHM from "../../assets/FsaLogo/SHM.png";
import STATIUS from "../../assets/FsaLogo/STATIUS.png";
import VFSA from "../../assets/FsaLogo/VFSA.png";
import VIVAT from "../../assets/FsaLogo/VIVAT.png";
import KTUSA from "../../assets/KTU_SA_Logo.png";
import styles from "./AllSaUnitsLogo.module.css";

export default function AllSaUnitsLogo() {
  return (
    <div className={styles.Container}>
      <div className={styles.Logo}>
        <img src={ESA} alt='ESA' height={150}/>
      </div>
      <div className={styles.Logo}>
        <img src={FUMSA} alt='FUMSA' height={150}/>
      </div>
      <div className={styles.Logo}>
        <img src={INDI} alt='InDi' height={150}/>
      </div>
      <div className={styles.LogoUp}>
        <img src={INFOSA} alt='InfoSA' height={150}/>
      </div>
      <div className={styles.Logo}>
        <img src={KTUSA} alt='KTU SA' height={200}/>
      </div>
      <div className={styles.LogoUp}>
        <img src={SHM} alt='SHM' height={150}/>
      </div>
      <div className={styles.Logo}>
        <img src={STATIUS} alt='STATIUS' height={150}/>
      </div>
      <div className={styles.Logo}>
        <img src={VFSA} alt='VFSA' height={150}/>
      </div>
      <div className={styles.Logo}>
        <img src={VIVAT} alt='VIVAT Chemija' height={150}/>
      </div>
    </div>
            
  );
}
