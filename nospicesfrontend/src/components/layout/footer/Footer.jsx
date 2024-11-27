import { useState } from "react";
import React from "react";
import styles from "./Footer.module.css";
import PrivacyPolicy from "../../PrivacyPolicy/PrivacyPolicy";

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <footer className={styles.footerContainer}>
      {/* Footer-Inhalt */}
      <nav className={styles.linksContainer} aria-label="Footer-Navigation">
        <a href="#impressum" className={styles.footerLink}>
          Impressum
        </a>
        <button
          onClick={() => setShowPolicy(!showPolicy)}
          className={styles.footerButton}
          aria-expanded={showPolicy}
        >
          Datenschutzerklärung
        </button>
        <a href="#teilen" className={styles.footerLink}>
          Teilen
        </a>
        <a href="#history" className={styles.footerLink}>
          History
        </a>
      </nav>

      {/* Datenschutz anzeigen */}
      {showPolicy && (
        <div className={styles.policyContainer}>
          <PrivacyPolicy />
        </div>
      )}

      {/* Copyright */}
      <div className={styles.copyright}>
        © {new Date().getFullYear()} NoSpices. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
