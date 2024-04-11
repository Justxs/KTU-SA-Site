import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFetchMainContacts } from '../../../hooks/useFetchMainContacts';
import styles from './MainContacts.module.css';
import ContactsSection from '../../../components/contactsSection/ContactsSection';
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
        <ContactsSection
          email={mainContacts.email}
          phoneNumber={mainContacts.phoneNumber}
          address={mainContacts.address}
          facebookUrl={SOCIAL_LINKS.FACEBOOK}
          linkedInUrl={SOCIAL_LINKS.LINKEDIN}
          instagramUrl={SOCIAL_LINKS.INSTAGRAM}
        />
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
