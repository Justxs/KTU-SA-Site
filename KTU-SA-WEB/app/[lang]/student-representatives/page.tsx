import { getHeroImage } from '@api/GetHeroImage';
import { getPage } from '@api/GetPage';
import HeroImage from '@components/heroImage/HeroImage';
import Body from '@components/htmlBody/Body';
import SideMargins from '@components/margins/SideMargins';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(){
    const t = await getTranslations();
    const locale = await getLocale();
  
    const heroSection = await getHeroImage(locale, t('pages.ktuBodies'));
  
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

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();
  const page = await getPage(locale, t('pages.ktuBodies'));

  return (
    <>
      <HeroImage sectionName={t('pages.ktuBodies')} />
      <SideMargins>
        <Body htmlBody={page?.body} />
      </SideMargins>
    </>
  );
}
