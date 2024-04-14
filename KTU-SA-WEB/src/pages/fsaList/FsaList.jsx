import React from 'react';
import { useTranslation } from 'react-i18next';
import Fsa from '../../components/fsa/Fsa';
import Smiley from '../../components/iconElements/Smiley';
import HeroImage from '../../components/heroImage/HeroImage';

export default function FsaList() {
  const { t } = useTranslation();
  return (
    <>
      <HeroImage sectionName={t('sections.fsaFull')} />
      <Fsa />
      <Smiley />
    </>
  );
}
