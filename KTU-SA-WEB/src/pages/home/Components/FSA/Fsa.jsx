import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Fsa.module.css";

function Fsa() {
  return (
    <>
      <SectionName
        title="Raskite savo fakulteto studentų atstovybę"
        showArrow={false}
      />
      <div className={styles.Container}></div>
    </>
  );
}

export default Fsa;
