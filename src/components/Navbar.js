import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Stock Analysis App</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
        <Link to="/stock-analysis">Stock Analysis</Link>
        <Link to="/about">About</Link>
        <Link to="/analysis-center">Analysis Center</Link>
      </div>
    </nav>
  );
};

export default Navbar;
