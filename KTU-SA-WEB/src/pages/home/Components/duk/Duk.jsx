import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SectionName from '../../../../components/sectionName/SectionName';
import styles from './Duk.module.css';
import ReadMoreButton from '../../../../components/readMoreButton/ReadMoreButton';
import DukCard from '../../../../components/dukCard/DukCard';
import { useFetchDuk } from '../../../../hooks/useFetchDuk';
import AbsoluteContainerMargin from '../../../../components/marginContainers/ObsoluteContainerMargin';

export default function Duk() {
  const { t } = useTranslation();
  const fetchDukCount = 4;
  const { data: duks, isLoading, error } = useFetchDuk(fetchDukCount);
  const elementRef = useRef(null);

  if (error || duks?.length === 0) return null;

  return (
    <AbsoluteContainerMargin elementRef={elementRef}>
      <div className={styles.Container} ref={elementRef}>
        <div className={styles.SectionName}>
          <SectionName title={t('sections.duk')} />
        </div>
        <div className={styles.Spacing}>
          {isLoading
          && Array.from({ length: 4 }).map(() => (
            <div key={Math.random()} className={styles.Note}>
              <DukCard isLoading />
            </div>
          ))}
          {duks && duks.map((duk) => (
            <div key={duk.id} className={styles.Note}>
              <DukCard title={duk.question} answer={duk.answer} clickable />
            </div>
          ))}
        </div>
        <ReadMoreButton
          title={t('button.duk')}
          path="/Duk"
          isCenter
          margin
        />
      </div>
    </AbsoluteContainerMargin>
  );
}
