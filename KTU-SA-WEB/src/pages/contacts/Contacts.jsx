import React, { useEffect, useState } from "react";
import HeroImage from "../../components/heroImage/HeroImage";
import ContactCard from "../../components/contactCard/ContactCard";
import placeholder from "../../assets/male-avatar-placeholder.png";
import styles from "./Contacts.module.css";
import SectionName from "../../components/sectionName/SectionName";
import { ENDPOINTS } from "../../constants/endpoints";
import useQuery from "../../hooks/useQuery";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";

export default function Contacts() {
  const [csaId, setCsaId] = useState(null);
  const { data: saUnits } = useQuery(ENDPOINTS.SA_UNITS.BASE);

  const positionsUrl = csaId ? ENDPOINTS.SA_UNITS.POSITIONS(csaId) : null;
  const { data: contacts, isLoading } = useQuery(positionsUrl);

  useEffect(()=>{
    if (saUnits) {
      const csa = saUnits.find(unit => unit.name === "CSA");
      if (csa) {
        setCsaId(csa.id);
      }
    }
  }, [saUnits]);

  useEffect(()=>{

  }, [contacts]);

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
