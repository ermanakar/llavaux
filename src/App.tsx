import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/About';
import ExhibitionPage from './components/Exhibition';
import Contact from './components/Contact';
import ResumePage from './components/ResumePage'; // Import the Resume page
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
          <Route path="/resume" element={<ResumePage />} /> {/* Add the new route */}
        </Routes>      
      </div>
      <Footer />
    </Router>
  );
};

export default App;
