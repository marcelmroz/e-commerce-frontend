import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
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
      navigate('/admin');
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        const updatedCustomer = await response.json();
        setCustomer(updatedCustomer);
        setIsUpdating(false);
      } else {
        throw new Error('Failed to update customer data');
      }
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer Details</h1>
      {!isUpdating ? (
        <div>
          <p>Name: {customer.firstName} {customer.lastName}</p>
          <p>Email: {customer.emailAddress}</p>
          <button onClick={() => setIsUpdating(true)}>Edit Customer</button>
          <button onClick={handleDelete}>Delete Customer</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
            <input
            type="text"
            name="userName"
            value={customer.userName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateOfBirth"
            value={customer.dateOfBirth}
            onChange={handleChange}
          />

          <button type="submit">Save Changes</button>
          <button onClick={() => setIsUpdating(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default CustomerDetails;
