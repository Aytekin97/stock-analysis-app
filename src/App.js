import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import StockAnalysis from './pages/StockAnalysis';
import About from './pages/About';
import AnalysisCenter from './pages/AnalysisCenter';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/stock-analysis" element={<StockAnalysis />} />
        <Route path="/about" element={<About />} />
        <Route path="/analysis-center" element={<AnalysisCenter />} />
      </Routes>
    </Router>
  );
};

export default App;
