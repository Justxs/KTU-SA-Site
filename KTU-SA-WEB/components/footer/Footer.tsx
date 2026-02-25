'use client';

import React from 'react';
import { Box } from '@mui/material';
import KTUSA from '@public/icons/logos/KTUSA_baltas.svg';
import NAVIGATION_LINKS from '@constants/NavigationLinks';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';
import { focusOutlineLight } from '@theme/styles';

const linkSx = {
  fontSize: 16,
  color: colors.offWhite,
  transition: '0.3s',
  textDecoration: 'none',
  '&:hover': {
    color: colors.lightBlueAccent,
  },
  ...focusOutlineLight,
};

export default function Footer() {
  const t = useTranslations();
  const navigationLinks = NAVIGATION_LINKS(t);

  return (
    <Box
      component="footer"
      role="contentinfo"
      aria-label="Site footer"
      sx={{
        position: 'relative',
        zIndex: 3,
        alignItems: 'flex-start',
        bgcolor: 'var(--primary-dark)',
        color: colors.offWhite,
        display: 'flex',
        p: '48px 48px 32px',
        fontSize: 16,
        letterSpacing: '0.5px',
        '@media (max-width: 1200px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Box
        sx={{
          '@media (max-width: 1200px)': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          },
        }}
      >
        <Image alt="KTU SA white logo" src={KTUSA} width={84} />
        <Box
          sx={{
            mt: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            '@media (max-width: 1200px)': {
              height: 143,
            },
          }}
        >
          <Box>{t('common.ktusa')}</Box>
          <Box
            component="a"
            href="https://maps.app.goo.gl/NfpCNmDJq65sUCqc7"
            rel="noopener noreferrer"
            target="_blank"
            sx={linkSx}
          >
            K. Donelaičio g. 73
            <Box>LT-44029 Kaunas</Box>
          </Box>
          <Box
            component="a"
            href="mailto:info@ktusa.lt"
            rel="noopener noreferrer"
            target="_blank"
            sx={linkSx}
          >
            info@ktusa.lt
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          gap: '10px',
          width: '100%',
          '@media (max-width: 760px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '20px',
          },
          '@media (max-width: 320px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridTemplateRows: 'repeat(1, 1fr)',
          },
        }}
      >
        {navigationLinks.map((section) => (
          <Box
            key={section.header}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 18,
              gap: 1,
              '& > *:not(:first-of-type):hover': {
                color: colors.lightBlueAccent,
              },
            }}
          >
            <Box sx={{ fontFamily: 'PFDinTextPro-Medium', fontSize: 18 }}>{section.header}</Box>
            {section.links.map((link) => (
              <Box key={link.path} component={Link} href={link.path} sx={linkSx}>
                {link.name}
              </Box>
            ))}
          </Box>
        ))}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            fontFamily: 'PFDinTextPro-Medium',
            '&:hover': {
              color: colors.lightBlueAccent,
            },
            '@media (max-width: 760px)': {
              gap: 1,
            },
          }}
        >
          <Box
            component="a"
            href="https://lsp.lt/"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx}
          >
            <span>{t('navbar.lspFull')}</span>
          </Box>
          <Box component={Link} href="/Contacts" sx={linkSx}>
            <span>{t('navbar.contacts')}</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
