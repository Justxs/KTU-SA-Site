import React from "react";
import FacebookIcon from "../../assets/icon-facebook.svg";
import InstagramIcon from "../../assets/icon-instagram.svg";
import LinkedInIcon from "../../assets/icon-linkedin.svg";
import LtFlag from "../../assets/LT-flag.svg";
import styles from "./SocialIcons.module.css";
import { SOCIAL_LINKS } from "../../constants/socialLinks";

export default function SocialIcons() {
  return (
    <div className={styles.Social}>
      <a
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Facebook" src={FacebookIcon} />
      </a>
      <a
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Instagram" src={InstagramIcon} />
      </a>
      <a
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="LinkedIn" src={LinkedInIcon} />
      </a>
      <img alt="Lithuanian" src={LtFlag} />
    </div>
  );
}
