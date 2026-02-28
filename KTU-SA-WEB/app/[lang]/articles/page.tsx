import { Grid, Box } from '@mui/material';
import ArticleListCard from './components/ArticleListCard';
import HeroImage from '@components/heroImage/HeroImage';
import EmptyData from '@components/emptyData/EmptyData';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getArticles } from '@api/GetArticles';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t('sections.articles'));

  return buildPageMetadata({ heroSection, lang, path: '/articles' });
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const articles = await getArticles(lang);

  return (
    <>
      <HeroImage sectionName={t('sections.articles')} />
      <SideMargins>
        <Box sx={{ mb: '150px' }}>
          <EmptyData length={articles?.length} />
          <Grid container spacing={3}>
            {articles?.map((article, index) => (
              <Grid key={article.id} size={{ xs: 12, sm: index < 2 ? 6 : 4 }}>
                <ArticleListCard article={article} isActive={index < 2} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </SideMargins>
    </>
  );
}
