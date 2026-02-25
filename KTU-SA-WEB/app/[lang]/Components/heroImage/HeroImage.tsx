'use client';

import React from 'react';
import HeroImg from '@public/assets/design-elements/MainHeroImage.png';
import Smiley from '@public/assets/design-elements/Smiley.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Box, Typography } from '@mui/material';
import colors from '@theme/colors';

export default function HeroImage() {
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        bgcolor: 'rgba(241, 246, 255, 255)',
        borderRadius: '8px',
        justifyContent: 'space-around',
        pb: '40px',
        position: 'relative',
        '@media (max-width: 1000px)': {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          ml: '20px',
          width: '40%',
          pb: '20px',
          '@media (max-width: 1600px)': { width: '70vw' },
          '@media (max-width: 1000px)': { width: '90%' },
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: 'transparent',
            WebkitTextStroke: `3px ${colors.mediumBlue}`,
            fontFamily: 'PFDinTextPro-Bold',
            fontSize: '120px',
            lineHeight: 0.95,
            letterSpacing: '6px',
            mb: '60px',
            mt: '5vh',
            '@media (max-width: 1600px)': { fontSize: '100px' },
            '@media (max-width: 1450px)': { fontSize: '80px' },
            '@media (max-width: 600px)': {
              fontSize: '50px',
              WebkitTextStroke: `2px ${colors.mediumBlue}`,
            },
            '@media (max-width: 450px)': {
              fontSize: '40px',
              mb: '20px',
            },
            '@media (max-width: 320px)': {
              fontSize: '30px',
              WebkitTextStroke: `1px ${colors.mediumBlue}`,
              mb: '20px',
            },
          }}
        >
          {t('common.ktusa')}
        </Typography>
        <Typography
          sx={{
            color: colors.heroTextBlue,
            fontSize: '25px',
            letterSpacing: '1px',
            '@media (max-width: 450px)': { fontSize: '20px' },
            '@media (max-width: 320px)': { fontSize: '15px' },
          }}
        >
          {t('home.text')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '50vw',
          '@media (max-width: 1000px)': {
            width: 'auto',
            minHeight: '50vh',
          },
          '@media (max-width: 450px)': { minHeight: '40vh' },
        }}
      >
        <Box
          component={Image}
          src={HeroImg}
          alt="Hero image"
          sizes="90%"
          sx={{
            width: 'auto',
            height: '65vh',
            '@media (max-width: 1000px)': {
              width: '90vw',
              height: 'auto',
            },
            '@media (max-width: 450px)': {
              height: '40vh',
              width: 'auto',
            },
            '@media (max-width: 320px)': {
              height: '30vh',
            },
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
          '@media (max-width: 1450px)': { display: 'none' },
        }}
      />
    </Box>
  );
}
