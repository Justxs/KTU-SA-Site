'use client';

import SocialLinks from './components/SocialLinks';
import DepthSvg from '@public/assets/design-elements/Depth.svg';
import SmileySvg from '@public/assets/design-elements/Smiley.svg';
import InfinitySvg from '@public/assets/design-elements/Infinity.svg';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PHOTOS } from '@constants/photos';
import { Box, Typography } from '@mui/material';
import colors from '@theme/colors';

const baseImageSx = {
  zIndex: 2,
  borderRadius: '8px',
  boxShadow: '0px 1px 2px 0px black',
  position: 'absolute' as const,
  overflow: 'hidden',
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
      <Box
        aria-hidden="true"
        sx={{
          position: 'relative',
          mb: '-2px',
          borderLeft: '100vw solid transparent',
          borderBottom: `95px solid ${colors.lightBlueAccent}`,
          zIndex: 2,
        }}
      />
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
            gap: '20px',
            '@media (max-width: 1200px)': {
              pt: '200px',
              pb: '160px',
            },
          }}
        >
          <Typography
            sx={{
              width: '30vw',
              textAlign: 'center',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '2px',
              mb: '50px',
              '@media (max-width: 1200px)': { width: '50vw' },
              '@media (max-width: 760px)': { width: '80vw' },
            }}
          >
            {t('sections.follow').toUpperCase()}
          </Typography>
          <SocialLinks />
          <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
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
                '@media (max-width: 1700px)': { right: '50px' },
                '@media (max-width: 1200px)': { display: 'none' },
              }}
            />
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
                '@media (max-width: 1700px)': { left: '50px' },
                '@media (max-width: 1200px)': {
                  left: 'auto',
                  right: 0,
                  top: '250px',
                },
              }}
            />
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
                transform: 'rotate(5deg)',
                '@media (max-width: 1700px)': { right: '100px' },
                '@media (max-width: 1200px)': { right: '10px' },
              }}
            />
          </Box>
        </Box>
      </div>
      <Box
        aria-hidden="true"
        sx={{
          position: 'relative',
          zIndex: 3,
          mt: 'auto',
          bottom: 0,
          borderLeft: '100vw solid transparent',
          borderBottom: `95px solid ${colors.primaryDark}`,
        }}
      />
    </Box>
  );
}
