import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState(''); // popup for both success and error
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPopupMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress: emailAddress,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const { userId, token } = await response.json();
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('userToken', token);

      setPopupMessage('User logged in successfully!');
      setTimeout(() => {
        setPopupMessage('');
        navigate('/account');
      }, 500); 
    } catch (error) {
      console.error('Login failed:', error);
      setPopupMessage(error.message);
      setPassword('');
      setTimeout(() => setPopupMessage(''), 5000);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/customers/forgot-password?emailAddress=${emailAddress}`, {
        method: 'POST'
      });
      const message = await response.text();
      setPopupMessage(message);
      setTimeout(() => setPopupMessage(''), 5000);
    } catch (error) {
      console.error('Forgot Password error:', error);
    }
  };

  return (
    <div className="login-page">
      {popupMessage && <div className={`login-popup ${popupMessage.includes('Invalid') ? 'error' : ''}`}>
        {popupMessage}
      </div>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleForgotPassword}>I forgot my password</button>
    </div>
  );
};

export default LoginPage;
