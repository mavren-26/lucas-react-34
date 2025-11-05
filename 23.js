import React, { useState, useEffect } from "react";

function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayQuery(query);
    }, 500); // wait 500ms before updating

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Debounced Search 🔍</h2>
      <input
        type="text"
        value={query}
        placeholder="Search something..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Searching for: <strong>{displayQuery}</strong></p>
    </div>
  );
}

export default DebouncedSearch;
