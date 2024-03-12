import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Duk.module.css";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import DukCard from "../../../../components/dukCard/DukCard";
import { useFetchDuk } from "../../../../hooks/useFetchDuk";
import { useTranslation } from "react-i18next";

export default function Duk() {
  const { t } = useTranslation();
  const fetchDukCount = 4;
  const { data: duks, isLoading, error } = useFetchDuk("LT", fetchDukCount);

  if (error) return <></>;

  return (
    <div className={styles.Container}>
      <div className={styles.SectionName}>
        <SectionName title={t('sections.duk')} />
      </div>
      <div className={styles.Spacing}>
        {isLoading && 
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.Note}>
              <DukCard isLoading />
            </div>
          ))
        }
        {duks && duks.map((duk) => (
          <div key={duk.id} className={styles.Note}>
            <DukCard title={duk.question} />
          </div>
        ))}
      </div>
      <div className={styles.Spacing}>
        <ReadMoreButton title="Daugiau klausimų" path="/Duk" />
      </div>
    </div>
  );
}
