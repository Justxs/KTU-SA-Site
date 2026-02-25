'use client';

import { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { motion } from 'framer-motion';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import SectionName from '@components/sectionName/SectionName';
import { useTranslations } from 'next-intl';
import FSA_DATA from '@constants/FsaUnits';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import colors from '@theme/colors';
import { focusOutline } from '@theme/styles';

const FsaButton = styled(Button)({
  color: colors.primaryDark,
  background: 'transparent',
  textTransform: 'none',
  padding: '12px',
  fontFamily: 'PFDinTextPro-Medium',
  letterSpacing: '1px',
  fontSize: '20px',
  '&:hover': {
    background: colors.white,
    color: colors.accentBlue,
  },
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
  },
});

export default function FsaSection() {
  const t = useTranslations();
  const [currentLogo, setCurrentLogo] = useState<StaticImageData>(KTUSA);
  const fsaData = FSA_DATA(t);

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <SectionName title={t('sections.fsa')} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '100px',
          '@media (max-width: 1300px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 315,
            '@media (max-width: 1300px)': {
              display: 'none',
            },
          }}
        >
          <motion.img
            key={currentLogo.src}
            src={currentLogo.src}
            alt="FSA Logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '15vw',
            }}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '@media (max-width: 1300px)': {
              alignItems: 'center',
              gap: '50px',
            },
          }}
        >
          {fsaData.map((fsa) => (
            <Box
              key={fsa.name}
              onMouseEnter={() => setCurrentLogo(fsa.logo)}
              onMouseLeave={() => setCurrentLogo(KTUSA)}
            >
              <Box
                sx={{
                  display: 'none',
                  '@media (max-width: 1300px)': {
                    display: 'flex',
                    justifyContent: 'center',
                  },
                }}
              >
                <Box
                  component={Link}
                  href={`fsa/${fsa.name}`}
                  aria-label={fsa.fullName}
                  sx={{ display: 'flex', ...focusOutline }}
                >
                  <Image
                    src={fsa.logo}
                    alt={fsa.name}
                    style={{ width: 300, maxHeight: 200, objectFit: 'contain' }}
                  />
                </Box>
              </Box>
              <FsaButton LinkComponent={Link} href={`fsa/${fsa.name}`} disableFocusRipple>
                <Box
                  component="span"
                  sx={{
                    '@media (max-width: 1300px)': {
                      textAlign: 'center',
                    },
                  }}
                >
                  {fsa.fullName}
                </Box>
              </FsaButton>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
