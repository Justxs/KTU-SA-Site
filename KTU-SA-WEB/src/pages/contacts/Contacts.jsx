import React from "react";
import HeroImage from "../../components/heroImage/HeroImage";
import ContactCard from "../../components/contactCard/ContactCard";
import placeholder from "../../assets/male-avatar-placeholder.png";
import styles from "./Contacts.module.css";
import SectionName from "../../components/sectionName/SectionName";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";

export default function Contacts() {
  const { data: contacts, isLoading } = {data: null, isLoading: true};
  return (
    <div>
      <HeroImage
        title="Kontaktai"
        description="KTU Studentų Atstovybės centrinio biuro kontaktai"
      />
      <div className={styles.Body}>
        <SectionName title="Komanda" />
        <div className={styles.ContactCards}>
          <FallbackWrapper isLoading={isLoading} data={contacts}>
            {contacts && contacts
              .filter(contact => contact.fullName !== null)
              .map(contact => (
                <ContactCard
                  key={contact.id}
                  name={contact.fullName}
                  position={contact.positionName}
                  email={contact.email}
                  phone={contact.phoneNumber}
                  photo={placeholder}
                />
              ))
            }
          </FallbackWrapper>
        </div>
      </div>
    </div>
  );
}
