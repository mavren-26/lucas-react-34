// SearchBar.jsx
import React, { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debouncing logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // API call when debounced value changes
  useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }

    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users?q=${debounced}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }, [debounced]);

  return (
    <div style={{ width: "350px", margin: "0 auto" }}>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && debounced && <p>No results found</p>}

      <ul>
        {results.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
