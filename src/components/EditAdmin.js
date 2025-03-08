import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Add-admin.css'; // Reusing Add-admin styles

const EditAdmin = ({ admins, setAdmins }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state with default values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Check if location.state exists and update formData if it does
  if (location.state) {
    const { admin } = location.state; // Only extract admin, not index
    if (formData.name === '') {
      // Only update formData if it hasn't been initialized yet
      setFormData({ ...admin });
    }
  } else {
    // Redirect to the dashboard if state is missing
    navigate('/');
    return null; // Early return
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the admin in the admins list
    setAdmins((prevAdmins) => {
      const updatedAdmins = [...prevAdmins];
      updatedAdmins[location.state.index] = formData; // Use location.state.index directly
      return updatedAdmins;
    });

    // Show success message and navigate back to the dashboard
    alert('Admin updated successfully!');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/'); // Navigate back to the dashboard without saving
  };

  return (
    <div className="add-admin">
      <h1 className="admin-header">Edit Admin</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;