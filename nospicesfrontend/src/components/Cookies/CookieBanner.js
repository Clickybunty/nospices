import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./CookieBanner.module.css"; // Import der CSS-Module

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true); // Banner ist standardmäßig sichtbar
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true, // Immer erforderlich
    statistics: false,
    marketing: false,
  });

  // Beim Laden der Seite prüfen, ob bereits eine Zustimmung gespeichert ist
  useEffect(() => {
    const storedConsent = Cookies.get("userConsent");
    if (storedConsent) {
      setIsVisible(false); // Banner ausblenden, wenn Zustimmung existiert
      setConsent(JSON.parse(storedConsent)); // Zustimmung in den Zustand laden
    }
  }, []);

  const handleAcceptAll = () => {
    setConsent({
      necessary: true,
      statistics: true,
      marketing: true,
    });
    Cookies.set("userConsent", JSON.stringify({
      necessary: true,
      statistics: true,
      marketing: true,
    }));
    setIsVisible(false); // Banner ausblenden
  };

  const handleDeclineAll = () => {
    setConsent({
      necessary: true, // Notwendige Cookies bleiben aktiv
      statistics: false,
      marketing: false,
    });
    Cookies.set("userConsent", JSON.stringify({
      necessary: true,
      statistics: false,
      marketing: false,
    }));
    setIsVisible(false); // Banner ausblenden
  };

  const handleSavePreferences = () => {
    Cookies.set("userConsent", JSON.stringify(consent));
    setIsVisible(false); // Banner ausblenden
  };

  if (!isVisible) {
    return null; // Wenn der Banner nicht sichtbar ist, wird nichts gerendert
  }

  return (
    <div className={styles.cookieBanner}>
      <p>Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.</p>
      {!showDetails ? (
        <div>
          <button
            onClick={handleAcceptAll}
            className={styles.button}
          >
            Alle akzeptieren
          </button>
          <button
            onClick={handleDeclineAll}
            className={`${styles.button} ${styles.decline}`}
          >
            Nur notwendige
          </button>
          <button
            onClick={() => setShowDetails(true)}
            className={`${styles.button} ${styles.settings}`}
          >
            Anpassen
          </button>
        </div>
      ) : (
        <div className={styles.details}>
          <h4>Cookie-Einstellungen</h4>
          <div>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={consent.necessary}
                disabled
                className={styles.disabledCheckbox}
              />
              Notwendige Cookies (immer aktiv)
            </label>
          </div>
          <div>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={(e) =>
                  setConsent({ ...consent, statistics: e.target.checked })
                }
              />
              Statistik-Cookies
            </label>
          </div>
          <div>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) =>
                  setConsent({ ...consent, marketing: e.target.checked })
                }
              />
              Marketing-Cookies
            </label>
          </div>
          <button
            onClick={handleSavePreferences}
            className={styles.button}
          >
            Speichern
          </button>
          <button
            onClick={() => setShowDetails(false)}
            className={`${styles.button} ${styles.decline}`}
          >
            Abbrechen
          </button>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
