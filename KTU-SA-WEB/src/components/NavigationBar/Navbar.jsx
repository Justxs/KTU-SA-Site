import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import Logo from "../../assets/KTU_SA_Logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FacebookIcon from "../../assets/icon-facebook.svg";
import InstagramIcon from "../../assets/icon-instagram.svg";
import LinkedInIcon from "../../assets/icon-linkedin.svg";
import LtFlag from "../../assets/Lt-flag.svg";

function Navbar() {
  return (
    <>
      <div className={style.ImageContainer}>
        <img src={Logo} className={style.Image} />
      </div>
      <div className={style.NavbarContent}>
        <div className={style.Category}>
          <Link to="/">Studentams</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={style.Category}>
          <Link to="/">Atstovavimas</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={style.Category}>
          <Link to="/">Reikia pagalbos</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={style.Category}>
          <Link to="/">Apie mus</Link>
          <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
        </div>
        <div className={style.Category}>
          <Link to="/">Kontaktai</Link>
        </div>
        <div className={style.Category}>
          <Link to="/">LSP</Link>
        </div>
        <div className={style.Social}>
          <img src={FacebookIcon} />
          <img src={InstagramIcon} />
          <img src={LinkedInIcon} />
          <img src={LtFlag} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
