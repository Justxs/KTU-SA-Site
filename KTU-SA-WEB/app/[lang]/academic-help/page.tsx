import React from 'react';
import HeroImage from '@components/heroImage/HeroImage';
import { getLocale, getTranslations } from 'next-intl/server';
import Body from '@components/htmlBody/Body';
import { getPage } from '@api/GetPage';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';

export async function generateMetadata(){
  const t = await getTranslations();
  const locale = await getLocale();
  
  const heroSection = await getHeroImage(locale, t('pages.academicHelp'));
  
  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [{
        url: heroSection.imgSrc,
      }],
    },
    twitter: {
      site: '@KTU_SA',
      images: [heroSection.imgSrc],
    },
  };
}

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();
  const page = await getPage(locale, t('pages.academicHelp'));

  return (
    <>
      <HeroImage sectionName={t('pages.academicHelp')} />
      <SideMargins>
        <Body htmlBody={page.body} />
      </SideMargins>
    </>
  );
}
