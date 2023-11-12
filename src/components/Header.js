import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>My E-Commerce</h1>
        </Link>
        <nav className="navigation">
          <Link to="/login" className="nav-link">Log In</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
