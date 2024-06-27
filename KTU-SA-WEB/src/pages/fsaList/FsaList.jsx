import React from 'react';
import { useTranslation } from 'react-i18next';
import Fsa from '../../components/fsa/Fsa';
import HeroImage from '../../components/heroImage/HeroImage';

export default function FsaList() {
  const { t } = useTranslation();
  return (
    <>
      <HeroImage sectionName={t('sections.fsaFull')} />
      <div style={{ marginBottom: '150px' }}>
        <Fsa />
      </div>
    </>
  );
}
