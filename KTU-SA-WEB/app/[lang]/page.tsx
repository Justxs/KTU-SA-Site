import SideMargins from '@components/margins/SideMargins';
import { Box } from '@mui/material';
import Articles from './Components/articles/Articles';
import Duk from './Components/duk/Duk';
import HeroImage from './Components/heroImage/HeroImage';
import SocialMedia from './Components/socialMedia/SocialMedia';
import Sponsors from './Components/sponsors/Sponsors';
import Values from './Components/values/Values';
import FsaSection from '@components/fsaSection/FsaSection';
import EventsSection from '@components/eventsSection/EventsSection';
import { setRequestLocale } from 'next-intl/server';
import { getEvents } from '@api/GetEvents';

export default async function Index({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const events = await getEvents(lang);

  return (
    <>
      <SideMargins>
        <HeroImage />
        <Values />
      </SideMargins>
      <SideMargins>
        <Box sx={{ py: { xs: '40px', md: '64px' } }}>
          <Articles />
        </Box>
        <Box sx={{ pb: { xs: '40px', md: '64px' } }}>
          <EventsSection events={events} />
        </Box>
        <Box sx={{ pb: { xs: '40px', md: '64px' } }}>
          <Sponsors />
        </Box>
      </SideMargins>
      <Duk />
      <SideMargins>
        <Box sx={{ py: { xs: '40px', md: '64px' } }}>
          <FsaSection />
        </Box>
      </SideMargins>
      <SocialMedia />
    </>
  );
}
