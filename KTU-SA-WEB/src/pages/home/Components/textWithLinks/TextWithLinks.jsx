import React from "react";
import styles from "./TextWithLinks.module.css";

function TextWithLinks() {
  return (
    <div className={styles.Container}>
      <p className={styles.Text}>
        Mes{" "}
        <span className={styles.TextUnderlined}>atstovaujame studentus</span>,
        padedame <span className={styles.TextUnderlined}>socialiniais</span> ir{" "}
        <span className={styles.TextUnderlined}>akademiniais</span> klausimais,
        organizuojame renginius bei{" "}
        <span className={styles.TextUnderlined}>būnam studentiški!</span>
      </p>
    </div>
  );
}

export default TextWithLinks;
