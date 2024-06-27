import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroImage from '../../components/heroImage/HeroImage';
import Body from '../../components/htmlBody/Body';
import { useFetchStaticPage } from '../../hooks/useFetchStaticPage';

export default function AboutUs() {
  const { t } = useTranslation();
  const { data: page, isLoading, error } = useFetchStaticPage(t('pages.whatIsKtuSA'));

  if (error) {
    return null;
  }
  return (
    <>
      <HeroImage sectionName={t('pages.whatIsKtuSA')} />
      <Body htmlBody={page?.body} isLoading={isLoading} />
    </>
  );
}
