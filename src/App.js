// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ManageEmployees from './components/ManageEmployees';
import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import EditEmployee from './components/Edit';
import AddAdmin from './components/Add-admin';
import EditAdmin from './components/EditAdmin';
import Login from './components/Login';
import Signup from './components/Signup'; // Import the Signup component

function App() {
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleUpdateEmployee = (index, updatedEmployee) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = updatedEmployee;
    setEmployees(updatedEmployees);
  };

  const addAdmin = (newAdmin) => {
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                admins={admins}
                setAdmins={setAdmins}
                employees={employees}
              />
            }
          />
          <Route
            path="/manage-employees"
            element={<ManageEmployees employees={employees} />}
          />
          <Route
            path="/add-employee"
            element={<AddEmployee addEmployee={addEmployee} />}
          />
          <Route
            path="/employee-details/:id"
            element={<EmployeeDetails employees={employees} />}
          />
          <Route
            path="/edit-employee/:id"
            element={
              <EditEmployee
                employees={employees}
                onUpdate={handleUpdateEmployee}
              />
            }
          />
          <Route
            path="/add-admin"
            element={<AddAdmin addAdmin={addAdmin} />}
          />
          <Route
            path="/edit-admin/:id"
            element={
              <EditAdmin
                admins={admins}
                setAdmins={setAdmins} // Pass setAdmins here
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add the Signup route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;