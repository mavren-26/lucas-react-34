import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [time, setTime] = useState(60); // initial 60 seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      // ⏳ Run timer every second
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    // 🧹 Cleanup when paused or time reaches 0
    return () => clearInterval(timer);
  }, [isRunning, time]);

  // ▶ Start
  const handleStart = () => setIsRunning(true);

  // ⏸ Pause
  const handlePause = () => setIsRunning(false);

  // 🔁 Reset
  const handleReset = () => {
    setIsRunning(false);
    setTime(60);
  };

  return (
    <div style={styles.container}>
      <h1>⏳ Countdown Timer</h1>
      <div style={styles.timer}>{time}s</div>

      <div style={styles.buttons}>
        <button onClick={handleStart} disabled={isRunning} style={styles.button}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning} style={styles.button}>
          Pause
        </button>
        <button onClick={handleReset} style={styles.button}>
          Reset
        </button>
      </div>

      {time === 0 && <p style={styles.done}>⏰ Time’s up!</p>}
    </div>
  );
}

// 🎨 Inline Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Arial, sans-serif",
  },
  timer: {
    fontSize: "48px",
    margin: "20px 0",
    color: "#007BFF",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
  },
  done: {
    marginTop: "20px",
    color: "red",
    fontWeight: "bold",
  },
};

export default CountdownTimer;
