import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('userToken') !== null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };
  
    const fetchUserRole = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('http://localhost:8080/api/customers/account', {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const customerDto = await response.json();
          setIsAdmin(customerDto.role === 'ADMIN');
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };
  
    updateCartCount();
    fetchUserRole();
  
    window.addEventListener('cartUpdated', updateCartCount);
  
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>Our E-Commerce</h1>
        </Link>
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="nav-link header-btn right">
                Logout
              </button>
              <Link to="/account" className="nav-link right">My account</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link right">Admin</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link right">Log In</Link>
              <Link to="/register" className="nav-link right">Register</Link>
            </>
          )}
          <Link to="/cart" className="nav-link">My Cart ({cartCount})</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
