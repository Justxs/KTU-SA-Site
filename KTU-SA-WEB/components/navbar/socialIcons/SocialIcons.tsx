import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import styles from './SocialIcons.module.css';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import OptimizedImage from '@components/common/OptimizedImage';

export default function SocialIcons() {
  return (
    <div className={styles.Social}>
      <a
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}

      >
        <OptimizedImage alt="Facebook" src={FacebookIcon} />
      </a>
      <a
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}

      >
        <OptimizedImage alt="Instagram" src={InstagramIcon} />
      </a>
      <a
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <OptimizedImage alt="LinkedIn" src={LinkedInIcon} />
      </a>
      <LanguageSwitcher />
    </div>
  );
}
