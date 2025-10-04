"use client";
import { useEffect, useState } from "react";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeForm from "./components/EmployeeForm";
import SearchBar from "./components/SearchBar";
import "@/app/globals.scss";
import styles from "@/app/styles/dashboard.module.scss";

export default function DashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
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
    } else {
      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
    }
    fetchEmployees();
    setEditEmp(null);
  };


  const handleDelete = async (id) => {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <SearchBar value={search} onSearch={setSearch} />
      <EmployeeForm onSave={handleSave} editEmp={editEmp} />
      <div className={styles.grid}>
        {filtered.map((emp) => (
          <EmployeeCard
            key={emp.id}
            emp={emp}
            onEdit={() => setEditEmp(emp)}
            onDelete={() => handleDelete(emp.id)}
          />
        ))}
      </div>
    </div>
  );
}
