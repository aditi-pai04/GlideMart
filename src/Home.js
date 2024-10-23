import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the custom styles

const Home = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to GlideMart</h1>
        <p className="homepage-subtitle">Your one-stop shop for all your needs</p>

        <div className="button-group">
          <Link to="/login">
            <button className="animated-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="animated-button">Register</button>
          </Link>
        </div>
      </div>

      {/* Background animation */}
      <div className="animated-bg"></div>
    </div>
  );
};

export default Home;
