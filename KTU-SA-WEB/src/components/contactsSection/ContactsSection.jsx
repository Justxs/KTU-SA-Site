import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import InstagramIcon from '../../assets/icon-instagram.svg';
import FacebookIcon from '../../assets/icon-facebook.svg';
import LinkedinIcon from '../../assets/icon-linkedin.svg';
import styles from './ContactsSection.module.css';

export default function ContactsSection(props) {
  const {
    email,
    phoneNumber,
    address,
    facebookUrl,
    linkedInUrl,
    instagramUrl,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.Contacts}>
      <div>
        <div className={styles.Header}>{t('mainContacts.email')}</div>
        <a
          href={`mailto:${email}`}
          className={styles.Link}
        >
          {email}
        </a>
      </div>
      <div>
        <div className={styles.Header}>{t('mainContacts.phone')}</div>
        <a
          href={`tel:${phoneNumber}`}
          className={styles.Link}
        >
          {phoneNumber}
        </a>
      </div>
      <div>
        <div className={styles.Header}>{t('mainContacts.live')}</div>
        <a
          href={`http://maps.google.com/?q=${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.Link}
        >
          {address}
        </a>
      </div>
      <div>
        <div className={styles.Header}>{t('mainContacts.social')}</div>
        <div className={styles.IconContainer}>
          <Tooltip title="Facebook">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <img src={FacebookIcon} alt="Facebook" />
            </a>
          </Tooltip>
          <Tooltip title="Instagram">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <img src={InstagramIcon} alt="Instagram" />
            </a>
          </Tooltip>
          <Tooltip title="Linkedin">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <img src={LinkedinIcon} alt="Linkedin" />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

ContactsSection.propTypes = {
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  facebookUrl: PropTypes.string.isRequired,
  linkedInUrl: PropTypes.string.isRequired,
  instagramUrl: PropTypes.string.isRequired,
};
