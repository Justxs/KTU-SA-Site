'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';
import { useTranslations } from 'next-intl';
import NAVIGATION_LINKS from '@constants/NavigationLinks';
import Link from 'next/link';
import Hamburger from './hamburger/Hamburger';
import NavigationButton from './navigationButton/NavigationButton';
import SocialIcons from './socialIcons/SocialIcons';
import ExpandNavigation from './expandNavigation/ExpandNavigation';
import Logo from './logo/Logo';

export default function Navbar() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<any>(null);

  const navigationLinks = NAVIGATION_LINKS(t);

  const toggleExpansion = (section : any) => {
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
      transition: { duration: 0.5 }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.5, when: 'afterChildren' }
    }
  };

  return (
    <nav>
      <div className={styles.Container} id="top">
        <div className={styles.ResponsiveContainer}>
          <Logo isOpen={isOpen} />
          <Hamburger
            toggleMenu={toggleOpen}
            isOpen={isOpen}
          />
        </div>
        <motion.div
          className={styles.NavbarContent}
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
          <Link href={'/contacts'} className={styles.Button}>{t('navbar.contacts')}</Link>
          <a
            href="https://lsp.lt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Button}
          >
            {t('navbar.lsp')}
          </a>
          <SocialIcons />
        </motion.div>
      </div>
      <ExpandNavigation
        open={expanded}
        setOpen={setExpanded}
        currentSection={currentSection}
      />
    </nav>
  );
}
