import React, { useState } from "react";

function FilterList() {
  const items = ["React", "JavaScript", "Python", "Node", "Express", "MongoDB"];
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filtered.length > 0 ? (
          filtered.map((item) => <li key={item}>{item}</li>)
        ) : (
          <p>No matches found.</p>
        )}
      </ul>
    </div>
  );
}

export default FilterList;
