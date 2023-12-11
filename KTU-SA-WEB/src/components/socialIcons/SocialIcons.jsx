import React from "react";
import FacebookIcon from "../../assets/icon-facebook.svg";
import InstagramIcon from "../../assets/icon-instagram.svg";
import LinkedInIcon from "../../assets/icon-linkedin.svg";
import LtFlag from "../../assets/Lt-flag.svg";
import styles from "./SocialIcons.module.css";

export default function SocialIcons() {
  return (
    <div className={styles.Social}>
      <a
        href="https://www.facebook.com/KTU.SA"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Facebook" src={FacebookIcon} />
      </a>
      <a
        href="https://www.instagram.com/ktu_sa"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Instagram" src={InstagramIcon} />
      </a>
      <a
        href="https://www.linkedin.com/company/ktu-student-atstovyb-/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="LinkedIn" src={LinkedInIcon} />
      </a>
      <img alt="Lithuanian" src={LtFlag} />
    </div>
  );
}
