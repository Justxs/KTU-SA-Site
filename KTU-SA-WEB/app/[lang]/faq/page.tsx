import { getFaqsPage } from '@api/GetFaqs';
import { parsePageParam } from '@api/pagination';
import { blocksToPlainText } from '@api/helpers';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import { getTranslations } from 'next-intl/server';
import { Box, Chip } from '@mui/material';
import SideMargins from '@components/margins/SideMargins';
import PaginationLinks from '@components/pagination/PaginationLinks';
import { getStaticPage } from '@api/GetStaticPages';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import { getLocalizedPath } from '@/lib/seo/languageAlternates';
import colors from '@theme/colors';
import JsonLd from '@components/seo/JsonLd';
import FaqAccordion from './FaqAccordion';
import FaqEmptyState from './FaqEmptyState';
import FaqSearchField from './FaqSearchField';

const FAQS_PER_PAGE = 10;

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('sections.duk'));

  return buildPageMetadata({ heroSection, lang, path: '/faq' });
}

export default async function Page({ params, searchParams }: Readonly<Props>) {
  const { lang } = await params;
  const t = await getTranslations();
  const query = await searchParams;
  const search = query.q?.trim() ?? '';
  const requestedPage = parsePageParam(query.page);

  const faqs = await getFaqsPage(lang, {
    page: requestedPage,
    pageSize: FAQS_PER_PAGE,
    search: search || undefined,
  });

  const basePath = getLocalizedPath(lang, '/faq');
  const showJsonLd = !search && faqs.page === 1;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blocksToPlainText(faq.answer),
      },
    })),
  };

  return (
    <>
      {showJsonLd && <JsonLd data={faqJsonLd} />}
      <HeroImage sectionName={t('sections.duk')} />
      <SideMargins>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
          <FaqSearchField
            action={basePath}
            defaultValue={search}
            placeholder={t('faq.searchPlaceholder')}
            submitLabel={t('faq.search')}
          />

          {search && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={t('faq.questionsCount', { count: faqs.totalCount })}
                size="small"
                sx={{
                  backgroundColor: colors.lightBlueBg,
                  color: colors.mediumBlue,
                  fontWeight: 600,
                  border: `1px solid ${colors.navbarLightBlue}`,
                }}
              />
            </Box>
          )}

          {search && faqs.totalCount === 0 && <FaqEmptyState message={t('faq.noResults')} />}
          {!search && <EmptyData length={faqs.totalCount} />}

          <FaqAccordion items={faqs.items} startNumber={(faqs.page - 1) * faqs.pageSize + 1} />

          <PaginationLinks
            page={faqs.page}
            totalPages={faqs.totalPages}
            basePath={basePath}
            params={search ? { q: search } : undefined}
          />
        </Box>
      </SideMargins>
    </>
  );
}
