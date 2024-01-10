import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import '../styles/CustomerAccountPage.css';

const CustomerAccountPage = () => {
  const [customerData, setCustomerData] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
      console.log('No token found, redirecting to login');
      return;
    }

    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/account`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }

        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (!customerData) {
    return (
      <div className='main'>
        <h2 className='first-log'>First log in...</h2>
        <Link to="/login" className="btn btn-primary">Go To Login Page</Link>
      </div>

    );
  }

  return (
    <div className="customer-page">
      <h1>My Account</h1>
      <p>Name: {customerData.firstName} {customerData.lastName}</p>
      <p>Email: {customerData.email}</p>
      <p>Phone: {customerData.phoneNumber}</p>
      <p>Date of birth: {formatDate(customerData.dateOfBirth)}</p>
    </div>


  );
};

export default CustomerAccountPage;
