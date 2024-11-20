import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <a href="#home">NoSpices</a>
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

      {/* Login Button */}
      <div className={styles.navActions}>
        <button className={styles.loginButton}>Login</button>
      </div>
    </nav>
  );
}
