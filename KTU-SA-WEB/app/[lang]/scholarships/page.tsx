import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import HeroImage from '@components/heroImage/HeroImage';
import ContentBlocks from '@components/contentBlocks/ContentBlocks';
import SideMargins from '@components/margins/SideMargins';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getStaticPage } from '@api/GetStaticPages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('pages.scholarships'));

  return buildPageMetadata({ heroSection, lang, path: '/scholarships' });
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const page = await getStaticPage(lang, t('pages.scholarships'));

  return (
    <>
      <HeroImage sectionName={t('pages.scholarships')} />
      <SideMargins>
        <ContentBlocks blocks={page.blocks} />
      </SideMargins>
    </>
  );
}
