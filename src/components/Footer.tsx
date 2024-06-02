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
        <p>
          Terms of Service |{' '}
          <a href="http://35.214.214.52:5001" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;