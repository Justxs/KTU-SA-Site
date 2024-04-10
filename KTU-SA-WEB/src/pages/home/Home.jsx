import React from 'react';
import HeroImage from './Components/heroImage/HeroImage';
import styles from './Home.module.css';
import ImportantInfoCard from './Components/importantInfoCard/ImportantInfoCard';
import Articles from './Components/articles/Articles.jsx';
import Sponsors from './Components/sponsors/Sponsors';
import Duk from './Components/duk/Duk.jsx';
import Fsa from '../../components/fsa/Fsa.jsx';
import TextWithLinks from './Components/textWithLinks/TextWithLinks';
import SocialMedia from './Components/socialMedia/SocialMedia';
import DividerLine from './Components/dividerLine/DividerLine.jsx';
import Events from '../../components/events/Events.jsx';

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
      <Events />
      <Sponsors />
      <Duk />
      <Fsa />
      <SocialMedia />
    </>
  );
}
