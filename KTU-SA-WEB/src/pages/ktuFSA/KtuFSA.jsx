import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroImage from "./components/heroImage/HeroImage";
import styles from "./KtuFSA.module.css";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import ContactCard from "../../components/contactCard/ContactCard";
import placeholder from "../../assets/male-avatar-placeholder.png";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import SectionName from "../../components/sectionName/SectionName";

function KtuFSA() {
  const { fsaName } = useParams();

  const [csaId, setCsaId] = useState(null);
  const { data: saUnits } = useQuery(ENDPOINTS.SA_UNITS.BASE);

  const positionsUrl = csaId ? ENDPOINTS.SA_UNITS.POSITIONS(csaId) : null;
  const { data: contacts, isLoading } = useQuery(positionsUrl);

  useEffect(()=>{
    if (saUnits) {
      const csa = saUnits.find(unit => unit.name === fsaName);
      if (csa) {
        setCsaId(csa.id);
      }
    }
  }, [fsaName, saUnits]);

  return (
    <div className={styles.Container}>
      <HeroImage fsaName={fsaName} />
      <div className={styles.Container}>
        <SectionName title="Komanda" showArrow/>
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

export default KtuFSA;
