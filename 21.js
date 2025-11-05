import React, { useState } from "react";

function CharacterCounter() {
  const [text, setText] = useState("");
  const limit = 50;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="40"
        placeholder="Type here..."
      />
      <p style={{ color: text.length > limit ? "red" : "black" }}>
        {text.length}/{limit} characters
      </p>
    </div>
  );
}

export default CharacterCounter;
