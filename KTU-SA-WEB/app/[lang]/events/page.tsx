import { getEvents } from '@api/GetEvents';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Box, Grid } from '@mui/material';
import EventCard from './components/EventCard';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t('sections.events'));

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

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const events = await getEvents(lang);

  return (
    <>
      <HeroImage sectionName={t('sections.events')} />
      <EmptyData length={events?.length} />
      <SideMargins>
        <Grid container spacing={2}>
          {events?.map((event, index) => (
            <Grid size={{ xs: 12, lg: 6, xl: index < 2 ? 6 : 4 }} key={event.id}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EventCard event={event} isActive={index < 2} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </SideMargins>
      <Box sx={{ mb: '20px' }} />
    </>
  );
}
