import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';
import SocialIcons from './socialIcons/SocialIcons.jsx';
import NAVIGATION_LINKS from '../../constants/navigationLinks.js';
import ExpandNavigation from './expandNavigation/ExpandNavigation.jsx';
import NavigationButton from './navigationButton/NavigationButton.jsx';
import Hamburger from './hamburger/Hamburger.jsx';
import Logo from './logo/Logo.jsx';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const location = useLocation();
  const navigationLinks = NAVIGATION_LINKS(t);

  const updateMedia = () => {
    setIsOpen(window.innerWidth > 1200);
  };

  useEffect(() => {
    setIsOpen(window.innerWidth > 1200);
    setExpanded(false);
  }, [location]);

  useEffect(() => {
    setExpanded(false);
  }, [i18n.language]);

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const toggleExpansion = (section) => {
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
    <>
      <div className={styles.Container}>
        <div className={styles.ResponsiveContainer}>
          <Logo isOpen={isOpen} />
          <Hamburger
            toggleMenu={() => (setIsOpen(!isOpen))}
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
          <div className={styles.Button}>
            <Link to="/Contacts" className={styles.Text}>{t('navbar.contacts')}</Link>
          </div>
          <div className={styles.Button}>
            <a
              href="https://lsp.lt"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.Text}
            >
              {t('navbar.lsp')}
            </a>
          </div>
          <SocialIcons />
        </motion.div>
      </div>
      <ExpandNavigation
        open={expanded}
        currentSection={currentSection}
      />
    </>
  );
}
