import React from "react";
import HeroImage from "../../components/heroImage/HeroImage";
import ContactCard from "../../components/contactCard/ContactCard";
import styles from "./Contacts.module.css";
import { useFetchContacts } from "../../hooks/useFetchContacts";
import { SA_UNITS } from "../../constants/saUnits";
import Body from "../../components/body/Body.jsx";
import { useTranslation } from "react-i18next";
import MainContacts from "./components/mainContacts/MainContacts.jsx";

export default function Contacts() {
  const {t} = useTranslation();
  const { data: contacts, isLoading, error} = useFetchContacts(SA_UNITS.CSA);

  if (error || contacts?.length === 0) return <></>;

  return (
    <>
      <HeroImage sectionName={t('sections.contacts')}/>
      <Body>
        <MainContacts saUnit={SA_UNITS.CSA}/>
        <div className={styles.ContactCards}>
          {isLoading && 
            Array.from({ length: 8 }).map(() => (
              <ContactCard
                key={Math.random()}
                contact={{}}
                skeleton
              />
            ))
          }
          {contacts && contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
            />
          ))}
        </div>
      </Body>
    </>
  );
}
