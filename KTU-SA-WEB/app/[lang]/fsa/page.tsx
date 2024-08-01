import { getHeroImage } from '@api/GetHeroImage';
import FsaSection from '@components/fsaSection/FsaSection';
import HeroImage from '@components/heroImage/HeroImage';
import SideMargins from '@components/margins/SideMargins';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(){
  const t = await getTranslations();
  const locale = await getLocale();

  const heroSection = await getHeroImage(locale, t('sections.fsaFull'));

  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [{
        url: heroSection.imgSrc,
      }],
    },
  };
} 

export default async function Index() {
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
