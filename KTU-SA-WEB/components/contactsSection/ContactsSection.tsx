import { Tooltip } from '@mui/material';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import styles from './ContactsSection.module.css';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import OptimizedImage from '@components/common/OptimizedImage';

type Props = {
  email: string;
  phoneNumber: string;
  address: string;
  facebookUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
}

export default async function ContactsSection(props : Props) {
  const {
    email,
    phoneNumber,
    address,
    facebookUrl,
    linkedInUrl,
    instagramUrl
  } = props;

  const t = await getTranslations();

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
              <OptimizedImage src={FacebookIcon} alt="Facebook" />
            </a>
          </Tooltip>
          <Tooltip title="Instagram">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <OptimizedImage src={InstagramIcon} alt="Instagram" />
            </a>
          </Tooltip>
          <Tooltip title="Linkedin">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Icon}
            >
              <OptimizedImage src={LinkedInIcon} alt="Linkedin" />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

