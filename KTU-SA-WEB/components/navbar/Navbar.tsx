'use client';

import { useState } from 'react';
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

const buttonSx = {
  display: 'inline-flex',
  p: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--primary-dark)',
  borderRadius: '4px',
  bgcolor: colors.white,
  fontSize: 20,
  fontFamily: 'PFDinTextPro-Medium',
  transition: '0.3s',
  textDecoration: 'none',
  '&:hover': {
    bgcolor: colors.navbarLightBlue,
  },
  '&:focus-visible': {
    bgcolor: colors.navbarLightBlue,
  },
};

export default function Navbar() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<any>(null);

  const navigationLinks = NAVIGATION_LINKS(t);

  const toggleExpansion = (section: any) => {
    if (currentSection?.header === section.header) {
      if (expanded) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    } else {
      setCurrentSection(section);
      setExpanded(true);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setExpanded(false);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.5 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.5, when: 'afterChildren' },
    },
  };

  return (
    <nav aria-label="Main navigation">
      <Box
        id="top"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          gap: '10px',
          letterSpacing: '0.5px',
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
            gap: '10px',
            width: '100%',
            pt: 3,
            pb: '80px',
            '@media (max-width: 1300px)': {
              flexDirection: 'column',
              alignItems: 'start',
              p: 0,
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
          <Box component={Link} href="/contacts" sx={buttonSx}>
            {t('navbar.contacts')}
          </Box>
          <Box
            component="a"
            href="https://lsp.lt"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonSx}
          >
            {t('navbar.lsp')}
          </Box>
          <SocialIcons />
        </Box>
      </Box>
      <ExpandNavigation open={expanded} setOpen={setExpanded} currentSection={currentSection} />
    </nav>
  );
}
