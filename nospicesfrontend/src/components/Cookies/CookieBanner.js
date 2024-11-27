import React, { useState } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true); // Banner ist standardmäßig sichtbar
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true, // Immer erforderlich
    statistics: false,
    marketing: false,
  });

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
    <div style={{ position: "fixed", bottom: 0, width: "100%", background: "#2B373B", color: "#ffffff", zIndex: 99999, padding: "20px" }}>
      <p>Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.</p>
      {!showDetails ? (
        <div>
          <button
            onClick={handleAcceptAll}
            style={{ background: "#4CAF50", color: "#ffffff", padding: "10px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Alle akzeptieren
          </button>
          <button
            onClick={handleDeclineAll}
            style={{ background: "#f44336", color: "#ffffff", padding: "10px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Alle ablehnen
          </button>
          <button
            onClick={() => setShowDetails(true)}
            style={{ background: "#008CBA", color: "#ffffff", padding: "10px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Einstellungen
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          <h4>Cookie-Einstellungen</h4>
          <div>
            <label>
              <input
                type="checkbox"
                checked={consent.necessary}
                disabled
              />
              Notwendige Cookies (immer aktiv)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={(e) => setConsent({ ...consent, statistics: e.target.checked })}
              />
              Statistik-Cookies
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
              />
              Marketing-Cookies
            </label>
          </div>
          <button
            onClick={handleSavePreferences}
            style={{ background: "#4CAF50", color: "#ffffff", padding: "10px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Speichern
          </button>
          <button
            onClick={() => setShowDetails(false)}
            style={{ background: "#f44336", color: "#ffffff", padding: "10px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Abbrechen
          </button>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
