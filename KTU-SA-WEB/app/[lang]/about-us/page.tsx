import React from 'react';
import HeroImage from '@components/heroImage/HeroImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContentBlocks from '@components/contentBlocks/ContentBlocks';
import { getStaticPage } from '@api/GetStaticPages';
import SideMargins from '@components/margins/SideMargins';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('pages.whatIsKtuSA'));

  return buildPageMetadata({ heroSection, lang, path: '/about-us' });
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const page = await getStaticPage(lang, t('pages.whatIsKtuSA'));

  return (
    <>
      <HeroImage sectionName={t('pages.whatIsKtuSA')} />
      <SideMargins>
        <ContentBlocks blocks={page.blocks} />
      </SideMargins>
    </>
  );
}
