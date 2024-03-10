import React from "react";
import styles from "./SocialMedia.module.css";
import InstagramIcon from "../../../../assets/Instagram-colored.svg";
import FacebookIcon from "../../../../assets/icon-facebook.svg";
import LinkedinIcon from "../../../../assets/icon-linkedin.svg";
import { SOCIAL_LINKS } from "../../../../constants/socialLinks";

export default function SocialMedia() {
  return(
    <div className={styles.Section}>
      <div className={styles.Triangle} />
      <div>
        <div className={styles.Container}>
          <div className={styles.Text}>
            SEKITE MUS SOCIALINIUOSE TINKLUOSE
          </div>
          <div className={styles.IconsContainer}>
            <a
              href={SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <img src={InstagramIcon} width={95} />
            </a>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <img src={LinkedinIcon} width={100} />
            </a>
            <a
              href={SOCIAL_LINKS.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <img src={FacebookIcon} width={100} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.TriangleDown} />
    </div>
  );
}
