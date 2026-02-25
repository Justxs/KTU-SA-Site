import Link from 'next/link';
import Image from 'next/image';
import dateService from '@utils/dateService';
import { getTranslations } from 'next-intl/server';
import { ArticleDto } from '@api/GetArticles';
import { Box } from '@mui/material';
import colors from '@theme/colors';
import { focusOutline, lineClamp } from '@theme/styles';

type Props = {
  article: ArticleDto;
  isActive?: boolean;
  showPreview?: boolean;
};

export default async function ArticleCard(props: Readonly<Props>) {
  const { article, isActive = false, showPreview = false } = props;
  const t = await getTranslations();

  return (
    <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: isActive ? 560 : 500,
          height: '100%',
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
            sizes={isActive ? '(max-width: 1600px) 90vw, 560px' : '(max-width: 940px) 90vw, 280px'}
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
            p: isActive ? '20px 24px 24px' : '14px 18px 18px',
          }}
        >
          <Box
            component="h3"
            sx={{
              color: colors.nearBlackText,
              fontSize: isActive ? 26 : 20,
              fontWeight: 600,
              m: 0,
              mb: '6px',
              ...lineClamp(isActive ? 3 : 2),
            }}
          >
            {article.title}
          </Box>
          <Box
            sx={{
              color: isActive ? colors.activeDateAmber : colors.grayText,
              fontSize: 14,
              mb: showPreview ? '12px' : 0,
              mt: 'auto',
            }}
          >
            {dateService.formatTimeAgo(article.createdDate, t)}
          </Box>
          {showPreview && (
            <Box
              sx={{
                color: colors.nearBlackText,
                fontSize: 16,
                lineHeight: 1.55,
                ...lineClamp(4),
              }}
            >
              {article.preview}
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
}
