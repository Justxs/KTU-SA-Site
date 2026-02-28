import React from 'react';
import HeroImage from '@components/heroImage/HeroImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Body from '@components/htmlBody/Body';
import { getPage } from '@api/GetPage';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t('pages.academicHelp'));

  return buildPageMetadata({ heroSection, lang, path: '/academic-help' });
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const page = await getPage(lang, t('pages.academicHelp'));

  return (
    <>
      <HeroImage sectionName={t('pages.academicHelp')} />
      <SideMargins>
        <Body htmlBody={page.body} />
      </SideMargins>
    </>
  );
}
