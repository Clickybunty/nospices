import React from "react";
import LanguageSelector from "../../languageselector/LanguageSelector";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { language, languages, changeLanguage } = useLanguage();

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <a href="#home">NoSpices</a>
      </div>

      {/* Fahne und Login */}
      <div className={styles.navActions}>
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
