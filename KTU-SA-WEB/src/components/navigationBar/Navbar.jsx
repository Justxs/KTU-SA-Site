import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/KTU_SA_Logo.png";
import SocialIcons from "../socialIcons/SocialIcons";
import Hamburger from "../../assets/Hamburger.svg";
import HamburgerClose from "../../assets/CloseHamburger.svg";
import { motion } from "framer-motion";
import ExpandNavigation from "./expandNavigation/ExpandNavigation";
import NavigationButton from "./navigationButton/NavigationButton.jsx";
import NAVIGATION_LINKS from "../../constants/navigationLinks.js";
import PropTypes from "prop-types";
import LogoutButton from "../logoutButton/LogoutButton.jsx";
import AccountInfo from "./accountInfo/AccountInfo.jsx";
import LINKS from "../../constants/adminLinks.js";

export default function Navbar(props) {
  const { role, saUnit } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const location = useLocation();

  const updateMedia = () => {
    setIsOpen(window.innerWidth > 1200);
  };

  useEffect(() => {
    setIsOpen(window.innerWidth > 1200);
    setExpanded(false);
  }, [location]);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpansion = (section) => {
    if (currentSection === section) {
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
        {!role ? (
          <motion.div
            className={styles.NavbarContent}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuVariants}
          >
            {NAVIGATION_LINKS.map((section) => (
              <NavigationButton
                key={section.header}
                title={section.header}
                expanded={expanded && currentSection === section}
                onExpand={() => toggleExpansion(section)}
              />
            ))}
            <div className={styles.Button}>
              <Link to="/Contacts">Kontaktai</Link>
            </div>
            <div className={styles.Button}>
              <a
                href="https://lsp.lt"
                target="_blank"
                rel="noopener noreferrer"
              >
                LSP
              </a>
            </div>
            <SocialIcons />
          </motion.div>
        ) : (
          <motion.div
            className={styles.NavbarContent}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuVariants}
          >
            <div>
              {LINKS.filter(
                (link) => link.role === "general" || link.role === role
              ).map((link) => (
                <div key={link.path} className={styles.Button}>
                  <Link to={link.path}>{link.name}</Link>
                </div>
              ))}
            </div>

            <div className={styles.Account}>
              <AccountInfo role={role} saUnit={saUnit} />
              <LogoutButton />
            </div>
          </motion.div>
        )}
      </div>
      <ExpandNavigation open={expanded} currentSection={currentSection} />
    </>
  );
}

Navbar.propTypes = {
  role: PropTypes.string,
  saUnit: PropTypes.string,
};

Navbar.defaultProps = {
  role: null,
  saUnit: null,
};
