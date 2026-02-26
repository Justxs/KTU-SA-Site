import { Box, Stack, Typography } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { getHeroImage } from '@api/GetHeroImage';
import Image from 'next/image';
import colors from '@theme/colors';
import { HERO_BLUR_PLACEHOLDER, bottomAccentBar } from '@theme/styles';

export default async function HeroImage({ sectionName }: Readonly<{ sectionName: string }>) {
  const t = await getTranslations();
  const locale = await getLocale();
  const heroSection = await getHeroImage(locale, sectionName);

  const displayTitle =
    t('pages.socialHelp').toLowerCase() === heroSection.title.toLowerCase()
      ? t('navbar.needHelp.EmotionalHelp')
      : heroSection.title;

  return (
    <Stack
      sx={{
        background: `linear-gradient(135deg, ${colors.lightBlueBg} 0%, #E3EEFB 50%, ${colors.lightBlueBg} 100%)`,
        py: { xs: '40px', md: '64px' },
        px: { xs: '20px', sm: '32px', md: '64px', lg: '96px' },
        gap: { xs: '32px', md: '48px' },
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        mb: { xs: '32px', md: '48px' },
      }}
    >
      {/* Decorative background circle */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-60px', md: '-100px' },
          left: { xs: '-80px', md: '-120px' },
          width: { xs: 220, md: 360 },
          height: { xs: 220, md: 360 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Decorative background circle bottom-right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '-40px', md: '-80px' },
          right: { xs: '-60px', md: '-100px' },
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Stack
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', md: 560 },
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          gap: '16px',
          zIndex: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: colors.primaryDark,
            fontFamily: 'PFDinTextPro-Medium',
            fontSize: { xs: '30px', sm: '38px', md: '46px' },
            lineHeight: 1.12,
            position: 'relative',
            pb: '12px',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: { xs: '50%', md: 0 },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              width: 56,
              height: 4,
              borderRadius: 2,
              bgcolor: colors.linkBlue,
            },
          }}
        >
          {displayTitle}
        </Typography>
        {heroSection.description && (
          <Typography
            sx={{
              color: colors.mediumBlue,
              fontSize: { xs: 16, md: 20 },
              letterSpacing: '0.5px',
              lineHeight: 1.6,
              mt: '4px',
            }}
          >
            {heroSection.description}
          </Typography>
        )}
      </Stack>

      {/* Image section with offset frame decoration */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        {/* Offset decorative frame behind the image */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: -12,
            bottom: -12,
            borderRadius: '18px',
            border: `3px solid ${colors.lightBlueAccent}`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {/* Dot grid decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: -20, md: -28 },
            right: { xs: -16, md: -28 },
            width: { xs: 48, md: 64 },
            height: { xs: 48, md: 64 },
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: `radial-gradient(${colors.lightBlueAccent} 2px, transparent 2px)`,
            backgroundSize: '10px 10px',
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(14,38,67,0.18), 0 4px 12px rgba(14,38,67,0.08)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Image
            src={heroSection.imgSrc}
            alt={displayTitle}
            width={400}
            height={480}
            sizes="(max-width: 800px) 70vw, 400px"
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR_PLACEHOLDER}
            style={{
              display: 'block',
              width: 'auto',
              height: '40vh',
              minHeight: 300,
              maxHeight: 480,
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
      <Box sx={bottomAccentBar()} />
    </Stack>
  );
}
