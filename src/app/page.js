"use client";
import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import "@/app/globals.scss";


export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  //fetching users data from fake rest api
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSelectUser = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    setSelectedUser(data);
  };

  return (
    <div className="container">
      <h1>Users Data (Users)</h1>
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
