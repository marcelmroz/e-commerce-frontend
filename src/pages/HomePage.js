import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Our E-Commerce Site</h1>
        <p>Find the best products for all your needs</p>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </section>
            
    </div>
  );
};

export default HomePage;
