import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddEmployee.css';

const AddEmployee = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    salary: '',
    gender: '',
    dob: '',
    joinDate: '',
    department: '',
    jobPosition: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);

    navigate('/manage-employees', {
      state: { alert: 'Employee added successfully!' }
    });
  };

  return (
    <div className="add-employee">
      <h1 className='em'>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="image-upload-section">
          <div className="image-placeholder">
            {employee.image ? (
              <img src={employee.image} alt="Employee" className="profile-image" />
            ) : (
              <label htmlFor="imageUpload" className="upload-label">+</label>
            )}
          </div>
          <input
            type="file"
            id="imageUpload"
            name="image"
            onChange={handleImageChange}
            className="file-input"
            accept="image/*"
          />
          <span className="upload-text">Upload Photo</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={employee.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={employee.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
           <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={employee.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit phone number"
              required
             />
            </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={employee.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={employee.salary}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={employee.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={employee.dob}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="joinDate">Join Date</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={employee.joinDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={employee.department}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              id="jobPosition"
              name="jobPosition"
              value={employee.jobPosition}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
