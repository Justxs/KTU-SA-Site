import React from "react";
import HeroImage from "./Components/heroImage/HeroImage";
import DividerLine from "./Components/dividerLine/DividerLine";
import styles from "./Home.module.css";
import ImportantInfoCard from "./Components/importantInfoCard/ImportantInfoCard";
import Articles from "./Components/articles/Articles";
import EventsCarousel from "./Components/eventsCarousel/EventsCarousel";
import Sponsors from "./Components/sponsors/Sponsors";
import Duk from "./Components/duk/Duk";
import Fsa from "./Components/fsa/Fsa";
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
      {false && <DividerLine />}
      <Articles />
      <EventsCarousel />
      <Sponsors />
      <Duk />
      <Fsa />
    </>
  );
}
