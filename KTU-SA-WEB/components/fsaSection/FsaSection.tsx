'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import SectionName from '@components/sectionName/SectionName';
import { useTranslations } from 'next-intl';
import FSA_DATA from '@constants/FsaUnits';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import colors from '@theme/colors';

export default function FsaSection() {
  const t = useTranslations();
  const [currentLogo, setCurrentLogo] = useState<StaticImageData>(KTUSA);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const fsaData = FSA_DATA(t);

  return (
    <>
      <SectionName title={t('sections.fsa')} />

      {/* ── Desktop layout: logo preview + text list ── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          alignItems: 'center',
          '@media (max-width: 1100px)': {
            display: 'none',
          },
        }}
      >
        {/* Animated logo preview */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 340,
            height: 340,
            flexShrink: 0,
            borderRadius: '28px',
            background: hoveredColor
              ? `linear-gradient(135deg, ${hoveredColor}12, ${hoveredColor}08)`
              : colors.lightBlueBg,
            border: hoveredColor ? `1.5px solid ${hoveredColor}30` : '1.5px solid transparent',
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentLogo.src}
              src={currentLogo.src}
              alt="FSA Logo"
              style={{
                maxWidth: 240,
                maxHeight: 240,
                objectFit: 'contain',
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </AnimatePresence>
        </Box>

        {/* Text list */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            minWidth: 520,
            maxWidth: 620,
            backgroundColor: '#f8fafe',
            borderRadius: '20px',
            padding: '10px 8px',
          }}
        >
          {fsaData.map((fsa) => (
            <Box
              key={fsa.name}
              component={Link}
              href={`fsa/${fsa.name}`}
              onMouseEnter={() => {
                setCurrentLogo(fsa.logo);
                setHoveredColor(fsa.mainColor);
              }}
              onMouseLeave={() => {
                setCurrentLogo(KTUSA);
                setHoveredColor(null);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '11px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: colors.primaryDark,
                transition: 'all 0.2s ease',
                position: 'relative',
                '&:hover': {
                  backgroundColor: fsa.backgroundColor,
                  '& .fsa-abbr': {
                    backgroundColor: fsa.mainColor,
                    color: '#fff',
                    boxShadow: `0 2px 8px ${fsa.mainColor}30`,
                  },
                  '& .fsa-name': {
                    color: fsa.mainColor,
                  },
                },
                '&:focus-visible': {
                  outline: `2px solid ${colors.focusBlue}`,
                  borderRadius: '12px',
                },
              }}
            >
              <Box
                className="fsa-abbr"
                component="span"
                sx={{
                  fontFamily: 'PFDinTextPro-Bold, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                  lineHeight: 1,
                  padding: '6px 0',
                  borderRadius: '8px',
                  backgroundColor: `${fsa.mainColor}14`,
                  color: fsa.mainColor,
                  flexShrink: 0,
                  width: 105,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                {fsa.name}
              </Box>
              <Box
                className="fsa-name"
                component="span"
                sx={{
                  fontFamily: 'PFDinTextPro-Medium',
                  fontSize: '15px',
                  letterSpacing: '0.2px',
                  lineHeight: 1.35,
                  color: colors.primaryDark,
                  transition: 'color 0.2s ease',
                }}
              >
                {fsa.fullName}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Mobile layout: branded card grid ── */}
      <Box
        sx={{
          display: 'none',
          '@media (max-width: 1100px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px',
            maxWidth: 600,
            mx: 'auto',
          },
          '@media (max-width: 520px)': {
            gridTemplateColumns: '1fr',
            maxWidth: 360,
          },
        }}
      >
        {fsaData.map((fsa) => (
          <Box
            key={fsa.name}
            component={Link}
            href={`fsa/${fsa.name}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              padding: '24px 16px 20px',
              borderRadius: '16px',
              backgroundColor: fsa.backgroundColor,
              border: `1.5px solid transparent`,
              textDecoration: 'none',
              color: fsa.textColor,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: fsa.borderColor,
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${fsa.mainColor}18`,
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              '&:focus-visible': {
                outline: `2px solid ${colors.focusBlue}`,
                borderRadius: '16px',
              },
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Image
                src={fsa.logo}
                alt={fsa.name}
                style={{
                  width: 64,
                  height: 64,
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Box
              component="span"
              sx={{
                fontFamily: 'PFDinTextPro-Medium',
                fontSize: '14px',
                letterSpacing: '0.3px',
                lineHeight: 1.35,
                textAlign: 'center',
              }}
            >
              {fsa.fullName}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
