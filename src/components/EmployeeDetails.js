import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/EmployeeDetails.css';

const EmployeeDetails = ({ employees }) => {
  const { id } = useParams();
  const employee = employees[id];

  if (!employee) {
    return <div>Employee not found!</div>;
  }

  return (
    <div className="employee-details">
      <h1>{employee.firstName} {employee.lastName}</h1>
      <div className="employee-info">
        <img src={employee.image || "https://via.placeholder.com/150"} alt="employee" className="profile-images" />
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Gender:</strong> {employee.gender}</p>
        <p><strong>Date of Birth:</strong> {employee.dob}</p>
        <p><strong>Join Date:</strong> {employee.joinDate}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Job Position:</strong> {employee.jobPosition}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
      </div>
      <div className="button-containers">
        <Link to="/manage-employees">
          <button className="back-btn">Back to Employee List</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
