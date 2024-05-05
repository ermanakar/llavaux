import React from 'react';
import './Footer.css'; // Path to your Footer CSS file

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <nav className="footer-navigation">
        {/* Add any additional navigation links here */}
      </nav>
      <div className="social-media">
        {/* Add social media links */}
      </div>
      <div className="legal">
        <p>Terms of Service | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
