import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getTranslations } from 'next-intl/server';
import { ArticleContentDto } from '@api/GetArticles';
import FacebookShare from '@components/shareButtons/FacebookShare';
import LinkedInShare from '@components/shareButtons/LinkedInShare';
import stringService from '@utils/stringService';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import colors from '@theme/colors';

export default async function Sidebar({ article }: Readonly<{ article: ArticleContentDto }>) {
  const t = await getTranslations();

  return (
    <Box
      component="aside"
      aria-label="Article sidebar"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        color: colors.darkBlueSecondary,
        '@media (max-width: 1200px)': {
          flexDirection: 'column',
          width: 'auto',
        },
      }}
    >
      {article.contentList && article.contentList.length !== 0 && (
        <>
          <Typography component="h2" sx={{ fontSize: '22px' }}>
            {t('common.content')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {article.contentList.map((content: string) => (
              <Box key={content} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ArrowForwardIcon sx={{ color: colors.accentBlue }} />
                <Link
                  href={stringService.transformTextToId(content)}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      color: colors.darkBlueSecondary,
                      fontSize: '20px',
                      fontWeight: 700,
                      letterSpacing: '0.64px',
                      transition: '0.03s',
                      '&:hover': {
                        color: colors.lightBlueAccent,
                        cursor: 'pointer',
                        transition: '0.03s',
                      },
                    }}
                  >
                    {content}
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </>
      )}
      <Typography component="h2" sx={{ fontSize: '22px' }}>
        {t('common.share')}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <FacebookShare />
        <LinkedInShare title={article.title} preview={article.htmlBody} />
      </Box>
    </Box>
  );
}
