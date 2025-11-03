import React, { useEffect, useState } from "react";

// 🔧 Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// ⚛️ Main Component
export default function App() {
  const { data: posts, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <h3>Loading posts...</h3>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2>📄 Posts</h2>
      <ul style={styles.list}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} style={styles.item}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🎨 Inline Styling
const styles = {
  container: { padding: "30px", fontFamily: "Arial, sans-serif" },
  list: { listStyle: "none", padding: 0 },
  item: {
    backgroundColor: "#f4f4f4",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "6px",
  },
};
