import React, { useState, useEffect } from 'react';
import '../styles/CartPage.css';

const CartPage = () => {
const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const updatedCart = storedCart.map(item => ({
    ...item,
    quantity: item.quantity || 1,
    totalPrice: item.totalPrice || item.price,
  }));
  setCartItems(updatedCart);
}, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const incrementQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = (item.quantity || 0) + 1;
        return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const decrementQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const deleteItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout', cartItems);
    sessionStorage.removeItem('cart');
    setCartItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <div className="cart-item-controls">
                <button onClick={() => incrementQuantity(item.id)}>+</button>
                <button onClick={() => decrementQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                <span>Quantity: {item.quantity}</span>
              </div>
              <p>Total: ${item.totalPrice.toFixed(2)}</p>
              <button onClick={() => deleteItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: ${calculateTotal()}</h2>
          </div>
          <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
