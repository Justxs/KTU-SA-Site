/* eslint-disable react/no-array-index-key */
import React from "react";
import styles from "./FooterBar.module.css";
import KTU_SA_white from "../../assets/KTU_SA_baltas.png";
import { Link } from "react-router-dom";
import NAVIGATION_LINKS from "../../constants/navigationLinks";

export default function FooterBar() {
  return (
    <footer className={styles.Container}>
      <div className={styles.Logo}>
        <img alt="KTU SA white logo" src={KTU_SA_white} />
        <p>
          KTU studentų atstovybė
          <br />
          K.Donelaičio g. 73
          <br />
          LT-44029 Kaunas
          <br />
          <a
            href="mailto:info@ktusa.lt"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Link}
          >
            info@ktusa.lt
          </a>
        </p>
      </div>
      <div className={styles.NavigationSection}>
        {NAVIGATION_LINKS.map((section, index) => (
          <div key={index} className={styles.NavSection}>
            <div className={styles.Header}>{section.header}</div>
            {section.links.map((link, linkIndex) => (
              <Link key={linkIndex} to={link.path} className={styles.Link}>
                {link.name}
              </Link>
            ))}
          </div>
        ))}
        <div className={styles.NavSection2}>
          <a
            href="https://lsp.lt/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.Header} + ${styles.Link}`}
          >
            <b>Lietuvos studento pažymėjimas</b>
          </a>
          <Link to="/Contacts" className={`${styles.Header} + ${styles.Link}`}>
            <b>Kontaktai</b>
          </Link>
        </div>
      </div>
    </footer>
  );
}
