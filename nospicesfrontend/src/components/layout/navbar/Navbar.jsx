import React from "react";
import LanguageSelector from "../../languageselector/LanguageSelector";
import DarkModeToggle from "../../Dark_Mode/DarkModeToggle"; // Importiere den Dark Mode Toggle
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar({ darkMode, toggleDarkMode }) {
  // toggleDarkMode als Prop hinzufügen
  const { language, languages, changeLanguage } = useLanguage();

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
      {" "}
      {/* Dynamische Klasse für Dark Mode */}
      {/* Logo */}
      <div className={styles.logo}>
        <a href="#home">NoSpices</a>
      </div>
      {/* Fahne und Dark Mode Toggle */}
      <div className={styles.navActions}>
        {/* Dark Mode Button links neben der Fahne */}
        <DarkModeToggle
          className={styles.darkModeToggle}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <LanguageSelector
          language={language}
          languages={languages}
          onLanguageChange={changeLanguage}
        />
        <button className={styles.loginButton}>Login</button>
      </div>
      {/* Menü */}
      <ul className={styles.navLinks}>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#recipes">Rezepte</a>
        </li>
        <li>
          <a href="#about">Über Uns</a>
        </li>
        <li>
          <a href="#contact">Kontakt</a>
        </li>
      </ul>
    </nav>
  );
}
