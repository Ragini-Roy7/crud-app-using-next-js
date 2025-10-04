"use client";
import { useEffect, useState } from "react";
import styles from "../styles/form.module.scss";

export default function EmployeeForm({ onSave, editEmp }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editEmp) {
      setName(editEmp.name || "");
      setRole(editEmp.role || "");
      setEmail(editEmp.email || "");
    } else {
      setName("");
      setRole("");
      setEmail("");
    }
  }, [editEmp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, role, email });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={role || ""}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
      />
      <input
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">
        {editEmp ? "Update" : "Add"} Employee
      </button>
    </form>
  );
}
