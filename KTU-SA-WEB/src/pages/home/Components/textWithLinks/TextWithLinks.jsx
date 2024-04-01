import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './TextWithLinks.module.css';

export default function TextWithLinks() {
  const { t } = useTranslation();

  return (
    <div className={styles.Container}>
      <p className={styles.Text}>
        {t('home.textWithLinks.we')}
        <Link to="/StudentRepresentetives" className={styles.TextUnderlined}>{t('home.textWithLinks.represent')}</Link>
        {t('home.textWithLinks.help')}
        <Link to="/SocialHelp" className={styles.TextUnderlined}>{t('home.textWithLinks.social')}</Link>
        {t('home.textWithLinks.and')}
        <Link to="/AcademicHelp" className={styles.TextUnderlined}>{t('home.textWithLinks.academics')}</Link>
        {t('home.textWithLinks.questions')}
        <Link to="/SocialHelp" className={styles.TextUnderlined}>{t('home.textWithLinks.enjoy')}</Link>
      </p>
    </div>
  );
}
