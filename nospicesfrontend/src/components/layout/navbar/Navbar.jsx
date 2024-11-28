import React from "react";
import LanguageSelector from "../../languageselector/LanguageSelector";
import DarkModeToggle from "../../Dark_Mode/DarkModeToggle"; // Importiere den neuen Toggle
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Navbar.module.css";
import ShareButton from "../../sharebutton/ShareButton";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { language, languages, changeLanguage } = useLanguage();

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <a href="#home">NoSpices</a>
      </div>
      {/* Fahne und Dark Mode Toggle */}
      <div className={styles.navActions}>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <LanguageSelector
          language={language}
          languages={languages}
          onLanguageChange={changeLanguage}
        />
        <ShareButton darkMode={darkMode} />
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
