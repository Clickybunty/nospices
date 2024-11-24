import React, { useState, useEffect } from "react";
import styles from "./DarkModeToggle.module.css"; // Importiere CSS als Modul

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("darkMode", darkMode); // Speichere den Zustand im Local Storage
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className={styles.toggleInput} // Dynamisch mit styles
      />
      <span className={styles.slider}></span> {/* Dynamisch mit styles */}
    </label>
  );
};

export default DarkModeToggle;
