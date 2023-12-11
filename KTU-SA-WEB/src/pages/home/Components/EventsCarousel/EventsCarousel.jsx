import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import styles from "./EventsCarousel.module.css";

function EventsCarousel() {
  return (
    <>
      <SectionName title="Artimiausi renginiai" />
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title="Visi renginiai" path="/Events" />
      </div>
    </>
  );
}

export default EventsCarousel;
