import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { RelativityCalculatorPage } from './pages/RelativityCalculatorPage';
import { BlackHoleConceptPage } from './pages/BlackHoleConceptPage';
import { UniverseAppPage } from './pages/UniverseAppPage';
import { DimensionDeDieuPage } from './pages/DimensionDeDieuPage';

function App() {
  return (
    <div className="relative">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<UniverseAppPage />} />
          <Route path="/universe" element={<UniverseAppPage />} />
          <Route path="/relativity" element={<RelativityCalculatorPage />} />
          <Route path="/black-hole-concept" element={<BlackHoleConceptPage />} />
          <Route path="/dimension-de-dieu" element={<DimensionDeDieuPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;