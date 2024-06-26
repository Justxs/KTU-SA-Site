import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroImage from '../../components/heroImage/HeroImage';
import Body from '../../components/htmlBody/Body';
import { useFetchStaticPage } from '../../hooks/useFetchStaticPage';
import Smiley from '../../components/iconElements/Smiley';

export default function SocialHelp() {
  const { t } = useTranslation();
  const { data: page, isLoading, error } = useFetchStaticPage(t('pages.socialHelp'));

  if (error) {
    return null;
  }
  return (
    <>
      <HeroImage sectionName={t('pages.socialHelp')} />
      <Body htmlBody={page?.body} isLoading={isLoading} />
      <Smiley />
    </>
  );
}