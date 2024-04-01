import React from 'react';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../../assets/icon-facebook.svg';
import InstagramIcon from '../../assets/icon-instagram.svg';
import LinkedInIcon from '../../assets/icon-linkedin.svg';
import LtFlag from '../../assets/LT-flag.svg';
import EnFlag from '../../assets/EN-flag.svg';
import styles from './SocialIcons.module.css';
import { SOCIAL_LINKS } from '../../constants/socialLinks';
import { LANGUAGE } from '../../constants/language';

export default function SocialIcons() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === LANGUAGE.EN ? LANGUAGE.LT : LANGUAGE.EN;
    i18n.changeLanguage(newLang);
  };

  const flagSrc = i18n.language === LANGUAGE.EN ? EnFlag : LtFlag;
  const altText = i18n.language === LANGUAGE.EN ? 'English' : 'Lithuanian';

  return (
    <div className={styles.Social}>
      <a
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}

      >
        <img alt="Facebook" src={FacebookIcon} />
      </a>
      <a
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}

      >
        <img alt="Instagram" src={InstagramIcon} />
      </a>
      <a
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Icon}
      >
        <img alt="LinkedIn" src={LinkedInIcon} />
      </a>
      <img
        alt={altText}
        src={flagSrc}
        className={styles.Flag}
        onClick={toggleLanguage}
      />
    </div>
  );
}
