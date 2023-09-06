import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
// temp nav bar for routing testing
function Navbar() {
  return (
    <nav className={style.navbar}>
      <Link to="/">Home</Link>
      <Link to="/KtuSA">KTU SA</Link>
      <Link to="/KtuFSA">KTU FSA</Link>
      <Link to="/Processes">Processes</Link>
      <Link to="/Documents">Documents</Link>
      <Link to="/LetsCooperate">Let`s Cooperate</Link>
      <Link to="/ActivityReport">Activity Report</Link>
    </nav>
  );
}

export default Navbar;
