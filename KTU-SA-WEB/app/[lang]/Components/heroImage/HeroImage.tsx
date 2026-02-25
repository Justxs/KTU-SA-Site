'use client';

import React from 'react';
import HeroImg from '@public/assets/design-elements/MainHeroImage.png';
import Smiley from '@public/assets/design-elements/Smiley.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Box, Stack, Typography } from '@mui/material';
import colors from '@theme/colors';

export default function HeroImage() {
  const t = useTranslations();

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', lg: 'row' },
        bgcolor: colors.lightBlueBg,
        borderRadius: '12px',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: '32px', lg: 0 },
        px: { xs: '20px', lg: 0 },
        gap: { xs: '24px', lg: 0 },
        mb: { xs: '32px', lg: '48px' },
      }}
    >
      <Stack
        sx={{
          ml: { xs: 0, lg: '48px' },
          width: { xs: '100%', lg: '40%' },
          gap: '24px',
          zIndex: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: 'transparent',
            WebkitTextStroke: `3px ${colors.mediumBlue}`,
            fontFamily: 'PFDinTextPro-Bold',
            fontSize: 'clamp(40px, 8vw, 120px)',
            lineHeight: 0.95,
            letterSpacing: '6px',
          }}
        >
          {t('common.ktusa')}
        </Typography>
        <Typography
          sx={{
            color: colors.heroTextBlue,
            fontSize: 'clamp(16px, 2vw, 25px)',
            letterSpacing: '1px',
            lineHeight: 1.5,
          }}
        >
          {t('home.text')}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          minHeight: { xs: '40vh', lg: '65vh' },
        }}
      >
        <Box
          component={Image}
          src={HeroImg}
          alt="Hero image"
          sizes="(max-width: 1000px) 90vw, 50vw"
          priority
          placeholder="blur"
          sx={{
            width: 'auto',
            height: { xs: 'auto', lg: '65vh' },
            maxWidth: { xs: '90vw', lg: 'none' },
          }}
        />
      </Box>

      <Box
        component={Image}
        src={Smiley}
        alt=""
        sx={{
          position: 'absolute',
          width: '85px',
          top: '190px',
          left: '50%',
          transform: 'rotate(-60deg)',
          display: { xs: 'none', xl: 'block' },
        }}
      />
    </Stack>
  );
}
