import React from "react";
import HeroImage from "../../components/heroImage/HeroImage";
import ContactCard from "../../components/contactCard/ContactCard";
import placeholder from "../../assets/male-avatar-placeholder.png";
import styles from "./Contacts.module.css";
import SectionName from "../../components/sectionName/SectionName";

export default function Contacts() {
  return (
    <div>
      <HeroImage
        title="Kontaktai"
        description="KTU Studentų Atstovybės centrinio biuro kontaktai"
      />
      <div className={styles.Body}>
        <SectionName title="Komanda" />
        <div className={styles.ContactCards}>
          <ContactCard
            name="Danas Černeckas"
            position="Prezidentas"
            photo={placeholder}
          />
          <ContactCard
            name="Irma Zapalskytė"
            position="Organizacijos stiprinimo vice prezidentė"
            photo={placeholder}
          />
          <ContactCard
            name="Matas Černeckas"
            position="Socialinių ir akademinių reikalų vice prezidentas"
            photo={placeholder}
          />
          <ContactCard
            name="Inesa Degutytė"
            position="Finansų vice prezidente"
            photo={placeholder}
          />
          <ContactCard
            name="Emilija"
            position="Akademinių procesų komiteto koordinatorė"
            photo={placeholder}
          />
          <ContactCard
            name="Skaistė"
            position="Socialinių reikalų komiteto koordinatorė"
            photo={placeholder}
          />
          <ContactCard
            name="Jokūbas"
            position="Bendrabučių reikalų komiteto koordinatorius"
            photo={placeholder}
          />
          <ContactCard
            name="Ineta"
            position="Organizacinių reikalų komiteto koordinatorė"
            photo={placeholder}
          />
          <ContactCard
            name="Giedre Marija Zapalskytė"
            position="Verslo projektų komiteto koordinatorė"
            photo={placeholder}
          />
          <ContactCard
            name="Dovydas"
            position="Ryšių su visuomene komiteto koordinatorius"
            photo={placeholder}
          />
          <ContactCard
            name="Ervinas"
            position="Ryšių su visuomene komiteto koordinatorius"
            photo={placeholder}
          />
          <ContactCard
            name="Deimantė"
            position="Žmogiškųjų išteklių komiteto koordinatorė"
            photo={placeholder}
          />
        </div>
      </div>
    </div>
  );
}
