import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Duk.module.css";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import DukCard from "../../../../components/dukCard/DukCard";

function Duk() {
  return (
    <div className={styles.Container}>
      <div className={styles.SectionName}>
        <SectionName title="Dažniausiai užduodami klausimai" />
      </div>
      <div className={styles.Spacing}>
        <div className={styles.Note}>
          <DukCard  title="Kokie yra lankomumo reikalavimai?" />
        </div>
        <div className={styles.Note}>
          <DukCard className={styles.Note} title="Ką daryti, jeigu noriu apsigyventi bendrabutyje?" />
        </div>
        <div className={styles.Note}>
          <DukCard className={styles.Note} title="Kokias stipendijas galiu aš gauti?" />
        </div>
        <div className={styles.Note}>
          <DukCard className={styles.Note} title="Neišlaikiau atsiskaitymo, ar galiu jį perlaikyti?" />
        </div>
      </div>
      <div className={styles.Spacing}>
        <ReadMoreButton title="Daugiau klausimų" path="/Duk" />
      </div>
    </div>
  );
}

export default Duk;
