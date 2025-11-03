import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);         // All users fetched from API
  const [searchTerm, setSearchTerm] = useState(""); // Input text for search
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users to display

  // Fetch data from API on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Update filtered users whenever searchTerm changes
  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔍 Searchable User List</h1>
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      <ul style={styles.list}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} style={styles.listItem}>
              <strong>{user.name}</strong> <br />
              <span style={{ color: "#666" }}>{user.email}</span>
            </li>
          ))
        ) : (
          <p style={styles.noUsers}>No users found.</p>
        )}
      </ul>
    </div>
  );
}

// 🎨 Simple Inline CSS
const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
  noUsers: {
    color: "#888",
    fontSize: "16px",
  },
};

export default UserList;
