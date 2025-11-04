import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef(null);

  const calculateTimeLeft = (endDate) => {
    const diff = new Date(endDate) - new Date();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const startCountdown = () => {
    if (!targetDate) return;

    setIsRunning(true);
    setShowConfetti(false);

    intervalRef.current = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      if (remaining) {
        setTimeLeft(remaining);
      } else {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setShowConfetti(true);
      }
    }, 1000);
  };

  const stopCountdown = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetCountdown = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setShowConfetti(false);
    setTargetDate("");
    setTimeLeft({});
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const Confetti = () => (
    <div style={styles.confettiContainer}>
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          style={{
            ...styles.confetti,
            left: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            animationDelay: `${Math.random()}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🎯 Live Countdown Timer</h1>

        <input
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          style={styles.input}
        />

        <div style={styles.btnContainer}>
          <button
            onClick={startCountdown}
            disabled={isRunning}
            style={{ ...styles.btn, backgroundColor: "#28a745" }}
          >
            Start
          </button>
          <button
            onClick={stopCountdown}
            style={{ ...styles.btn, backgroundColor: "#ffc107" }}
          >
            Stop
          </button>
          <button
            onClick={resetCountdown}
            style={{ ...styles.btn, backgroundColor: "#dc3545" }}
          >
            Reset
          </button>
        </div>

        {Object.keys(timeLeft).length > 0 && (
          <div style={styles.timer}>
            <div style={styles.box}>
              {timeLeft.days ?? 0}
              <span style={styles.label}>Days</span>
            </div>
            <div style={styles.box}>
              {timeLeft.hours ?? 0}
              <span style={styles.label}>Hours</span>
            </div>
            <div style={styles.box}>
              {timeLeft.minutes ?? 0}
              <span style={styles.label}>Mins</span>
            </div>
            <div style={styles.box}>
              {timeLeft.seconds ?? 0}
              <span style={styles.label}>Secs</span>
            </div>
          </div>
        )}

        {showConfetti && <Confetti />}
      </div>
    </div>
  );
};

const styles = {
  app: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fc",
    fontFamily: "Poppins, sans-serif",
  },
  container: {
    textAlign: "center",
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "20px",
  },
  btnContainer: {
    marginBottom: "20px",
  },
  btn: {
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 15px",
    margin: "0 5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  timer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "2rem",
    color: "#222",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: "0.9rem",
    color: "#555",
    marginTop: "5px",
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  },
  confetti: {
    position: "absolute",
    width: "10px",
    height: "20px",
    opacity: 0.8,
    animation: "fall 2.5s linear infinite",
  },
};

// Add falling animation dynamically
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}`;
document.head.appendChild(styleSheet);

export default App;
