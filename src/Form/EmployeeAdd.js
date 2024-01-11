import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeForm = ({
  onAddEmployee,
  onUpdateEmployee,
  editingEmployeeId,
  onCancelEdit,
  initialEmployeeDetails,
}) => {
  const [employeeId, setEmployeeId] = useState(
    initialEmployeeDetails ? initialEmployeeDetails.id : ""
  );
  const [employeeName, setEmployeeName] = useState(
    initialEmployeeDetails ? initialEmployeeDetails.name : ""
  );
  const [employeePhone, setEmployeePhone] = useState(
    initialEmployeeDetails ? initialEmployeeDetails.phone : ""
  );
  const [employeeEmail, setEmployeeEmail] = useState(
    initialEmployeeDetails ? initialEmployeeDetails.email : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !employeeName || !employeePhone || !employeeEmail) {
      alert("All fields are required");
      return;
    }

    const newEmployee = {
      id: employeeId,
      name: employeeName,
      phone: employeePhone,
      email: employeeEmail,
    };

    setEmployeeId("");
    setEmployeeName("");
    setEmployeePhone("");
    setEmployeeEmail("");

    if (editingEmployeeId !== null) {
      onUpdateEmployee(editingEmployeeId, newEmployee);
    } else {
      onAddEmployee(newEmployee);
      alert("Employee added successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label>Employee ID:</label>
        <input
          type="text"
          className="form-control"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Employee Name:</label>
        <input
          type="text"
          className="form-control"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Employee Phone:</label>
        <input
          type="tel"
          className="form-control"
          value={employeePhone}
          onChange={(e) => setEmployeePhone(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Employee Email:</label>
        <input
          type="email"
          className="form-control"
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingEmployeeId !== null ? "Update Employee" : "Add Employee"}
      </button>
      {editingEmployeeId !== null && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="btn btn-secondary ml-2"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

const EmployeeList = ({
  employees,
  onUpdateEmployee,
  onDeleteEmployee,
  onEditEmployee,
}) => {
  const handleEdit = (employeeId) => {
    onEditEmployee(employeeId);
  };

  return (
    <div className="mt-4">
      <h2>Employee List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  onClick={() => handleEdit(employee.id)}
                  className="btn btn-warning btn-sm ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteEmployee(employee.id)}
                  className="btn btn-danger btn-sm ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setEditingEmployeeId(null);
  };

  const handleUpdateEmployee = (employeeId, updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === employeeId ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEditingEmployeeId(null);
    alert("Employee updated successfully");
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== employeeId
    );
    setEmployees(updatedEmployees);
    alert("Employee deleted successfully");
  };

  const handleEditEmployee = (employeeId) => {
    setEditingEmployeeId(employeeId);
  };

  const handleCancelEdit = () => {
    setEditingEmployeeId(null);
  };

  return (
    <div className="container bg-light">
      <h1 className="mt-4">Employee Management</h1>
      <div className="row">
        <div className="col-md-6">
          <EmployeeForm
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            editingEmployeeId={editingEmployeeId}
            onCancelEdit={handleCancelEdit}
            initialEmployeeDetails={
              editingEmployeeId !== null
                ? employees.find(
                    (employee) => employee.id === editingEmployeeId
                  )
                : null
            }
          />
        </div>
        <div className="col-md-6">
          <EmployeeList
            employees={employees}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onEditEmployee={handleEditEmployee}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
