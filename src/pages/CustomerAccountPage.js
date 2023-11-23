import React, { useState, useEffect } from 'react';

const CustomerAccountPage = () => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('userToken');

    if (!userId || !token) {
      console.log('No user ID or token found, redirecting to login');
      return;
    }

    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${userId}`, {
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

  if (!customerData) {
    return <div>First log in...</div>;
  }

  return (
    <div>
      <h1>My Account</h1>
      <p>Name: {customerData.firstName} {customerData.lastName}</p>
      <p>Email: {customerData.emailAddress}</p>
      <p>Phone: {customerData.phoneNumber}</p>
    </div>
  );
};

export default CustomerAccountPage;
