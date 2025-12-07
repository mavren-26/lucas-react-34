import React, { useState, useEffect } from "react";

export default function TombstoneCountdown() {
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Tombstone Countdown</h2>

      <input
        type="number"
        placeholder="Seconds"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        style={{ padding: 8, width: 120 }}
      />
      <button
        onClick={() => setTimeLeft(Number(seconds))}
        style={{ marginLeft: 10, padding: "8px 15px" }}
      >
        Start
      </button>

      <div style={{ marginTop: 20, fontSize: 24 }}>
        {timeLeft === null
          ? "Enter a time to begin."
          : timeLeft > 0
          ? `${timeLeft} seconds left`
          : "peace"}
      </div>
    </div>
  );
}
