import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Articles.module.css";
import ArticleCard from "../../../../components/articleCard/ArticleCard";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";

export default function Articles() {
  return (
    <>
      <SectionName title="Straipsniai" showArrow />
      <div className={styles.Container}>
        <div>
          <ArticleCard
            title="Antrajai KTU SA prezidento kadencijai išrinktas Danas Černeckas"
            date="prieš 5 mėnesius"
            description="Kovo 31 d. KTU Studentų atstovybės (KTU SA) ataskaitinėje-rinkiminėje
          konferencijoje antrajai prezidento kadencijai išrinktas 4 metų patirtį
          organizacijoje skaičiuojantis Danas Černeckas. Konferencijos metu,
          vienerių metų kadencijai taip pat išrinkti kontrolės komiteto nariai
          ir atstovai į KTU senatą."
          />
        </div>
        <div className={styles.GridContainer}>
          <ArticleCard title="test" date="prieš 5 mėnesius" />
          <ArticleCard
            title="Antrajai KTU SA prezidento kadencijai išrinktas Danas Černeckas"
            date="prieš 5 mėnesius"
          />
          <ArticleCard
            title="Antrajai KTU SA prezidento kadencijai išrinktas Danas Černeckas"
            date="prieš 5 mėnesius"
          />
          <ArticleCard
            title="Antrajai KTU SA prezidento kadencijai išrinktas Danas Černeckas"
            date="prieš 5 mėnesius"
          />
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title="Visi straipsniai" path="/Articles" />
      </div>
    </>
  );
}
