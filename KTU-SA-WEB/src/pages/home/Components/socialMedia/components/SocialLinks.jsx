import React from 'react';
import { SOCIAL_LINKS } from '../../../../../constants/socialLinks';
import InstagramIcon from "../../../../../assets/Instagram-colored.svg";
import FacebookIcon from "../../../../../assets/icon-facebook.svg";
import LinkedinIcon from "../../../../../assets/icon-linkedin.svg";
import styles from "./SocialLinks.module.css";

export default function SocialLinks() {
  return (
    <div className={styles.IconsContainer}>
      <a
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <img src={InstagramIcon} className={styles.IgLogo} alt='Instagram' />
      </a>
      <a
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <img src={LinkedinIcon} width={100} alt='Linkedin' />
      </a>
      <a
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <img src={FacebookIcon} width={100} alt='Facebook' />
      </a>
    </div>
  );
}
