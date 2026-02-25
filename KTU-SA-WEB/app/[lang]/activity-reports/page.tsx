import { getActivityReports } from '@api/GetActivityReport';
import { SA_UNITS } from '@constants/saUnits';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HeroImage from '@components/heroImage/HeroImage';
import SectionName from '@components/sectionName/SectionName';
import ActivityReport from './ActivityReport';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t('navbar.about.activityReports'));

  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [
        {
          url: heroSection.imgSrc,
        },
      ],
    },
    twitter: {
      site: '@KTU_SA',
      images: [heroSection.imgSrc],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const reports = await getActivityReports(lang, SA_UNITS.CSA);

  return (
    <>
      <HeroImage sectionName={t('navbar.about.activityReports')} />
      <SideMargins>
        <SectionName title={t('sections.activityReports')} showArrow />
        <ActivityReport reports={reports} />
      </SideMargins>
    </>
  );
}
