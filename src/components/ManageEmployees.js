import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/ManageEmployees.css';

const ManageEmployees = ({ employees: initialEmployees }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initialEmployees);
  const [showAlert, setShowAlert] = useState(location.state?.alert || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const handleAlertClose = () => {
    setShowAlert(null);
  };

  const handleDelete = (indexToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      const updatedEmployees = employees.filter((_, index) => index !== indexToDelete);
      setEmployees(updatedEmployees);
    }
  };

  const handleEdit = (employee, index) => {
    navigate(`/edit-employee/${index}`, { state: { employee, index } });
  };

  // Filter employees based on search query
  const filteredEmployees = isSearchEnabled
    ? employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : employees;

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert("Please enter a search term.");
      return;
    }
    setIsSearchEnabled(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchEnabled(false);
  };

  return (
    <div className="manage-employees">
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>{showAlert}</p>
            <button className="ok-btn" onClick={handleAlertClose}>OK</button>
          </div>
        </div>
      )}

      <h1>Employee List</h1>
      <div className="button-container">
        <Link to="/add-employee">
          <button className="add-employee-btn">Add Employee</button>
        </Link>
      </div>

      <div>
        <h2>Employee Details</h2>
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
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Join Date</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={index} className={isSearchEnabled ? 'highlight' : ''}>
                <td><img src={employee.image || "https://via.placeholder.com/50"} alt="employee" /></td>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.joinDate}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(employee, index)}
                  >
                    Edit
                  </button>
                  <Link to={`/employee-details/${index}`}>
                    <button className="view-btn">View</button>
                  </Link>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                {isSearchEnabled ? "No matching employees found." : "No Employees Available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;