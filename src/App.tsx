import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KiciWorldStart from './components/KiciWorldStart';
import Dashboard from './components/Dashboard';
import CatStories from './components/CatStories';
import Gallery from './components/Gallery';
import CareTips from './components/CareTips';
import CatFacts from './components/CatFacts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KiciWorldStart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stories" element={<CatStories />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/care" element={<CareTips />} />
        <Route path="/facts" element={<CatFacts />} />
      </Routes>
    </Router>
  );
}

export default App; 