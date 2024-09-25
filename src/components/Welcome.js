import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Website</h1>
      <Link to="/login">
        <img src={require('../assets/your-image.jpg')} alt="Welcome" className="welcome-image" />
      </Link>
      <div className="welcome-buttons">
        <Link to="/login">
          <button className="welcome-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="welcome-button">Create Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
