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
        bgcolor: colors.lightBlueBg,
        py: { xs: '32px', md: '48px' },
        px: { xs: '20px', md: '48px' },
        gap: { xs: '24px', md: '40px' },
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        mb: { xs: '32px', md: '48px' },
      }}
    >
      <Stack
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', md: 520 },
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          gap: '12px',
          zIndex: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: colors.primaryDark,
            fontFamily: 'PFDinTextPro-Medium',
            fontSize: { xs: '28px', sm: '34px', md: '40px' },
            lineHeight: 1.15,
          }}
        >
          {displayTitle}
        </Typography>
        {heroSection.description && (
          <Typography
            sx={{
              color: colors.mediumBlue,
              fontSize: { xs: 16, md: 20 },
              letterSpacing: '0.8px',
              lineHeight: 1.5,
            }}
          >
            {heroSection.description}
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          position: 'relative',
          transform: 'rotate(3deg)',
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(14,38,67,0.15)',
            border: `6px solid ${colors.mediumBlue}`,
          }}
        >
          <Image
            src={heroSection.imgSrc}
            alt={displayTitle}
            width={380}
            height={460}
            sizes="(max-width: 800px) 70vw, 380px"
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR_PLACEHOLDER}
            style={{
              display: 'block',
              width: 'auto',
              height: '38vh',
              minHeight: 280,
              maxHeight: 460,
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
      <Box sx={bottomAccentBar()} />
    </Stack>
  );
}
