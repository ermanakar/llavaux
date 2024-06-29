import React, { Suspense, lazy } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Dynamic imports for components
const HomePage = lazy(() => import('./components/HomePage'));
const AboutPage = lazy(() => import('./components/About'));
const ExhibitionPage = lazy(() => import('./components/Exhibition'));
const Contact = lazy(() => import('./components/Contact'));
const ResumePage = lazy(() => import('./components/ResumePage'));
const Footer = lazy(() => import('./components/Footer'));
const ImageSearch = lazy(() => import('./components/ImageSearch')); // Importing the new ImageSearch component

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/exhibition" element={<ExhibitionPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/search" element={<ImageSearch />} /> 
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
