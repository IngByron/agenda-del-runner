import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">Agenda del Runner</div>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link">Inicio</a>
          </li>
          <li className="navbar-item">
            <a href="/calendario" className="navbar-link">Calendario</a>
          </li>
          {/* <li className="navbar-item">
            <a href="/fotografos" className="navbar-link">Fotógrafos</a>
          </li>
          <li className="navbar-item">
            <a href="/promociones" className="navbar-link">Promociones</a>
          </li> */}
        </ul>
        <div className="navbar-menu" onClick={toggleMenu}>
          <div className="navbar-menu-bar"></div>
          <div className="navbar-menu-bar"></div>
          <div className="navbar-menu-bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;