import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/KTU_SA_Logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FacebookIcon from "../../assets/icon-facebook.svg";
import InstagramIcon from "../../assets/icon-instagram.svg";
import LinkedInIcon from "../../assets/icon-linkedin.svg";
import LtFlag from "../../assets/Lt-flag.svg";
import Hamburger from "../../assets/Hamburger.svg";
import HamburgerClose from "../../assets/CloseHamburger.svg";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <div className={styles.Container}>
      <div
        className={`${styles.ImageContainer} ${isOpen ? styles.Center : ""}`}
      >
        <div className={styles.ImageBackground}>
          <img src={Logo} className={styles.Image} />
        </div>
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
        <div className={styles.Category}>
          <Link to="/">Studentams</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={styles.Category}>
          <Link to="/">Atstovavimas</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={styles.Category}>
          <Link to="/">Reikia pagalbos</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={styles.Category}>
          <Link to="/">Apie mus</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={styles.Category}>
          <Link to="/">Kontaktai</Link>
        </div>
        <div className={styles.Category}>
          <Link to="/">LSP</Link>
        </div>
        <div className={styles.Social}>
          <img alt="Facebook" src={FacebookIcon} />
          <img alt="Instagram" src={InstagramIcon} />
          <img alt="LinkedIn" src={LinkedInIcon} />
          <img alt="Lithuanian" src={LtFlag} />
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
