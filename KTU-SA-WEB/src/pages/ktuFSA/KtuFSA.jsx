import React from "react";
import { useParams } from "react-router-dom";
import HeroImage from "./components/heroImage/HeroImage";
import styles from "./KtuFSA.module.css";
import ContactCard from "../../components/contactCard/ContactCard";
import placeholder from "../../assets/male-avatar-placeholder.png";
import SectionName from "../../components/sectionName/SectionName";

function KtuFSA() {
  const { fsaName } = useParams();

  const { data: contacts } = {};

  return (
    <div className={styles.Container}>
      <HeroImage fsaName={fsaName} />
      <div className={styles.Container}>
        <SectionName title="Komanda" showArrow/>
        <div className={styles.ContactCards}>
          {contacts && contacts
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
        </div>
      </div>
    </div>
  );
}

export default KtuFSA;
