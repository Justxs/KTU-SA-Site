'use client';

import SocialLinks from './components/SocialLinks';
import DepthSvg from '@public/assets/design-elements/Depth.svg';
import SmileySvg from '@public/assets/design-elements/Smiley.svg';
import InfinitySvg from '@public/assets/design-elements/Infinity.svg';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PHOTOS } from '@constants/photos';
import { Box, Typography, keyframes } from '@mui/material';
import colors from '@theme/colors';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const floatRotate = keyframes`
  0%, 100% { transform: translateY(0) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-2deg); }
`;

const baseImageSx = {
  zIndex: 2,
  borderRadius: '14px',
  boxShadow: '0 8px 32px rgba(14, 38, 67, 0.18), 0 2px 8px rgba(14, 38, 67, 0.10)',
  position: 'absolute' as const,
  overflow: 'hidden',
  transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease',
  '&:hover': {
    transform: 'scale(1.04) rotate(0deg) !important',
    boxShadow: '0 16px 48px rgba(14, 38, 67, 0.22), 0 4px 12px rgba(14, 38, 67, 0.12)',
    zIndex: 4,
  },
};

export default function SocialMedia() {
  const t = useTranslations();

  return (
    <Box
      id={t('sections.follow')}
      sx={{
        position: 'relative',
        height: '832px',
        display: 'flex',
        flexDirection: 'column',
        mb: '-10px',
        '@media (max-width: 1200px)': { height: '1200px' },
      }}
    >
      {/* Top diagonal divider */}
      <Box
        aria-hidden="true"
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '95px',
          mb: '-1px',
          zIndex: 2,
        }}
      >
        <polygon points="100,0 100,100 0,100" fill={colors.lightBlueAccent} />
      </Box>
      <div>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            height: '737px',
            width: '100%',
            bgcolor: colors.lightBlueAccent,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
            '@media (max-width: 1200px)': {
              pt: '200px',
              pb: '160px',
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              width: '30vw',
              textAlign: 'center',
              fontSize: 'clamp(24px, 2.5vw, 36px)',
              fontWeight: 700,
              letterSpacing: '3px',
              color: colors.primaryDark,
              mb: '20px',
              lineHeight: 1.3,
              '@media (max-width: 1200px)': { width: '50vw' },
              '@media (max-width: 760px)': { width: '80vw' },
            }}
          >
            {t('sections.follow').toUpperCase()}
          </Typography>
          <SocialLinks />

          {/* Decorative photos & SVGs */}
          <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Photo: top-right */}
            <Box
              sx={{
                ...baseImageSx,
                width: '215px',
                height: '230px',
                right: '300px',
                top: '30px',
                transform: 'rotate(-12deg)',
                '@media (max-width: 1700px)': { right: '100px' },
                '@media (max-width: 1200px)': { right: '25px' },
                '@media (max-width: 760px)': { display: 'none' },
              }}
            >
              <Image
                src={PHOTOS.DISCUSSION_PHOTO_URL}
                alt="Discussion"
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {/* Photo: top-left */}
            <Box
              sx={{
                ...baseImageSx,
                width: '300px',
                height: '250px',
                left: '300px',
                top: '50px',
                transform: 'rotate(10deg)',
                '@media (max-width: 1700px)': { left: '50px' },
                '@media (max-width: 1200px)': { left: '-50px' },
                '@media (max-width: 250px)': { display: 'none' },
              }}
            >
              <Image
                src={PHOTOS.SHM_GIRLS_PHOTO_URL}
                alt="KTU FSA SHM girls"
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {/* Photo: mid-right */}
            <Box
              sx={{
                ...baseImageSx,
                width: '300px',
                height: '200px',
                right: '300px',
                top: '320px',
                transform: 'rotate(8deg)',
                '@media (max-width: 1700px)': { right: '50px' },
                '@media (max-width: 1200px)': {
                  right: '25px',
                  top: 'auto',
                  bottom: '150px',
                },
                '@media (max-width: 320px)': { display: 'none' },
              }}
            >
              <Image
                src={PHOTOS.KTU_SA_PRESIDENT_PHOTO_URL}
                alt="KTU SA President running"
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {/* Photo: bottom-left */}
            <Box
              sx={{
                ...baseImageSx,
                width: '350px',
                height: '300px',
                left: '300px',
                top: '400px',
                transform: 'rotate(-10deg) scale(0.8)',
                '@media (max-width: 1700px)': { left: '50px' },
                '@media (max-width: 1200px)': {
                  left: 0,
                  top: 'auto',
                  bottom: '100px',
                },
                '@media (max-width: 760px)': { display: 'none' },
              }}
            >
              <Image
                src={PHOTOS.KTU_SA_PHOTO_URL}
                alt="KTU SA"
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Decorative SVG: Depth */}
            <Box
              component={Image}
              src={DepthSvg}
              alt=""
              width={0}
              height={0}
              sx={{
                position: 'absolute',
                width: '155px',
                height: '155px',
                right: '200px',
                top: '-200px',
                opacity: 0.7,
                animation: `${float} 6s ease-in-out infinite`,
                '@media (max-width: 1700px)': { right: '50px' },
                '@media (max-width: 1200px)': { display: 'none' },
              }}
            />
            {/* Decorative SVG: Smiley */}
            <Box
              component={Image}
              src={SmileySvg}
              alt=""
              width={0}
              height={0}
              sx={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                left: '300px',
                top: '300px',
                opacity: 0.7,
                animation: `${float} 7s ease-in-out 1s infinite`,
                '@media (max-width: 1700px)': { left: '50px' },
                '@media (max-width: 1200px)': {
                  left: 'auto',
                  right: 0,
                  top: '250px',
                },
              }}
            />
            {/* Decorative SVG: Infinity */}
            <Box
              component={Image}
              src={InfinitySvg}
              alt=""
              width={0}
              height={0}
              sx={{
                position: 'absolute',
                width: '300px',
                height: '200px',
                right: '350px',
                bottom: '100px',
                opacity: 0.7,
                animation: `${floatRotate} 8s ease-in-out 0.5s infinite`,
                '@media (max-width: 1700px)': { right: '100px' },
                '@media (max-width: 1200px)': { right: '10px' },
              }}
            />
          </Box>
        </Box>
      </div>
      {/* Bottom diagonal divider */}
      <Box
        aria-hidden="true"
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '95px',
          zIndex: 3,
          mt: 'auto',
        }}
      >
        <polygon points="100,0 100,100 0,100" fill={colors.primaryDark} />
      </Box>
    </Box>
  );
}
