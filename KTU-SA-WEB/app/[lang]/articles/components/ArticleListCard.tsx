import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { ArticleDto } from '@api/GetArticles';
import Image from 'next/image';
import dateService from '@utils/dateService';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import colors from '@theme/colors';
import { lineClamp, focusOutline } from '@theme/styles';
import Link from 'next/link';

type Props = {
  article: ArticleDto;
  isActive: boolean;
};

export default async function ArticleListCard(props: Readonly<Props>) {
  const { article, isActive } = props;

  const t = await getTranslations();

  return (
    <Link
      href={`/articles/${article.id}`}
      prefetch={false}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          color: colors.nearBlackText,
          borderRadius: '12px',
          overflow: 'hidden',
          bgcolor: isActive ? colors.activeYellow : colors.white,
          boxShadow: isActive ? 4 : 1,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isActive ? 6 : 3,
          },
          ...focusOutline,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
          }}
        >
          <Image
            src={article.thumbnailImageId}
            alt={article.title}
            fill
            sizes={isActive ? '(max-width: 700px) 80vw, 532px' : '(max-width: 700px) 80vw, 400px'}
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            p: '16px 20px 20px',
          }}
        >
          <Box
            component="h3"
            sx={{
              fontWeight: 600,
              m: 0,
              mb: '6px',
              fontSize: isActive ? 24 : 18,
              ...lineClamp(2),
            }}
          >
            {article.title}
          </Box>
          <Box
            component="time"
            sx={{
              fontSize: 14,
              color: isActive ? colors.activeDateAmber : colors.grayText,
              mb: '10px',
            }}
          >
            {dateService.formatTimeAgo(article.createdDate, t)}
          </Box>
          <Box
            sx={{
              fontSize: 15,
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              ...lineClamp(3),
            }}
          >
            {article.preview}
          </Box>
          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.primaryDark,
              fontFamily: 'PFDinTextPro-Medium',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '1px',
            }}
          >
            {t('button.readMore')}
            <ArrowForwardIcon sx={{ fontSize: 18 }} aria-hidden="true" />
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
