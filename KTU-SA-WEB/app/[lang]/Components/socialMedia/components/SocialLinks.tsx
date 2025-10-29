import InstagramIcon from "@public/icons/social/Instagram-colored.svg";
import FacebookIcon from "@public/icons/social/icon-facebook.svg";
import LinkedinIcon from "@public/icons/social/icon-linkedin.svg";
import styles from "./SocialLinks.module.css";
import Image from "next/image";
import { SOCIAL_LINKS } from "@constants/SocialLinks";
import OptimizedImage from "@components/common/OptimizedImage";

export default function SocialLinks() {
  return (
    <div className={styles.IconsContainer}>
      <a
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <OptimizedImage
          src={InstagramIcon}
          className={styles.IgLogo}
          alt="Instagram"
          width="0"
          height="0"
        />
      </a>
      <a
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <OptimizedImage
          src={LinkedinIcon}
          alt="Linkedin"
          className={styles.Logo}
        />
      </a>
      <a
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <OptimizedImage
          src={FacebookIcon}
          className={styles.Logo}
          alt="Facebook"
        />
      </a>
    </div>
  );
}
