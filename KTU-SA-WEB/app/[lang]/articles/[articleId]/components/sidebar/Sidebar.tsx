import { getTranslations } from 'next-intl/server';
import { ArticleContentDto } from '@api/GetArticles';
import stringService from '@utils/stringService';
import Link from 'next/link';
import { Box, Divider, Typography } from '@mui/material';
import colors from '@theme/colors';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

export default async function Sidebar({ article }: Readonly<{ article: ArticleContentDto }>) {
  const t = await getTranslations();

  if (!article.contentList || article.contentList.length === 0) {
    return null;
  }

  return (
    <Box
      component="aside"
      aria-label="Article sidebar"
      sx={{
        alignSelf: 'flex-start',
        width: { xs: '100%', lg: '280px' },
        flexShrink: 0,
        borderRadius: '16px',
        bgcolor: colors.lightBlueBg,
        border: `1px solid rgba(17,77,138,0.10)`,
        overflow: 'hidden',
        mt: "16px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          px: '20px',
          py: '16px',
          bgcolor: `${colors.mediumBlue}0D`,
        }}
      >
        <ListAltRoundedIcon sx={{ fontSize: 20, color: colors.mediumBlue }} />
        <Typography
          component="h2"
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: colors.primaryDark,
            fontFamily: 'PFDinTextPro-Medium',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {t('common.content')}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(17,77,138,0.08)' }} />

      {/* Content links */}
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', py: '8px' }}>
        {article.contentList.map((content: string, index: number) => (
          <Link
            key={content}
            href={stringService.transformTextToId(content)}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                px: '20px',
                py: '12px',
                transition: 'all 0.2s ease',
                borderLeft: '3px solid transparent',
                '&:hover': {
                  bgcolor: `${colors.accentBlue}12`,
                  borderLeftColor: colors.accentBlue,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: colors.accentBlue,
                  fontFamily: 'PFDinTextPro-Medium',
                  lineHeight: '22px',
                  flexShrink: 0,
                  minWidth: '20px',
                  textAlign: 'center',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.darkBlueSecondary,
                  lineHeight: '22px',
                  letterSpacing: '0.3px',
                }}
              >
                {content}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
