import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ResetPasswordPage.css';


const ResetPasswordPage = () => {
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmNewPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
        if (location.state?.emailAddress) {
          setEmailAddress(location.state.emailAddress);
        }
      }, [location.state]);


    const handleSendTempPasswordEmail = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailAddress: emailAddress,
            password: "",
          }),
        });
        if (response.ok) {
          console.log("sent email with temp pass");
            setPopupMessage('Temporary password email sent successfully.');
        } else {
            setPopupMessage('Failed to send temporary password email.');
        }
    } catch (error) {
        console.error('Failed to send temporary password email:', error);
        setPopupMessage('Error sending temporary password email.');
    }
    setTimeout(() => setPopupMessage(''), 5000);
};

  const handleTempPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-temp-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress,
          "password": tempPassword,
        }),
      });

      if (response.ok) {
        setShowNewPasswordForm(true);
      } else {
        const message = await response.text();
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(''), 5000);
      }
    } catch (error) {
      console.error('Temporary password verification failed:', error);
    }
  };


  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPopupMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress,
          newPassword,
          confirmPassword,
          "token": tempPassword,
        }),
      });
      console.log(response);

      if (response.ok) {
        navigate('/login');
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Password update failed:', error);
      setPopupMessage('Error updating password.');
    }
  };

  return (
    <div>
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
        {!showNewPasswordForm ? (
            <>
                <form className='form' onSubmit={handleTempPasswordSubmit}>
                    <h2>Enter Temporary Password</h2>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <button onClick={handleSendTempPasswordEmail}>Send Temporary Password Email</button>

                    <input
                        type="password"
                        placeholder="Temporary Password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </>
        ) : (
          <form className='form' onSubmit={handleNewPasswordSubmit}>
          <h2>Set New Password</h2>
          <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button type="submit">Update Password</button>
      </form>
        )}
    </div>
    );
}

export default ResetPasswordPage;
