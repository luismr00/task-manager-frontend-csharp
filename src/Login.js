import React, { useState } from 'react';
import './styles/login.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username); // Store username in localStorage
      setIsAuthenticated(true);
      navigate('/'); // Redirect to the main page after successful login
      console.log('Token:', data.token); // For debugging purposes
    } else {
      alert('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Task Manager</h2>
      <input
        type="email"
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="login-register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
