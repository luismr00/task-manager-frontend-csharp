import React from 'react'
import '../styles/header.css'; // Import your CSS file for styling

const Header = () => {

  const username = localStorage.getItem('username'); // Retrieve the username from localStorage

  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  };
  return (
    <div className="header-container">
      <h1 className="header-title">Task Manager</h1>
      <div className="header-actions">
        <p className="header-welcome">Welcome back, {username}</p>
        <button className="header-logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;