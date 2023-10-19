import React from "react";
import HeroImage from "./Components/heroImage";
import DividerLine from "./Components/DividerLine/DividerLine";
import styles from "./Home.module.css";
import ImportantInfoCard from "./Components/ImportantInfoCard/ImportantInfoCard";
import Articles from "./Components/Articles/Articles";
import EventsCarousel from "./Components/EventsCarousel/EventsCarousel";
import Sponsors from "./Components/Sponsors/Sponsors";
import Duk from "./Components/DUK/Duk";
import Fsa from "./Components/FSA/Fsa";

function Home() {
  return (
    <>
      <HeroImage />
      <div className={styles.Container}>
        <p className={styles.Text}>
          Mes{" "}
          <span className={styles.TextUnderlined}>atstovaujame studentus</span>,
          padedame <span className={styles.TextUnderlined}>socialiniais</span>{" "}
          ir <span className={styles.TextUnderlined}>akademiniais</span>{" "}
          klausimais, organizuojame renginius bei{" "}
          <span className={styles.TextUnderlined}>būnam studentiški!</span>
        </p>
      </div>
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
      <div style={{ height: "30vh" }}>
        <DividerLine />
      </div>
      <Articles />
      <EventsCarousel />
      <Sponsors />
      <Duk />
      <Fsa />
    </>
  );
}

export default Home;
