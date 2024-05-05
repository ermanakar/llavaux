// src/App.tsx
import React from 'react';
// In your component or App.js file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'; // Ensure you have this CSS file for styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/About'; // Ensure this path is correct
import ExhibitionPage from './components/Exhibition'; // Import the Exhibition page
import Contact from './components/Contact'; // Import the Contact page
import Footer from './components/Footer';
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} /> 
          <Route path="/contact" element={<Contact />} /> 
        </Routes>      
      </div>
      <Footer />
    </Router>
  );
};

export default App;
