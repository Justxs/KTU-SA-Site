import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/KTU_SA_Logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SocialIcons from "../socialIcons/socialIcons";
import Hamburger from "../../assets/Hamburger.svg";
import HamburgerClose from "../../assets/CloseHamburger.svg";
import { motion } from "framer-motion";
import ExpandNavigation from "./expandNavigation/expandNavigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const updateMedia = () => {
    setIsOpen(window.innerWidth > 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <div className={styles.ImageContainer} data-isOn={isOpen}>
          <motion.div
            className={styles.ImageBackground}
            layout
            transition={spring}
          >
            <img src={Logo} className={styles.Image} />
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
          <button
            className={styles.Button}
            onClick={() => setExpanded(!expanded)}
          >
            <div>Studentams</div>
            {expanded ? (
              <ArrowRightIcon sx={{ color: "#B5BEC4" }} />
            ) : (
              <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
            )}
          </button>
          <div className={styles.Button}>
            <Link to="/">Atstovavimas</Link>
            <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
          </div>
          <div className={styles.Button}>
            <Link to="/">Reikia pagalbos</Link>
            <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
          </div>
          <div className={styles.Button}>
            <Link to="/">Apie mus</Link>
            <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
          </div>
          <div className={styles.Button}>
            <Link to="/Contacts">Kontaktai</Link>
          </div>
          <div className={styles.Button}>
            <a href="https://lsp.lt" target="_blank" rel="noopener noreferrer">
              LSP
            </a>
          </div>
          <SocialIcons />
        </motion.div>
      </div>
      {expanded && <ExpandNavigation open={expanded}></ExpandNavigation>}
    </>
  );
}

export default Navbar;
