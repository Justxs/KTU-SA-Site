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
  const isOn = !isActive;

  return (
    <Link href={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box
        sx={{
          display: 'flex',
          maxWidth: 500,
          p: isOn ? 0 : 3,
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: 1,
          bgcolor: isOn ? colors.white : colors.activeYellow,
          transition: '0.3s',
          height: isOn ? '100%' : 'auto',
          '&:hover': {
            transform: 'scale(1.02)',
          },
          ...focusOutline,
        }}
      >
        <Image
          src={article.thumbnailImageId}
          alt={article.title}
          sizes="100%"
          width={0}
          height={0}
          style={{
            borderRadius: 4,
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
          }}
        >
          <Box
            component="h3"
            sx={{
              color: colors.nearBlackText,
              fontSize: 28,
              fontWeight: 600,
              mt: '10px',
              mb: '5px',
              width: '100%',
            }}
          >
            {article.title}
          </Box>
          <Box
            sx={{
              color: isOn ? colors.grayText : colors.activeDateAmber,
              fontSize: 15,
              mb: '20px',
            }}
          >
            {dateService.formatTimeAgo(article.createdDate, t)}
          </Box>
          {showPreview && (
            <Box
              sx={{
                color: colors.nearBlackText,
                fontSize: 20,
                lineHeight: '140%',
                ...lineClamp(5),
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
