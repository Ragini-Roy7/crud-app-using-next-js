"use client";
import { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (emp) => {
    if (editEmp) {
      await fetch(`/api/employees/${editEmp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
      setEditEmp(null);
    } else {
      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
    }
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  return (
    <div>
      <EmployeeForm onSave={handleSave} editEmp={editEmp} />

      <h2>Employee List</h2>
      {employees.map((emp) => (
        <div key={emp.id} style={{ marginBottom: "10px" }}>
          <span>{emp.name} — {emp.role} — {emp.email}</span>
          <button onClick={() => setEditEmp(emp)}>Edit</button>
          <button onClick={() => handleDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
