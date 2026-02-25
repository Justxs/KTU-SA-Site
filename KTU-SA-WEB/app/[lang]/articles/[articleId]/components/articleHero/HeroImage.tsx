import dateService from '@utils/dateService';
import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import colors from '@theme/colors';

type Props = {
  img: string;
  title: string;
  date: Date;
  readingTime: string;
};

export default async function HeroImage(props: Readonly<Props>) {
  const { img, title, date, readingTime } = props;

  const t = await getTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: colors.lightBlueBg,
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        pt: '10px',
        pb: '10px',
        '@media (max-width: 1200px)': {
          flexDirection: 'column',
          gap: 0,
        },
      }}
    >
      <Image
        alt={title}
        src={img}
        width={800}
        height={450}
        sizes="(max-width: 1200px) 80vw, 40vw"
        priority
        style={{
          width: '40vw',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50vw',
          justifyContent: 'space-around',
          '@media (max-width: 1200px)': {
            width: '65vw',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
        }}
      >
        <Box
          component="h1"
          sx={{
            color: colors.primaryDark,
            fontSize: 36,
            '@media (max-width: 800px)': { fontSize: 30 },
            '@media (max-width: 450px)': { fontSize: 25 },
          }}
        >
          {title}
        </Box>
        <Box sx={{ position: 'relative', color: colors.primaryDark, display: 'flex', gap: '20px' }}>
          <Box>{dateService.formatToDate(date)}</Box>
          <Box>
            {t('article.readingTime')} - {readingTime}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
