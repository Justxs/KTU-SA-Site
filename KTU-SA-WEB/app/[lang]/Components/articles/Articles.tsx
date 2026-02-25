import { Box } from '@mui/material';
import SectionName from '@components/sectionName/SectionName';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import { getLocale, getTranslations } from 'next-intl/server';
import ArticleCard from '@components/articleCard/ArticleCard';
import { getArticles } from '@api/GetArticles';

export default async function Articles() {
  const t = await getTranslations();
  const locale = await getLocale();

  const articles = await getArticles(locale, 5);

  if (articles?.length === 0) return null;

  return (
    <Box sx={{ mb: '44px' }}>
      <SectionName title={t('sections.articles')} showArrow />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '50px',
          '@media (max-width: 1600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {articles && articles.length > 0 && (
          <ArticleCard article={articles[0]} isActive showPreview />
        )}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            mt: 3,
            gap: '25px',
            '@media (max-width: 940px)': {
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {articles?.slice(1, 5).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Box>
      </Box>
      <ReadMoreButton title={t('button.articles')} path="/articles" isCenter />
    </Box>
  );
}
