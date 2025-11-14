import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (text.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <h3>
        Completed: {todos.filter((t) => t.completed).length} | Pending:{" "}
        {todos.filter((t) => !t.completed).length}
      </h3>

      <ul>
        {todos.map((t) => (
          <li key={t.id} style={{ marginTop: 10 }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTodo(t.id)}
            />
            <span
              style={{
                marginLeft: 8,
                textDecoration: t.completed ? "line-through" : ""
              }}
            >
              {t.text}
            </span>
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteTodo(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
