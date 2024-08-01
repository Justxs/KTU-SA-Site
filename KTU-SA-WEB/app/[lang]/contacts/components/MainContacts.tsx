import React from 'react';
import styles from './MainContacts.module.css';
import { getTranslations } from 'next-intl/server';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import { getMainContacts } from '@api/GetContacts';
import ContactsSection from '@components/contactsSection/ContactsSection';

export default async function MainContacts({ saUnit } : {saUnit: string}) {
  const t = await getTranslations();
  const mainContacts = await getMainContacts(saUnit);

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
