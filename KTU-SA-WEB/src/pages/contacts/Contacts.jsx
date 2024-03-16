import React from "react";
import HeroImage from "../../components/heroImage/HeroImage";
import ContactCard from "../../components/contactCard/ContactCard";
import styles from "./Contacts.module.css";
import { useFetchContacts } from "../../hooks/useFetchContacts";
import { SA_UNITS } from "../../constants/saUnits";
import Body from "../../components/body/body";

export default function Contacts() {
  const { data: contacts, isLoading , error} = useFetchContacts(SA_UNITS.CSA);

  if (error) return <></>;
  if (isLoading) return <></>;

  return (
    <>
      <HeroImage
        title="Kontaktai"
        description="KTU Studentų Atstovybės centrinio biuro kontaktai"
      />
      <Body>
        <div className={styles.ContactCards}>
          {contacts && contacts.map(contact => (
            <ContactCard
              key={contact.id}
              name={contact.name}
              position={contact.position}
              email={contact.email}
              phone={contact.phoneNumber}
              photo={contact.imageSrc}
            />
          ))}
        </div>
      </Body>
    </>
  );
}
