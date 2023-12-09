import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import CustomerAccountPage from './pages/CustomerAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerDetails from './pages/CustomerDetail';
import CustomerManagement from './components/CustomerManagement';
import ProductManagement from './components/ProductManagement';
import ResetPasswordPage from './pages/ResetPasswordPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/account" element={<CustomerAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/customer-details/:id" element={<CustomerDetails />} />
      <Route path="/customer-management" element={<CustomerManagement />} />
      <Route path="/product-management" element={<ProductManagement />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

    </Routes>
  );
};

export default RoutesComponent;
