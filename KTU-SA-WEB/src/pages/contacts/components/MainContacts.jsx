import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFetchMainContacts } from '../../../hooks/useFetchMainContacts';
import styles from './MainContacts.module.css';
import InstagramIcon from '../../../assets/Instagram-colored.svg';
import FacebookIcon from '../../../assets/icon-facebook.svg';
import LinkedinIcon from '../../../assets/icon-linkedin.svg';
import { SOCIAL_LINKS } from '../../../constants/socialLinks';

export default function MainContacts({ saUnit }) {
  const { t } = useTranslation();
  const { data: mainContacts, isLoading, error } = useFetchMainContacts(saUnit);

  if (error || isLoading) return null;

  return (
    <div className={styles.Container}>
      <h1 className={styles.Text}>
        {t('mainContacts.letsTalk')}
      </h1>
      <div className={styles.Flex}>
        <div className={styles.Contacts}>
          <div>
            <div className={styles.Header}>{t('mainContacts.email')}</div>
            <a
              href={`mailto:${mainContacts.email}`}
              className={styles.Link}
            >
              {mainContacts.email}
            </a>
          </div>
          <div>
            <div className={styles.Header}>{t('mainContacts.phone')}</div>
            <a
              href={`tel:${mainContacts.phoneNumber}`}
              className={styles.Link}
            >
              {mainContacts.phoneNumber}
            </a>
          </div>
          <div>
            <div className={styles.Header}>{t('mainContacts.live')}</div>
            <a
              href={`http://maps.google.com/?q=${mainContacts.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Link}
            >
              {mainContacts.address}
            </a>
          </div>
          <div>
            <div className={styles.Header}>{t('mainContacts.social')}</div>
            <div className={styles.IconContainer}>
              <a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.Icon}
              >
                <img src={InstagramIcon} className={styles.IgLogo} alt="Instagram" />
              </a>
              <a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.Icon}
              >
                <img src={LinkedinIcon} width={100} alt="Linkedin" />
              </a>
              <a
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.Icon}
              >
                <img src={FacebookIcon} width={100} alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.Header}>{t('mainContacts.workingHours')}</div>
          <div>{t('mainContacts.weekdays')}</div>
          <div>{t('mainContacts.hours')}</div>
          <div>{t('mainContacts.friday')}</div>
          <div>{t('mainContacts.friday_hours')}</div>
        </div>
      </div>
    </div>
  );
}

MainContacts.propTypes = {
  saUnit: PropTypes.string.isRequired,
};
