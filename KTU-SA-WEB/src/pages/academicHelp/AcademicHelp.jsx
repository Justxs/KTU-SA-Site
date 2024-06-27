import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroImage from '../../components/heroImage/HeroImage';
import Body from '../../components/htmlBody/Body';
import { useFetchStaticPage } from '../../hooks/useFetchStaticPage';

export default function AcademicHelp() {
  const { t } = useTranslation();
  const { data: page, isLoading, error } = useFetchStaticPage(t('pages.academicHelp'));

  if (error) {
    return null;
  }

  return (
    <>
      <HeroImage sectionName={t('pages.academicHelp')} />
      <Body htmlBody={page?.body} isLoading={isLoading} />
    </>
  );
}
