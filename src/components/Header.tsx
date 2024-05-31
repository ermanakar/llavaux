import React, { useState } from 'react';
import logo from '../assets/logo.svg'; // Adjust with the correct relative path
import './Header.css';

interface NavItem {
  path: string;
  label: string;
  external?: boolean;
}

const navigationItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/exhibition", label: "Exhibition" },
  { path: "/about", label: "About" },
  { path: "/resume", label: "Resume" },
  { path: "https://radyokafa.substack.com", label: "Blog", external: true },
];

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header flex flex-space-between">
      <a href="/" className="site-logo-link">
        <img src={logo} alt="Exhibition Logo" className="site-logo" />
      </a>
      <button
        className="header-menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
      <nav>
        <ul className={`navigation ${isMenuOpen ? 'open' : ''}`}>
          <li className="close-menu-button" onClick={closeMenu}>
            ✕
          </li>
          {navigationItems.map(({ path, label, external }) => (
            <li key={path}>
              {external ? (
                <a href={path} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  {label}
                </a>
              ) : (
                <a href={path} onClick={closeMenu}>{label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
