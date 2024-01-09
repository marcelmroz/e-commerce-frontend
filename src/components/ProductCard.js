import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const addItemToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        totalPrice: product.price
      });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };


  return (
    <div className="product-card">
      {/* <img src={product.image} alt={product.name} className="product-image" /> */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">${product.price}</div>
        <Link to={`/products/${product.id}`} className="product-details-button">View Details</Link>
        <button className='add-to-cart' onClick={addItemToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
