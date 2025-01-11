import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Stock Analysis Logo" className="logo" />
        <h2 className="brand-name">PYTHIA</h2>
      </div>
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
