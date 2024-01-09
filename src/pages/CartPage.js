// CartPage.js
import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Add functions to modify cart items if needed

  return (
    <div>
      <h1>Your Cart</h1>
      {/* Render cart items */}
    </div>
  );
};

export default CartPage;
