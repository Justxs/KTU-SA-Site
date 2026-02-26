import { getHeroImage } from '@api/GetHeroImage';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import FsaSection from '@components/fsaSection/FsaSection';
import HeroImage from '@components/heroImage/HeroImage';
import SideMargins from '@components/margins/SideMargins';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t('sections.fsaFull'));

  return buildPageMetadata({ heroSection, lang, path: '/fsa' });
}

export default async function Index({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();

  return (
    <>
      <HeroImage sectionName={t('sections.fsaFull')} />
      <SideMargins>
        <FsaSection />
      </SideMargins>
    </>
  );
}
