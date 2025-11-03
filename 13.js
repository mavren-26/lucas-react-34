import React, { useState } from "react";

// 📦 Child component that receives current items to display
function ItemList({ items }) {
  return (
    <ul style={styles.list}>
      {items.map((item, index) => (
        <li key={index} style={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Pagination() {
  const totalItems = 100;
  const itemsPerPage = 10;
  const totalPages = totalItems / itemsPerPage;

  // Create dummy items
  const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

  // 🧭 Track current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start & end index for slicing items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // 🧮 Handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧭 Pagination Example</h2>

      {/* Child component to render items */}
      <ItemList items={currentItems} />

      {/* Pagination Controls */}
      <div style={styles.controls}>
        <button onClick={handlePrev} disabled={currentPage === 1} style={styles.button}>
          ◀ Previous
        </button>

        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages} style={styles.button}>
          Next ▶
        </button>
      </div>
    </div>
  );
}

// 🎨 Simple inline styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px 0",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
  },
  pageInfo: {
    fontSize: "16px",
  },
};

export default Pagination;
