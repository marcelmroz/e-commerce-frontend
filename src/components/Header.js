import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('userToken') !== null;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>My E-Commerce</h1>
        </Link>
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-link header-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log In</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
          <Link to="/account" className="nav-link">My account</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;