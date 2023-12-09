import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const navigate = useNavigate();

  useState(() => {
    if (location.state?.emailAddress) {
      setEmailAddress(location.state.emailAddress);
    }
  }, [location.state]);

  const handleTempPasswordSubmit = async (event) => {
    event.preventDefault();
    // Verify the temporary password here (you might need an API endpoint for this)
    // If verification is successful:
    setShowNewPasswordForm(true);
  };

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/customers/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress,
          newPassword,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Password update failed:', error);
    }
  };

  return (
    <div>
      {!showNewPasswordForm ? (
        <form onSubmit={handleTempPasswordSubmit}>
          <h2>Enter Temporary Password</h2>
          <input
            type="email"
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <input
            type="password"
            placeholder="Temporary Password"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleNewPasswordSubmit}>
          <h2>Set New Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Update Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
