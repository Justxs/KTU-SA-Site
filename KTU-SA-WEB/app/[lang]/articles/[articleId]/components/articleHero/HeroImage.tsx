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
        background: `linear-gradient(135deg, ${colors.lightBlueBg} 0%, #E3EEFB 50%, ${colors.lightBlueBg} 100%)`,
        gap: { xs: '32px', lg: '48px' },
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        py: { xs: '40px', lg: '64px' },
        px: { xs: '20px', sm: '32px', lg: '64px' },
        flexDirection: { xs: 'column', lg: 'row' },
        mb: { xs: '32px', lg: '48px' },
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-60px', lg: '-100px' },
          left: { xs: '-80px', lg: '-120px' },
          width: { xs: 220, lg: 360 },
          height: { xs: 220, lg: 360 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '-40px', lg: '-80px' },
          right: { xs: '-60px', lg: '-100px' },
          width: { xs: 180, lg: 300 },
          height: { xs: 180, lg: 300 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Image with decorative frame */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: '80vw', lg: '45vw' },
          maxWidth: 720,
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: -12,
            bottom: -12,
            borderRadius: '20px',
            border: `3px solid ${colors.lightBlueAccent}`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: { xs: -20, lg: -28 },
            right: { xs: -16, lg: -28 },
            width: { xs: 48, lg: 64 },
            height: { xs: 48, lg: 64 },
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: `radial-gradient(${colors.lightBlueAccent} 2px, transparent 2px)`,
            backgroundSize: '10px 10px',
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '16 / 9',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(14,38,67,0.18), 0 4px 12px rgba(14,38,67,0.08)',
            zIndex: 1,
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
      </Box>

      <Stack
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', lg: 520 },
          justifyContent: 'center',
          alignItems: { xs: 'center', lg: 'flex-start' },
          gap: '16px',
          zIndex: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: colors.primaryDark,
            fontSize: { xs: '26px', sm: '32px', md: '40px' },
            lineHeight: 1.15,
            textAlign: { xs: 'center', lg: 'left' },
            fontFamily: 'PFDinTextPro-Medium',
            position: 'relative',
            pb: '12px',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: { xs: '50%', lg: 0 },
              transform: { xs: 'translateX(-50%)', lg: 'none' },
              width: 56,
              height: 4,
              borderRadius: 2,
              bgcolor: colors.linkBlue,
            },
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
