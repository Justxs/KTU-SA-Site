import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import styles from "./EventsCarousel.module.css";
import { useTranslation } from "react-i18next";

function EventsCarousel() {
  const { t } = useTranslation();
  return (
    <>
      <SectionName title={t('sections.events')} showArrow />
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title={t('button.events')} path="/Events" />
      </div>
    </>
  );
}

export default EventsCarousel;
