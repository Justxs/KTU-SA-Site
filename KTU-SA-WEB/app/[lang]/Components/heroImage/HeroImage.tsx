'use client';

import React from 'react';
import HeroImg from '@public/assets/design-elements/MainHeroImage.png';
import Smiley from '@public/assets/design-elements/Smiley.svg';
import Depth from '@public/assets/design-elements/Depth.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'motion/react';
import colors from '@theme/colors';

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

export default function HeroImage() {
  const t = useTranslations();

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        background: `linear-gradient(135deg, ${colors.lightBlueBg} 0%, #E3EEFB 50%, ${colors.lightBlueBg} 100%)`,
        borderRadius: { xs: '16px', md: '20px' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        position: 'relative',
        overflow: 'hidden',
        py: { xs: '16px', sm: '24px', md: '28px', lg: '10px' },
        px: { xs: '24px', sm: '32px', md: '40px', lg: '56px', xl: '72px' },
        gap: { xs: '24px', md: 0 },
        mb: { xs: '32px', md: '48px', lg: '56px' },
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

      {/* ── Text content ── */}
      <MotionStack
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          width: { xs: '100%', md: '48%', lg: '45%' },
          gap: 0,
          zIndex: 1,
        }}
      >
        <MotionTypography
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          variant="h1"
          sx={{
            color: 'transparent',
            WebkitTextStroke: {
              xs: `2px ${colors.mediumBlue}`,
              sm: `2.5px ${colors.mediumBlue}`,
              lg: `3px ${colors.mediumBlue}`,
            },
            fontFamily: 'PFDinTextPro-Bold',
            fontSize: {
              xs: '40px',
              sm: '52px',
              md: '56px',
              lg: '80px',
              xl: '110px',
            },
            lineHeight: 0.95,
            letterSpacing: { xs: '2px', sm: '3px', lg: '5px' },
            mb: { xs: '16px', sm: '20px', lg: '24px' },
          }}
        >
          {t('common.ktusa')}
        </MotionTypography>

        {/* ── Separator line ── */}
        <MotionBox
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          sx={{
            width: { xs: '60px', sm: '80px', lg: '100px' },
            height: '3px',
            bgcolor: colors.mediumBlue,
            borderRadius: '2px',
            mb: { xs: '16px', sm: '20px', lg: '24px' },
            transformOrigin: 'left',
          }}
        />

        <MotionTypography
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
          sx={{
            color: colors.heroTextBlue,
            fontSize: { xs: '15px', sm: '16px', md: '17px', lg: '20px', xl: '23px' },
            letterSpacing: '0.3px',
            lineHeight: 1.65,
            fontStyle: 'italic',
            maxWidth: { xs: '100%', md: '480px', lg: '520px' },
          }}
        >
          {t('home.text')}
        </MotionTypography>
      </MotionStack>

      {/* ── Hero image ── */}
      <MotionBox
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
          width: { xs: '100%', md: '50%', lg: '52%' },
          zIndex: 1,
        }}
      >
        <Box
          component={Image}
          src={HeroImg}
          alt="Hero image"
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 45vw"
          priority
          placeholder="empty"
          sx={{
            width: {
              xs: '90%',
              sm: '80%',
              md: '100%',
            },
            height: 'auto',
            maxWidth: { xs: '400px', sm: '440px', md: 'none' },
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </MotionBox>

      {/* ── Floating Smiley ── */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          rotate: [-15, -10, -15],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.6 },
          y: { duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 0.6 },
          rotate: { duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 0.6 },
        }}
        sx={{
          position: 'absolute',
          width: { sm: '40px', md: '50px', lg: '60px', xl: '70px' },
          top: { xs: '55%', sm: '50%', md: '35%', lg: '32%' },
          left: { xs: '70%', sm: '65%', md: '44%', lg: '46%' },
          display: { xs: 'none', sm: 'block' },
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Image src={Smiley} alt="" style={{ width: '100%', height: 'auto' }} />
      </MotionBox>

      {/* ── Floating Depth element ── */}
      <MotionBox
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 0.6,
          y: [0, -8, 0],
          rotate: [12, 18, 12],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.8 },
          y: { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.8 },
          rotate: { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.8 },
        }}
        sx={{
          position: 'absolute',
          width: { md: '36px', lg: '44px', xl: '52px' },
          top: { md: '12%', lg: '10%' },
          right: { md: '6%', lg: '5%' },
          display: { xs: 'none', md: 'block' },
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Image src={Depth} alt="" style={{ width: '100%', height: 'auto' }} />
      </MotionBox>
    </Stack>
  );
}
