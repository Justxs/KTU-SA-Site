import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './FooterBar.module.css';
import KTU_SA_white from '../../assets/KTU_SA_baltas.png';
import NAVIGATION_LINKS from '../../constants/navigationLinks';

export default function FooterBar() {
  const { t } = useTranslation();
  const navigationLinks = NAVIGATION_LINKS(t);

  return (
    <footer className={styles.Container}>
      <div className={styles.LogoContainer}>
        <img alt="KTU SA white logo" src={KTU_SA_white} />
        <div className={styles.Info}>
          <div>{t('common.ktusa')}</div>
          <a
            href="https://maps.app.goo.gl/NfpCNmDJq65sUCqc7"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Link}
          >
            K. Donelaičio g. 73
            <div>
              LT-44029 Kaunas
            </div>
          </a>
          <a
            href="mailto:info@ktusa.lt"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Link}
          >
            info@ktusa.lt
          </a>
        </div>
      </div>
      <div className={styles.NavigationSection}>
        {navigationLinks.map((section, index) => (
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
            <b>{t('navbar.lspFull')}</b>
          </a>
          <Link to="/Contacts" className={`${styles.Header} + ${styles.Link}`}>
            <b>{t('navbar.contacts')}</b>
          </Link>
        </div>
      </div>
    </footer>
  );
}
