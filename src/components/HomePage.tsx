import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import NewsUpdates from './NewsUpdates';
import IntroductionSection from './IntroductionSection'; // Make sure the import path is correct
import { FaHatWizard, FaPaintBrush, FaSearchDollar, FaRocket } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const events = [
    {
      title: 'Concept Initiation',
      description: 'Explore the genesis of integrating AI with traditional artistic methods to create new forms of digital expression.',
      date: 'January 2024',
      icon: <FaHatWizard />
    },
    {
      title: 'Design and Development',
      description: 'Dive into the collaborative process where artists and AI synergize to push the boundaries of creativity.',
      date: 'February 2024',
      icon: <FaPaintBrush />
    },
    {
      title: 'Curation and Iteration',
      description: 'Understand the selective process where AI helps curate and refine art, enhancing overall aesthetic appeal.',
      date: 'March 2024',
      icon: <FaSearchDollar />
    },
    {
      title: 'Exhibition Launch',
      description: 'Be part of the grand unveiling, where art and technology merge in an immersive exhibition showcasing the future of digital art.',
      date: 'April 2024',
      icon: <FaRocket />
    }
  ];

  return (
    <>
      <Header />
      <HeroSection />
      <IntroductionSection events={events} />
      <NewsUpdates />
    </>
  );
};

export default HomePage;
