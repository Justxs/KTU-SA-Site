import React from "react";
import HeroImage from "./Components/heroImage";
import DividerLine from "./Components/DividerLine/DividerLine";
import styles from "./Home.module.css";
import ImportantInfoCard from "./Components/ImportantInfoCard/ImportantInfoCard";

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
    </>
  );
}

export default Home;
