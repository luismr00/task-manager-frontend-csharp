import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './styles/register.css'; // Import your CSS file for styling

function Register() {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleRegister = async () => {
    // Validate input fields before making the API call
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
  
    const payload = {
      id, // Default value is 0, as expected by the API
      username,
      email,
      password,
    };
  
    // console.log('Payload being sent:', payload); // Debugging: Log the payload
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.status === 409) {
        // Handle duplicate email error
        const errorMessage = await response.text(); // Read the error message from the response
        alert(errorMessage || 'A user with this email already exists. Please use a different email.');
        return;
      }
  
      if (!response.ok) {
        // Handle other HTTP errors
        const errorMessage = await response.text();
        alert(`Registration failed: ${errorMessage || 'Unknown error'}`);
        return;
      }
  
      const data = await response.json();
      alert('Registration successful! Redirecting to login...');
      console.log('Response:', data); // Debugging: Log the response
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred while trying to register. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <input
        type="text"
        className="register-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        className="register-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="register-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <p className="register-login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
