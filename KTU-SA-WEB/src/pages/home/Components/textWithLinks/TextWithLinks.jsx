import React from "react";
import styles from "./TextWithLinks.module.css";
import { Link } from 'react-router-dom';

export default function TextWithLinks() {
  return (
    <div className={styles.Container}>
      <p className={styles.Text}>
        Mes{" "}
        <Link to="/StudentRepresentetives" className={styles.TextUnderlined}>atstovaujame studentus</Link>,
        padedame <Link to="/SocialHelp" className={styles.TextUnderlined}>socialiniais</Link> ir{" "}
        <Link to="/AcademicHelp" className={styles.TextUnderlined}>akademiniais</Link> klausimais,
        organizuojame renginius bei{" "}
        <Link to="/SocialHelp" className={styles.TextUnderlined}>būnam studentiški!</Link>
      </p>
    </div>
  );
}
