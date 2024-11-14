import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RezeptSuche.module.css";
import Flag from "react-world-flags"; // Flaggen-Komponente importieren

function RezeptSuche() {
  const [zutaten, setZutaten] = useState(""); // Eingabefeld
  const [zutatenDaten, setZutatenDaten] = useState([]); // Zutaten-Daten
  const [filteredZutaten, setFilteredZutaten] = useState([]); // Gefilterte Zutaten
  const [language, setLanguage] = useState("de"); // Zustand für die gewählte Sprache
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Zustand für das Dropdown
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Zustand für das Sprachdropdown

  // Zutaten laden und alphabetisch sortieren
  const loadZutaten = () => {
    axios
      .get("/zutaten.json")
      .then((response) => {
        const sortedZutaten = Object.entries(response.data)
          .sort((a, b) => a[1][language].localeCompare(b[1][language])) // Alphabetische Sortierung basierend auf der aktuellen Sprache
          .map(([id, zutat]) => zutat[language]); // Nur die Namen der Zutaten in der gewählten Sprache extrahieren
        setZutatenDaten(sortedZutaten);
        setFilteredZutaten(sortedZutaten); // Anfangs alle Zutaten anzeigen
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Zutaten:", error);
      });
  };

  // Wenn die Sprache geändert wird, laden wir die Zutaten erneut
  useEffect(() => {
    loadZutaten();
  }, [language]); // Der Effekt wird bei einer Änderung der Sprache ausgelöst

  // Filterfunktion für das Dropdown
  useEffect(() => {
    if (zutaten.trim() === "") {
      setFilteredZutaten(zutatenDaten); // Alle Zutaten anzeigen, wenn das Eingabefeld leer ist
    } else {
      setFilteredZutaten(
        zutatenDaten.filter(
          (zutat) => zutat.toLowerCase().includes(zutaten.toLowerCase()) // Filter nach der Eingabe
        )
      );
    }
  }, [zutaten, zutatenDaten]); // Effekt wird bei Änderung der Eingabe oder Zutaten-Daten ausgelöst

  // Wenn der Benutzer etwas eingibt, wird diese Funktion aufgerufen
  const handleInputChange = (e) => {
    setZutaten(e.target.value);
  };

  // Sprachumschaltfunktion
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageMenuOpen(false); // Sprachmenü nach Auswahl schließen
  };

  // Mappings für Flaggen-Codes und Sprachabkürzungen
  const languages = {
    de: "DE", // Deutsch
    en: "GB", // Englisch
    it: "IT", // Italienisch
    fr: "FR", // Französisch
    es: "ES", // Spanisch
    ar: "AE", // Arabisch (Vereinigte Arabische Emirate)
    iw: "IL", // Hebräisch (Israel)
    el: "GR", // Griechisch (Griechenland)
  };

  return (
    <div className={styles.inputContainer}>
      {/* Button für Sprachumschaltung mit Flaggen-Icon */}
      <div className={styles.languageSelector}>
        <button
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          className={styles.languageButton}
        >
          <Flag
            code={languages[language]}
            style={{ width: "30px", height: "20px" }}
          />
        </button>

        {/* Dropdown für alle Sprachen, das beim Klick auf die Fahne angezeigt wird */}
        {isLanguageMenuOpen && (
          <div className={styles.languageDropdown}>
            {Object.keys(languages).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={styles.languageButton}
              >
                <Flag
                  code={languages[lang]}
                  style={{ width: "30px", height: "20px" }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={handleInputChange}
        onFocus={loadZutaten} // Zutaten bei Fokussierung laden
        placeholder="Rezepte mit Zutaten suchen..."
      />

      {/* Dropdown anzeigen, wenn Zutaten vorhanden sind */}
      {filteredZutaten.length > 0 && (
        <div
          className={styles.dropdownContainer}
          style={{ top: isLanguageMenuOpen ? "80px" : "45px" }}
        >
          {filteredZutaten.map((zutat, index) => (
            <div key={index} className={styles.dropdownItem}>
              {zutat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RezeptSuche;
