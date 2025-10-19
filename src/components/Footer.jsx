// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Calendario del Runner</p>
        <p>Esta web fue hecha con ❤️ por @ingeniero.byron</p>
      </div>
    </footer>
  );
}

export default Footer;
