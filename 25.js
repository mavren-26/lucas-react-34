import { useState, useMemo } from "react";

const USERS = [
  { id: 1, name: "Sam", email: "sam@example.com" },
];

export default function App() {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return USERS.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>User Search Filter</h1>

      <input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: 240 }}
      />

      <ul style={{ marginTop: 20 }}>
        {filteredUsers.map((u) => (
          <li key={u.id} style={{ marginTop: 10 }}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
