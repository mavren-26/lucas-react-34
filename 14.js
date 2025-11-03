import React, { createContext, useContext, useEffect, useState } from "react";

// 🌗 Step 1: Create Theme Context
const ThemeContext = createContext();

// 🌗 Step 2: Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage when app loads
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Save theme to localStorage and apply it to document body
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "light" ? "#ffffff" : "#121212";
    document.body.style.color = theme === "light" ? "#000000" : "#ffffff";
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 🌗 Step 3: Custom hook for using ThemeContext easily
export function useTheme() {
  return useContext(ThemeContext);
}

// 🌗 Step 4: Main App Component
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={styles.container}>
      <h1>🔄 Theme Toggle Example</h1>
      <p>The current theme is: <strong>{theme.toUpperCase()}</strong></p>
      <button onClick={toggleTheme} style={styles.button}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

// 🌗 Step 5: Wrap App with ThemeProvider in index.js
export default function ThemedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

// 🎨 Inline Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
};
