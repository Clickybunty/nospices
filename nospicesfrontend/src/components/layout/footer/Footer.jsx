import { useState } from "react";
import React from "react";
import styles from "./Footer.module.css";
import PrivacyPolicy from "../../PrivacyPolicy/PrivacyPolicy";
import Impressum from "../../impressum/Impressum";

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  return (
    <footer className={styles.footerContainer}>
      {/* Footer-Inhalt */}
      <nav className={styles.linksContainer} aria-label="Footer-Navigation">
        <div>
          <button
            onClick={() => setShowImpressum(!showImpressum)}
            className={styles.footerButton}
            aria-expanded={showImpressum}
          >
            Impressum
          </button>
          {/* Datenschutz anzeigen */}
          {showImpressum && (
            <div className={styles.impressumContainer}>
              <Impressum />
            </div>
          )}
          <button
            onClick={() => setShowPolicy(!showPolicy)}
            className={styles.footerButton}
            aria-expanded={showPolicy}
          >
            Datenschutzerklärung
          </button>
          {/* Datenschutz anzeigen */}
          {showPolicy && (
            <div className={styles.policyContainer}>
              <PrivacyPolicy />
            </div>
          )}
        </div>
      </nav>

      {/* Copyright */}
      <div className={styles.copyright}>
        © {new Date().getFullYear()} NoSpices. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
