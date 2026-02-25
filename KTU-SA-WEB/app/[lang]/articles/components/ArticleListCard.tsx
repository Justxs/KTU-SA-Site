import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { ArticleDto } from '@api/GetArticles';
import Image from 'next/image';
import dateService from '@utils/dateService';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import colors from '@theme/colors';
import { listCardBreakpoints, lineClamp } from '@theme/styles';

type Props = {
  article: ArticleDto;
  isActive: boolean;
};

export default async function ArticleListCard(props: Readonly<Props>) {
  const { article, isActive } = props;

  const t = await getTranslations();

  const width = isActive ? '532' : '400';
  const height = isActive ? '270' : '200';

  const size = isActive ? '28px' : '20px';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100%',
        color: colors.nearBlackText,
        borderRadius: 1,
        p: '20px',
        ...listCardBreakpoints,
      }}
    >
      <Image
        src={article.thumbnailImageId}
        alt={article.title}
        sizes="100%"
        width={0}
        height={height}
        style={{
          width: '100%',
          maxWidth: width,
          height: 'auto',
          objectFit: 'contain',
          borderRadius: 8,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width,
          ...listCardBreakpoints,
        }}
      >
        <Box
          component="h3"
          sx={{ fontWeight: 600, mt: '10px', mb: '5px', width: '100%', fontSize: size }}
        >
          {article.title}
        </Box>
        <Box component="time" sx={{ fontSize: 15, mb: '10px' }}>
          {dateService.formatTimeAgo(article.createdDate, t)}
        </Box>
        <Box
          sx={{
            letterSpacing: '0.5px',
            ...lineClamp(3),
          }}
        >
          {article.preview}
        </Box>
        <Box sx={{ pt: '10px', mt: 'auto' }}>
          <ReadMoreButton title={t('button.readMore')} path={`/articles/${article.id}`} />
        </Box>
      </Box>
    </Box>
  );
}
