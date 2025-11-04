import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("😐");
  const [animation, setAnimation] = useState(false);

  const analyzeSentiment = (sentence) => {
    const lower = sentence.toLowerCase();
    if (lower.includes("happy") || lower.includes("good") || lower.includes("great") || lower.includes("love")) {
      return "😊";
    } else if (lower.includes("sad") || lower.includes("bad") || lower.includes("cry") || lower.includes("lonely")) {
      return "😢";
    } else if (lower.includes("angry") || lower.includes("hate") || lower.includes("mad")) {
      return "😡";
    } else {
      return "😐";
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setText(input);
    const newEmoji = analyzeSentiment(input);
    if (newEmoji !== emoji) {
      setAnimation(true);
      setEmoji(newEmoji);
      setTimeout(() => setAnimation(false), 400); // reset animation
    }
  };

  return (
    <div className="container">
      <h1>Emoji Sentiment Analyzer</h1>
      <input
        type="text"
        placeholder="Type your sentence here..."
        value={text}
        onChange={handleChange}
      />
      <div className={`emoji ${animation ? "bounce" : ""}`}>{emoji}</div>
    </div>
  );
};

export default App;
