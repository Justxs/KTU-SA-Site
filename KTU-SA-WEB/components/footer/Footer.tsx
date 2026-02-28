import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import KTUSA from '@public/icons/logos/KTUSA_baltas.svg';
import NAVIGATION_LINKS from '@constants/NavigationLinks';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getMainContacts } from '@api/GetContacts';
import { SA_UNITS } from '@constants/saUnits';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import colors from '@theme/colors';
import { focusOutlineLight } from '@theme/styles';

const sectionHeaderSx = {
  fontFamily: 'PFDinTextPro-Medium',
  fontSize: 12,
  color: colors.activeYellow,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  mb: '14px',
};

const socialBtnSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '10px',
  bgcolor: 'rgba(255,255,255,0.08)',
  color: colors.offWhite,
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.15)',
    color: colors.white,
    transform: 'translateY(-2px)',
  },
  ...focusOutlineLight,
};

export default async function Footer() {
  const [t, mainContacts] = await Promise.all([getTranslations(), getMainContacts(SA_UNITS.CSA)]);
  const navigationLinks = NAVIGATION_LINKS(t);

  return (
    <Box
      component="footer"
      role="contentinfo"
      aria-label="Site footer"
      sx={{ position: 'relative', zIndex: 3 }}
    >
      <Box
        sx={{
          bgcolor: colors.primaryDark,
          color: colors.offWhite,
          px: { xs: '24px', md: '48px', xl: '80px' },
          pt: { xs: '40px', md: '56px' },
          pb: '24px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: '220px repeat(4, 1fr) auto',
            },
            gap: { xs: '32px', md: '24px' },
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              '@media (max-width: 899px)': {
                gridColumn: '1 / -1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              },
            }}
          >
            <Image alt="KTU SA white logo" src={KTUSA} width={72} style={{ marginBottom: 16 }} />
            <Typography
              sx={{ fontSize: 14, color: 'rgba(246,247,248,0.5)', lineHeight: 1.6, mb: '12px' }}
            >
              {t('common.ktusa')}
            </Typography>
            <Box
              component="a"
              href={`http://maps.google.com/?q=${mainContacts.address}`}
              rel="noopener noreferrer"
              target="_blank"
              className="footer-link"
              sx={{ display: 'block', mb: '8px' }}
            >
              {mainContacts.address}
            </Box>
            <Box
              component="a"
              href={`mailto:${mainContacts.email}`}
              rel="noopener noreferrer"
              target="_blank"
              className="footer-link"
            >
              {mainContacts.email}
            </Box>
          </Box>

          {navigationLinks.map((section) => (
            <Box key={section.header}>
              <Typography sx={sectionHeaderSx}>{section.header}</Typography>
              <Stack sx={{ gap: '8px' }}>
                {section.links.map((link) => (
                  <Link key={link.path} href={link.path} className="footer-link">
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}

          <Box>
            <Stack sx={{ gap: '8px' }}>
              <Link href="/contacts" className="footer-link">
                {t('navbar.contacts')}
              </Link>
              <Box
                component="a"
                href="https://lsp.lt/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {t('navbar.lspFull')}
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            height: '1px',
            bgcolor: 'rgba(255,255,255,0.08)',
            maxWidth: 1400,
            mx: 'auto',
            mt: { xs: '32px', md: '48px' },
            mb: '20px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Stack direction="row" sx={{ gap: '8px' }}>
            <Box
              component="a"
              href={SOCIAL_LINKS.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={socialBtnSx}
            >
              <FacebookIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box
              component="a"
              href={SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={socialBtnSx}
            >
              <InstagramIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box
              component="a"
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={socialBtnSx}
            >
              <LinkedInIcon sx={{ fontSize: 20 }} />
            </Box>
          </Stack>

          <Typography sx={{ fontSize: 13, color: 'rgba(246,247,248,0.35)' }}>
            © {new Date().getFullYear()} KTU SA
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
