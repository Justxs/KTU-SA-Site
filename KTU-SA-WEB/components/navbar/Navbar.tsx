'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import NAVIGATION_LINKS from '@constants/NavigationLinks';
import Link from 'next/link';
import Hamburger from './hamburger/Hamburger';
import NavigationButton from './navigationButton/NavigationButton';
import SocialIcons from './socialIcons/SocialIcons';
import ExpandNavigation from './expandNavigation/ExpandNavigation';
import Logo from './logo/Logo';
import * as motion from 'motion/react-client';
import colors from '@theme/colors';

const navBtnSx = {
  display: 'inline-flex',
  p: '6px 14px',
  justifyContent: 'center',
  alignItems: 'center',
  color: colors.primaryDark,
  borderRadius: '8px',
  bgcolor: 'transparent',
  fontSize: 16,
  fontFamily: 'PFDinTextPro-Medium',
  letterSpacing: '0.3px',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&:hover': {
    bgcolor: colors.navbarLightBlue,
    color: colors.mediumBlue,
  },
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
    borderRadius: '8px',
  },
};

export default function Navbar() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigationLinks = NAVIGATION_LINKS(t);

  const toggleExpansion = (section: any) => {
    if (currentSection?.header === section.header) {
      setExpanded((prev) => !prev);
    } else {
      setCurrentSection(section);
      setExpanded(true);
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setExpanded(false);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: 'easeIn' as const, when: 'afterChildren' as const },
    },
  };

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : colors.white,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 12px rgba(14,38,67,0.07)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Brand accent line */}
      <Box sx={{ height: '3px', bgcolor: colors.activeYellow }} />

      <Box sx={{ px: { xs: '20px', md: '48px', xl: '150px' } }}>
        <Box
          id="top"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            gap: '8px',
            '@media (max-width: 1300px)': {
              flexDirection: 'column',
              gap: 0,
            },
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Logo isOpen={isOpen} />
            <Hamburger toggleMenu={toggleOpen} isOpen={isOpen} />
          </Box>
          <Box
            component={motion.div}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '6px',
              width: '100%',
              py: '12px',
              '@media (max-width: 1300px)': {
                flexDirection: 'column',
                alignItems: 'start',
                p: 0,
                pb: isOpen ? '16px' : 0,
              },
            }}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={menuVariants}
          >
            {navigationLinks.map((section) => (
              <NavigationButton
                key={section.header}
                title={section.header}
                expanded={expanded && currentSection?.header === section.header}
                onExpand={() => toggleExpansion(section)}
              />
            ))}
            <Box component={Link} href="/contacts" sx={navBtnSx}>
              {t('navbar.contacts')}
            </Box>
            <Box
              component="a"
              href="https://lsp.lt"
              target="_blank"
              rel="noopener noreferrer"
              sx={navBtnSx}
            >
              {t('navbar.lsp')}
            </Box>
            <SocialIcons />
          </Box>
        </Box>
      </Box>

      <ExpandNavigation open={expanded} setOpen={setExpanded} currentSection={currentSection} />
    </Box>
  );
}
