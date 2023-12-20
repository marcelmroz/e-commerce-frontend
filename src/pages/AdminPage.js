import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
      console.log('No token found, redirecting to login');
      return;
    }
    
    const fetchAllCustomers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/customers`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
        }
      });

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

  const handleCustomerManagement = () => {
    navigate('/customer-management');
  };

  const handleProductManagement = () => {
    navigate('/product-management');
  };

  return (
    <div className="admin-page">
      <div className="title-div">
        <h1>Admin Dashboard</h1>
        <div className='manage-buttons'>
        <button className='manage-btn' onClick={handleCustomerManagement}>Customer Management</button>
        <button className='manage-btn' onClick={handleProductManagement}>Product Management</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
