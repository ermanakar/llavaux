import React from 'react';
import Header from './Header';
import IntroductionSection from './IntroductionSection';
import './About.css';
import obelixImage from '../assets/profile.webp';
import { FaPhoenixFramework, FaFingerprint, FaCat, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const AboutPage: React.FC = () => {
    const events = [  // Change 'projects' to 'events' to match the prop name expected in IntroductionSection
      {
        title: "Perpetual AI Art Iteration",
        description: "Explore evolving art driven by AI that showcases digital transformation.",
        date: "2024",
        icon: <FaCat />
      },
      {
        title: "Virtual Reality Art Experience",
        description: "Immerse yourself in various art worlds through cutting-edge VR.",
        date: "2024",
        icon: <FaFingerprint />
      },
      {
        title: "Interactive Light Installations",
        description: "Interact with installations where your actions shape light and art.",
        date: "2024",
        icon: <FaPhoenixFramework />
      }
    ];

    return (
      <>
        <Header />
        <div className="about-page">
          <AboutIntro />
          <IntroductionSection events={events} />  
          <MeetOurTeam />
        </div>
      </>
    );
};

const AboutIntro = () => (
  <section className="about-intro">
      <h1>AI and Art: A Journey of Iteration</h1>
      <p>Welcome to [Your Company Name], where creativity and technology merge to forge unparalleled digital experiences. Our mission is to innovate and inspire through unique digital art and interactive exhibitions.</p>
      <p>We believe in pushing the boundaries of what is possible in digital art, making every project a testament to the synergy between artistic vision and cutting-edge technology.</p>
  </section>
);

const MeetOurTeam = () => (
  <section className="team">
      <h2>Meet Our Creative Minds</h2>
      <div className="team-member">
          <img src={obelixImage} alt="Obelix" className="profile-photo"/>
          <div className="member-info">
              <h3>Obelix</h3>
              <p>Obelix uses his unique strengths to push the limits of digital art, blending traditional Gaulish techniques with modern technology.</p>
              <p>Follow Obelix on social media to stay updated with his latest projects and insights into digital art innovation.</p>
              <div className="social-media-links">
                  <a href="https://twitter.com"><FaTwitter /></a>
                  <a href="https://linkedin.com"><FaLinkedin /></a>
                  <a href="https://github.com"><FaGithub /></a>
              </div>
          </div>
      </div>
  </section>
);

export default AboutPage;
