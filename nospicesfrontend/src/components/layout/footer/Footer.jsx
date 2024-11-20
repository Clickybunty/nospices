import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      {/* Footer-Inhalt */}
      <div className={styles.linksContainer}>
        <a href="#impressum" className={styles.footerLink}>
          Impressum
        </a>
        <a href="#datenschutz" className={styles.footerLink}>
          Datenschutz
        </a>
        <a href="#teilen" className={styles.footerLink}>
          Teilen
        </a>
        <a href="#history" className={styles.footerLink}>
          History
        </a>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        © {new Date().getFullYear()} NoSpices. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
