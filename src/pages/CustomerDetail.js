import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${id}`);
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/customers/${id}`, { method: 'DELETE' });
      navigate('/admin'); // Redirect back to admin page using navigate
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  // Render customer details and a delete button
  return (
    <div>
      <h1>Customer Details</h1>
      {/* You may want to display more customer details here */}
      <div>
        <p>Name: {customer.firstName} {customer.lastName}</p>
        <p>Email: {customer.emailAddress}</p>
        {/* Include additional fields as needed */}
      </div>
      <button onClick={handleDelete}>Delete Customer</button>
      {/* You may also want to include an update form here */}
    </div>
  );
};

export default CustomerDetails;
