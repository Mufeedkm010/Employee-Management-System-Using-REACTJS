import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Add-admin.css';

const AddAdmin = ({ addAdmin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Password match validation
    if (name === 'confirmPassword' || name === 'password') {
      if (formData.password !== value && name === 'confirmPassword') {
        setPasswordError('Passwords do not match');
      } else if (name === 'password' && formData.confirmPassword !== '' && value !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    addAdmin(formData);

    // Show alert, then redirect after clicking "OK"
    setTimeout(() => {
      alert('Admin added successfully!');
      navigate('/');  // Navigates to the Dashboard
    }, 100);
  };

  const handleCancel = () => {
    navigate('/manage-admins');  // Redirect to Manage Admins Page
  };

  return (
    <div className="add-admin">
      <h1 className="admin-header">Add New Admin</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={passwordError !== ''}>Add Admin</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
