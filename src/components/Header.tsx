import React from 'react';
import logo from '/Users/ermanakar/Desktop/uxllava/uxllava/src/assets/logo.svg'; // Ensure the path is correct
import './Header.css'; // Ensure you have this CSS file in the correct path

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <img src={logo} alt="Exhibition Logo" className="site-logo" />
      <nav>
        <ul className="navigation">
          <li><a href="/">Home</a></li>
          <li><a href="/exhibition">Exhibition</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
