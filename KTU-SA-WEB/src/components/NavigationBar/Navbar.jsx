import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import Logo from "../../assets/KTU_SA_Logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { blue } from "@mui/material/colors";

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
          <FacebookIcon sx={{ color: blue[500] }}></FacebookIcon>
          <InstagramIcon sx={{ color: blue[500] }}></InstagramIcon>
          <LinkedInIcon sx={{ color: blue[500] }}></LinkedInIcon>
          LT | EN
        </div>
      </div>
    </>
  );
}

export default Navbar;
