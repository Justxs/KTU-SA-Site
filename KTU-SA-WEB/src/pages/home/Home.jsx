import React from "react";
import HeroImage from "./Components/heroImage/HeroImage";
import DividerLine from "./Components/DividerLine/DividerLine";
import styles from "./Home.module.css";
import ImportantInfoCard from "./Components/ImportantInfoCard/ImportantInfoCard";
import Articles from "./Components/articles/Articles";
import EventsCarousel from "./Components/EventsCarousel/EventsCarousel";
import Sponsors from "./Components/Sponsors/Sponsors";
import Duk from "./Components/DUK/Duk";
import Fsa from "./Components/FSA/Fsa";
import TextWithLinks from "./Components/textWithLinks/TextWithLinks";

export default function Home() {
  return (
    <>
      <HeroImage />
      <TextWithLinks />
      <div className={styles.InfoCards}>
        <ImportantInfoCard
          color={50}
          header="Pirmakursių stovykla"
          description="Laukia intensyvi nuotaikos maišymo savaitė! Tai tik pradžia!"
          hot
        />
        <ImportantInfoCard
          color={100}
          header="Pirmakursių stovykla"
          description="Laukia intensyvi nuotaikos maišymo savaitė! Tai tik pradžia!"
        />
        <ImportantInfoCard
          color={200}
          header="Pirmakursių stovykla"
          description="Laukia intensyvi nuotaikos maišymo savaitė! Tai tik pradžia!"
        />
        <ImportantInfoCard
          color={50}
          header="Pirmakursių stovykla"
          description="Laukia intensyvi nuotaikos maišymo savaitė! Tai tik pradžia!"
        />
        <ImportantInfoCard
          color={100}
          header="Pirmakursių stovykla"
          description="Laukia intensyvi nuotaikos maišymo savaitė! Tai tik pradžia!"
        />
        <ImportantInfoCard
          color={200}
          header="Pirmakursių stovykla"
          description="Laukia intensyvi nuotaikos maišymo savaitė! Tai tik pradžia!"
        />
      </div>
      <DividerLine />
      <Articles />
      <EventsCarousel />
      <Sponsors />
      <Duk />
      <Fsa />
    </>
  );
}
