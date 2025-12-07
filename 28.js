import React, { useState } from "react";

const tombstonesData = [
  { id: 1, name: "Arthur Gray", year: 1872 },
  { id: 2, name: "Martha Willow", year: 1910 },
  { id: 3, name: "Samuel Black", year: 1899 },
  { id: 4, name: "Elena Frost", year: 1865 }
];

export default function TombstoneSelector() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = tombstonesData.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Tombstone Selector</h2>

      <input
        type="text"
        placeholder="Search tombstones..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 20 }}
      />

      <ul>
        {filtered.map(t => (
          <li
            key={t.id}
            onClick={() => setSelected(t)}
            style={{
              cursor: "pointer",
              padding: 10,
              background: selected?.id === t.id ? "#e3e3e3" : "white",
              marginBottom: 5,
              border: "1px solid #ccc"
            }}
          >
            {t.name} (d. {t.year})
          </li>
        ))}
      </ul>

      {selected && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid black" }}>
          <h3>Selected Tombstone</h3>
          <p><strong>Name:</strong> {selected.name}</p>
          <p><strong>Year:</strong> {selected.year}</p>
        </div>
      )}
    </div>
  );
}
