import dateService from '@utils/dateService';
import { Box, Stack, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import colors from '@theme/colors';
import { bottomAccentBar, metadataPill } from '@theme/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookShare from '@components/shareButtons/FacebookShare';
import LinkedInShare from '@components/shareButtons/LinkedInShare';
import ShareIcon from '@mui/icons-material/Share';

type Props = {
  img: string;
  title: string;
  date: Date;
  readingTime: string;
  htmlBody: string;
};

export default async function HeroImage(props: Readonly<Props>) {
  const { img, title, date, readingTime, htmlBody } = props;

  const t = await getTranslations();

  return (
    <Stack
      sx={{
        bgcolor: colors.lightBlueBg,
        gap: { xs: '24px', lg: '48px' },
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        py: { xs: '32px', lg: '48px' },
        px: { xs: '20px', lg: '64px' },
        flexDirection: { xs: 'column', lg: 'row' },
        mb: { xs: '32px', lg: '48px' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: '80vw', lg: '45vw' },
          maxWidth: 720,
          aspectRatio: '16 / 9',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(14,38,67,0.12)',
          flexShrink: 0,
        }}
      >
        <Image
          alt={title}
          src={img}
          fill
          sizes="(max-width: 1200px) 80vw, 45vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
      <Stack
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', lg: 520 },
          justifyContent: 'center',
          alignItems: { xs: 'center', lg: 'flex-start' },
          gap: '12px',
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: colors.primaryDark,
            fontSize: { xs: '24px', sm: '30px', md: '36px' },
            lineHeight: 1.2,
            textAlign: { xs: 'center', lg: 'left' },
            fontFamily: 'PFDinTextPro-Medium',
          }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', lg: 'flex-start' },
          }}
        >
          <Box sx={metadataPill}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            {dateService.formatToDate(date)}
          </Box>
          <Box sx={metadataPill}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            {t('article.readingTime')} - {readingTime}
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: '10px',
            mt: '4px',
          }}
        >
          <ShareIcon sx={{ fontSize: 18, color: colors.mediumBlue }} />
          <Typography
            sx={{ fontSize: 14, color: colors.mediumBlue, fontFamily: 'PFDinTextPro-Medium' }}
          >
            {t('common.share')}
          </Typography>
          <FacebookShare />
          <LinkedInShare title={title} preview={htmlBody} />
        </Stack>
      </Stack>
      <Box sx={bottomAccentBar()} />
    </Stack>
  );
}
