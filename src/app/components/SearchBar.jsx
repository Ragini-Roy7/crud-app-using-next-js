"use client";
import styles from "../styles/search.module.scss";

export default function SearchBar({ value, onSearch }) {
  return (
    <div className={styles.search}>
      <input
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search employees..."
      />
    </div>
  );
}
