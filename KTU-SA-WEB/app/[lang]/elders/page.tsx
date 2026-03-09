import { getStaticPage } from '@api/GetStaticPages';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import HeroImage from '@components/heroImage/HeroImage';
import ContentBlocks from '@components/contentBlocks/ContentBlocks';
import SideMargins from '@components/margins/SideMargins';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('pages.elders'));

  return buildPageMetadata({ heroSection, lang, path: '/elders' });
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const page = await getStaticPage(lang, t('pages.elders'));

  return (
    <>
      <HeroImage sectionName={t('pages.elders')} />
      <SideMargins>
        <ContentBlocks blocks={page.blocks} />
      </SideMargins>
    </>
  );
}
