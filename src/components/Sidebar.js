// components/Sidebar.js
import React from 'react';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaTags, FaUserCircle, FaUserPlus, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Welcome</h2>
      <ul>
        <li>
          <Link to="/" className="sidebar-link">
            <FaHome className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/manage-employees" className="sidebar-link">
            <FaUserTie className="icon" /> Manage Employees
          </Link>
        </li>
        <li>
          <Link to="/category" className="sidebar-link">
            <FaTags className="icon" /> Category
          </Link>
        </li>
        <li>
          <Link to="/profile" className="sidebar-link">
            <FaUserCircle className="icon" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/logout" className="sidebar-link">
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </li>
      </ul>

      <div className="auth-container">
        <Link to="/login" className="auth-link">
          <FaSignInAlt className="auth-icon" /> Login
        </Link>
        <Link to="/signup" className="auth-link">
          <FaUserPlus className="auth-icon" /> Signup
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;