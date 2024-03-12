import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/KTU_SA_Logo.png";
import SocialIcons from "../socialIcons/SocialIcons";
import Hamburger from "../../assets/Hamburger.svg";
import HamburgerClose from "../../assets/CloseHamburger.svg";
import { motion } from "framer-motion";
import NavigationButton from "./navigationButton/NavigationButton.jsx";
import NAVIGATION_LINKS from "../../constants/navigationLinks.js";
import ExpandNavigation from "./expandNavigation/ExpandNavigation.jsx";
import { useTranslation } from "react-i18next";

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
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      height: "auto",
      transition: { duration: 0.5 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.5, when: "afterChildren" },
    },
  };

  const spring = {
    type: "spring",
    stiffness: 350,
    damping: 30,
  };
  
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.ImageContainer} data-ison={isOpen}>
          <motion.div
            className={styles.ImageBackground}
            layout
            transition={spring}
          >
            <Link to="/">
              <img src={Logo} className={styles.Image} />
            </Link>
          </motion.div>
          <div className={styles.HamburgerIcon} onClick={toggleMenu}>
            {isOpen ? (
              <img alt="close hamburger" src={HamburgerClose} />
            ) : (
              <img alt="hamburger icon" src={Hamburger} />
            )}
          </div>
        </div>
        <motion.div
          className={styles.NavbarContent}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          {navigationLinks.map((section) => (
            <NavigationButton
              key={section.header}
              title={section.header}
              expanded={expanded}
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