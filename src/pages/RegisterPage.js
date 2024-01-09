import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Registration successful! Check your email for the activation link.');

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          password,
          dateOfBirth
        }),
      });
      if (response.ok) {
        setSuccessMessage('Registration successful! Check your email for the activation link.');
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate('/login');
        }, 5000);      
      } else if (response.status === 409) {
        const errorText = await response.text();
        setErrorMessage(errorText || "An account with this email address already exists.");
        setShowErrorModal(true);
      } else {
        const errorText = await response.text();
        console.error('Registration failed:', errorText);
        setErrorMessage("Failed to register. Please try again.");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setShowErrorModal(true);
    }
  };

  return (
  <div className="register-page">
    {showErrorModal && (
        <div className="error-modal">
          <div className="modal-content">
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button onClick={() => setShowErrorModal(false)}>Close</button>
          </div>
        </div>
      )}
    { (
      <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
      </>
      )}
        {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <h3>Success</h3>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default RegisterPage;