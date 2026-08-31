import { Grid, Box } from '@mui/material';
import ArticleListCard from './components/ArticleListCard';
import HeroImage from '@components/heroImage/HeroImage';
import EmptyData from '@components/emptyData/EmptyData';
import { getTranslations } from 'next-intl/server';
import { getArticlesPage } from '@api/GetArticles';
import { parsePageParam } from '@api/pagination';
import SideMargins from '@components/margins/SideMargins';
import PaginationLinks from '@components/pagination/PaginationLinks';
import { getStaticPage } from '@api/GetStaticPages';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import { getLocalizedPath } from '@/lib/seo/languageAlternates';

const ARTICLES_PER_PAGE = 8;

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('sections.articles'));

  return buildPageMetadata({ heroSection, lang, path: '/articles' });
}

export default async function Page({ params, searchParams }: Readonly<Props>) {
  const { lang } = await params;
  const t = await getTranslations();
  const requestedPage = parsePageParam((await searchParams).page);
  const articles = await getArticlesPage(lang, {
    page: requestedPage,
    pageSize: ARTICLES_PER_PAGE,
  });

  const basePath = getLocalizedPath(lang, '/articles');

  const isFirstPage = articles.page === 1;

  return (
    <>
      <HeroImage sectionName={t('sections.articles')} />
      <SideMargins>
        <Box sx={{ mb: '150px' }}>
          <EmptyData length={articles.totalCount} />
          <Grid container spacing={3}>
            {articles.items.map((article, index) => {
              const isActive = isFirstPage && index < 2;

              return (
                <Grid key={article.id} size={{ xs: 12, sm: isActive ? 6 : 4 }}>
                  <ArticleListCard article={article} isActive={isActive} />
                </Grid>
              );
            })}
          </Grid>
          <PaginationLinks
            page={articles.page}
            totalPages={articles.totalPages}
            basePath={basePath}
          />
        </Box>
      </SideMargins>
    </>
  );
}
