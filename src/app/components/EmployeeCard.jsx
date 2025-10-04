"use client";
import styles from "../styles/card.module.scss";

export default function EmployeeCard({ emp, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <h3>{emp.name}</h3>
      <p><b>Role:</b> {emp.role}</p>
      <p><b>Email:</b> {emp.email}</p>
      <div className={styles.actions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
