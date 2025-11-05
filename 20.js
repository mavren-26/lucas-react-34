import React, { useState } from "react";

function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const updateCount = (newCount) => {
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Count: {count}</h2>
      <button onClick={() => updateCount(count + 1)}>Increment</button>
      <button onClick={() => updateCount(count - 1)}>Decrement</button>
      <button onClick={() => { setCount(0); setHistory([]); }}>Reset</button>
      <p>History: {history.join(", ")}</p>
    </div>
  );
}

export default CounterWithHistory;
