import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const updatedCart = [...cart, product];
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  return (
    <div className="product-card">
      {/* <img src={product.image} alt={product.name} className="product-image" /> */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">${product.price}</div>
        <Link to={`/products/${product.id}`} className="product-details-button">View Details</Link>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
