import { getActivityReports } from '@api/GetActivityReport';
import { SA_UNITS } from '@constants/saUnits';
import { getLocale, getTranslations } from 'next-intl/server';
import HeroImage from '@components/heroImage/HeroImage';
import SectionName from '@components/sectionName/SectionName';
import ActivityReport from './ActivityReport';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';

export async function generateMetadata(){
  const t = await getTranslations();
  const locale = await getLocale();

  const heroSection = await getHeroImage(locale, t('navbar.about.activityReports'));

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
  const reports = await getActivityReports(locale, SA_UNITS.CSA);

  return (
    <>
      <HeroImage sectionName={t('navbar.about.activityReports')} />
      <SideMargins>
        <SectionName title={t('sections.activityReports')} showArrow />
        <ActivityReport reports={reports}/>
      </SideMargins>
    </>
  );
}
