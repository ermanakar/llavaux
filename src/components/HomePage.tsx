import React, { Suspense, lazy } from 'react';
import Header from './Header';
import SEO from './SEO';

// Importing icons
import { FaHatWizard, FaPaintBrush, FaSearchDollar, FaRocket } from 'react-icons/fa';

// Dynamic imports for components
const HeroSection = lazy(() => import('./HeroSection'));
const IntroductionSection = lazy(() => import('./IntroductionSection'));
const NewsUpdates = lazy(() => import('./NewsUpdates'));

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
      <SEO 
        title="Home - Obelix's AI World"
        description="Welcome to Obelix's AI World. Explore the amazing capabilities of AI through our exhibitions and projects."
        keywords="AI, Obelix, AI world, AI exhibitions, AI projects"
        author="Obelix"
      />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <IntroductionSection events={events} />
        <NewsUpdates />
      </Suspense>
    </>
  );
};

export default HomePage;
