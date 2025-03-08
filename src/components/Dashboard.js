import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = ({ admins, setAdmins, employees }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  // Function to handle adding a new admin
  const handleAddAdmin = () => {
    const password = prompt("Enter password to proceed:");
    if (password === "1234") {
      navigate('/add-admin');
    } else {
      alert("Incorrect password!");
    }
  };

  // Function to handle editing an admin
  const handleEditAdmin = (index) => {
    const password = prompt("Enter password to edit:");
    if (password === admins[index].password) {
      // Navigate to the edit page and pass the admin data and index
      navigate(`/edit-admin/${index}`, { state: { admin: admins[index], index } });
    } else {
      alert("Incorrect password!");
    }
  };

  // Function to handle deleting an admin
  const handleDeleteAdmin = (index) => {
    const password = prompt("Enter password to delete:");
    if (password === admins[index].password) {
      const updatedAdmins = admins.filter((_, i) => i !== index);
      setAdmins(updatedAdmins);
      alert("Admin deleted successfully!");
    } else {
      alert("Incorrect password!");
    }
  };

  // Calculate the total salary of all employees
  const totalSalary = employees.reduce((sum, employee) => sum + Number(employee.salary), 0);

  // Filter admins based on search query
  const filteredAdmins = isSearchEnabled
    ? admins.filter((admin) =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : admins;

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert("Please enter a search term.");
      return;
    }
    setIsSearchEnabled(true);
  };

  // Function to clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchEnabled(false);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="title">Employee Management System</h1>
      </header>
      <div className="summary-cards">
        <div className="card">
          <span className="card-title">Admin</span>
          <span className="card-total">Total: {admins.length}</span>
        </div>
        <div className="card">
          <span className="card-title">Employee</span>
          <span className="card-total">Total: {employees.length}</span>
        </div>
        <div className="card">
          <span className="card-title">Salary</span>
          <span className="card-total">Total: ${totalSalary}</span>
        </div>
      </div>

      <h2 className="sub-title">List of Admins</h2>
      
      <div className="admin-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
          {isSearchEnabled && (
            <button className="clear-search-btn" onClick={handleClearSearch}>
              Clear
            </button>
          )}
        </div>
        <button className="add-admins-btn" onClick={handleAddAdmin}>Add Admin</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin, index) => (
              <tr key={index} className={isSearchEnabled ? 'highlight' : ''}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditAdmin(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteAdmin(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                {isSearchEnabled ? "No matching admins found." : "No Admins Available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;