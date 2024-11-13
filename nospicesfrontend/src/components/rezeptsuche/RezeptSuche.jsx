import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const [zutaten, setZutaten] = useState(""); // Eingabefeld
  const [zutatenDaten, setZutatenDaten] = useState([]); // Zutaten-Daten
  const [filteredZutaten, setFilteredZutaten] = useState([]); // Gefilterte Zutaten

  // Zutaten laden und alphabetisch sortieren
  const loadZutaten = () => {
    axios
      .get("/zutaten.json")
      .then((response) => {
        const sortedZutaten = Object.entries(response.data)
          .sort((a, b) => a[1].de.localeCompare(b[1].de)) // Alphabetische Sortierung
          .map(([id, zutat]) => zutat.de); // Nur die Namen der Zutaten extrahieren
        setZutatenDaten(sortedZutaten);
        setFilteredZutaten(sortedZutaten); // Anfangs alle Zutaten anzeigen
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Zutaten:", error);
      });
  };

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

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={handleInputChange}
        onFocus={loadZutaten} // Zutaten bei Fokussierung laden
        placeholder="Zutaten eingeben, getrennt durch Kommas"
      />

      {/* Dropdown anzeigen, wenn Zutaten vorhanden sind */}
      {filteredZutaten.length > 0 && (
        <div className={styles.dropdownContainer}>
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
