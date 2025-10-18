import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">MiSitio</div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/">Inicio</a>
        <a href="#sobre-mi">Sobre mí</a>
        <a href="#donar">Donar</a>
      </div>

      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
