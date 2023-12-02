import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    
    const fetchAllCustomers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/admin/customers`);

        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchAllCustomers();
  }, []);

  if (customers.length === 0) {
    return <div>Loading customer data...</div>;
  }

  return (
    <div className="admin-page">
      <div className="title-div">
        <h1>Admin Dashboard</h1>
        <h2>All Customers</h2>
      </div>
      <div className="customer-div">
        <div className="customer-list">
        {customers.map((customer, index) => (
          <Link 
            to={`/customer-details/${customer.id}`} 
            key={index} 
            className="customer-item"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <p>Name: {customer.firstName} {customer.lastName}</p>
            <p>Email: {customer.emailAddress}</p>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
