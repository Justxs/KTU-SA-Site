import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import styles from "./EventsCarousel.module.css";
import { useTranslation } from "react-i18next";
import EventCarousel from "../../../../components/eventCarousel/EventCarousel";

export default function Events() {
  const { t } = useTranslation();
  return (
    <>
      <SectionName title={t('sections.events')} showArrow />
      <div className={styles.Container}>
        <EventCarousel />
      </div>
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title={t('button.events')} path="/Events" />
      </div>
    </>
  );
}
