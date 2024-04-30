import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroImage from './components/heroImage/HeroImage';
import Contacts from './components/contacts/Contacts';
import styles from './KtuFSA.module.css';
import Smiley from '../../components/iconElements/Smiley';
import Events from '../../components/events/Events';
import { useFetchSaUnitsByNames } from '../../hooks/useFetchSaUnitsByName';
import ContactsSection from '../../components/contactsSection/ContactsSection';
import SectionName from '../../components/sectionName/SectionName';

export default function KtuFSA() {
  const { fsaName } = useParams();
  const fsa = fsaName === 'VIVAT chemija' ? 'Vivat_Chemija' : fsaName;

  const { t } = useTranslation();
  const { data: saUnit, isLoading, isError } = useFetchSaUnitsByNames(fsa);

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <HeroImage fsaName={fsaName} coverUrl={saUnit.coverUrl} />
      <div className={styles.Container}>
        <div>
          <SectionName title={t('sections.aboutUs')} />
          <p className={styles.Description}>{saUnit.description}</p>
        </div>
        <div>
          <h1 className={styles.Text}>
            {t('mainContacts.letsTalk')}
          </h1>
          <ContactsSection
            email={saUnit.email}
            phoneNumber={saUnit.phoneNumber}
            address={saUnit.address}
            facebookUrl={saUnit.facebookUrl}
            linkedInUrl={saUnit.linkedInUrl}
            instagramUrl={saUnit.instagramUrl}
          />
        </div>
      </div>
      <Events saUnit={fsaName} />
      <Contacts fsaName={fsaName} />
      <Smiley />
    </>
  );
}
