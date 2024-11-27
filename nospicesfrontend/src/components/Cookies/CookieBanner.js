import React, { useState } from "react";
import Cookies from "js-cookie";
import styles from "./CookieBanner.module.css";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    statistics: false,
    marketing: false,
  });

  const handleAcceptAll = () => {
    setConsent({
      necessary: true,
      statistics: true,
      marketing: true,
    });
    Cookies.set(
      "userConsent",
      JSON.stringify({
        necessary: true,
        statistics: true,
        marketing: true,
      })
    );
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    setConsent({
      necessary: true,
      statistics: false,
      marketing: false,
    });
    Cookies.set(
      "userConsent",
      JSON.stringify({
        necessary: true,
        statistics: false,
        marketing: false,
      })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    Cookies.set("userConsent", JSON.stringify(consent));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.cookieBanner}>
      <p>Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.</p>
      {!showDetails ? (
        <div>
          <button
            onClick={handleAcceptAll}
            className={styles.cookieBannerButton}
          >
            Alle akzeptieren
          </button>
          <button
            onClick={handleDeclineAll}
            className={`${styles.cookieBannerButton} ${styles.decline}`}
          >
            Nur notwendige
          </button>
          <button
            onClick={() => setShowDetails(true)}
            className={`${styles.cookieBannerButton} ${styles.settings}`}
          >
            Anpassen
          </button>
        </div>
      ) : (
        <div className={styles.cookieSettings}>
          <h4>Cookie-Einstellungen</h4>
          <div>
            <label>
              <input type="checkbox" checked={consent.necessary} disabled />
              Notwendige Cookies (immer aktiv)
            </label>
          </div>
          <div>
            <label>
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
            <label>
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
            className={styles.cookieBannerButton}
          >
            Speichern
          </button>
          <button
            onClick={() => setShowDetails(false)}
            className={`${styles.cookieBannerButton} ${styles.decline}`}
          >
            Abbrechen
          </button>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
