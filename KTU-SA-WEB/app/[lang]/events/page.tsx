import { getEventsPage } from '@api/GetEvents';
import { parsePageParam } from '@api/pagination';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import { getTranslations } from 'next-intl/server';
import { Grid } from '@mui/material';
import EventCard from './components/EventCard';
import SideMargins from '@components/margins/SideMargins';
import PaginationLinks from '@components/pagination/PaginationLinks';
import { getStaticPage } from '@api/GetStaticPages';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import { getLocalizedPath } from '@/lib/seo/languageAlternates';

const EVENTS_PER_PAGE = 9;

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('sections.events'));

  return buildPageMetadata({ heroSection, lang, path: '/events' });
}

export default async function Page({ params, searchParams }: Readonly<Props>) {
  const { lang } = await params;
  const t = await getTranslations();
  const requestedPage = parsePageParam((await searchParams).page);
  const events = await getEventsPage(lang, { page: requestedPage, pageSize: EVENTS_PER_PAGE });

  const basePath = getLocalizedPath(lang, '/events');

  const isFirstPage = events.page === 1;

  return (
    <>
      <HeroImage sectionName={t('sections.events')} />
      <EmptyData length={events.totalCount} />
      <SideMargins>
        <Grid container spacing={3}>
          {events.items.map((event, index) => {
            const isActive = isFirstPage && index < 2;

            return (
              <Grid size={{ xs: 12, sm: isActive ? 6 : 4 }} key={event.id}>
                <EventCard event={event} isActive={isActive} />
              </Grid>
            );
          })}
        </Grid>
        <PaginationLinks page={events.page} totalPages={events.totalPages} basePath={basePath} />
      </SideMargins>
      <div style={{ marginBottom: '20px' }} />
    </>
  );
}
