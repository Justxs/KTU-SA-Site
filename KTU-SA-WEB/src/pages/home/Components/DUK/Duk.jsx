import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Duk.module.css";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";

function Duk() {
  return (
    <>
      <SectionName title="Dažniausiai užduodami klausimai" showArrow={false} />
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title="Daugiau klausimų" path="/Duk" />
      </div>
    </>
  );
}

export default Duk;
