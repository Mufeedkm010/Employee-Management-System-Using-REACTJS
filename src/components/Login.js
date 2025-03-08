// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (username === 'admin' && password === '1234') {
      // Redirect to the dashboard after successful login
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login">
      <h1 className="admin-header">Login</h1>
      <form className="admin-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Login
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
        {/* Move the signup link outside the button-group */}
        <div className="signup-link">
          <p>Don't have an account? <button onClick={() => navigate('/signup')}>Signup</button></p>
        </div>
      </form>
    </div>
  );
};

export default Login;