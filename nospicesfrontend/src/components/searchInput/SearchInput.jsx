// Importiert notwendige React-Funktionen: 
// `useState` für Zustandsverwaltung und 
// `useEffect` für Seiteneffekte
import React, { useState, useEffect } from "react";

// Importiert Axios für HTTP-Anfragen
import axios from "axios";

// Importiert die CSS-Module-Datei für spezifisches Styling
import styles from "./SearchInput.module.css";

// Importiert die `FilteredList`-Komponente für die Anzeige der gefilterten Zutaten
import FilteredList from "../filteredlist/FilteredList";

// Definiert die `SearchInput`-Komponente
// Props:
// 1. `language`: Die aktuell ausgewählte Sprache
// 2. `onIngredientSelect`: Callback-Funktion, die eine Zutat auswählt
function SearchInput({ language, onIngredientSelect }) {
  // State für die Benutzereingabe im Suchfeld
  const [zutaten, setZutaten] = useState("");

  // State zum Speichern der geladenen Zutaten-Daten
  const [zutatenDaten, setZutatenDaten] = useState([]);

  // State für die gefilterten Zutaten basierend auf der Benutzereingabe
  const [filteredZutaten, setFilteredZutaten] = useState([]);

  // State, um zu steuern, 
  // ob das Dropdown geöffnet ist
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Funktion, um die Zutaten von der JSON-Datei zu laden
  const loadZutaten = () => {
    axios
      .get("/zutaten.json") // Führt eine GET-Anfrage an die JSON-Datei aus
      .then((response) => {
        // Sortiert die Zutaten alphabetisch basierend auf der aktuellen Sprache
        const sortedZutaten = Object.entries(response.data)
          .sort((a, b) => a[1][language].localeCompare(b[1][language]))
          // Extrahiert die Zutaten in der aktuellen Sprache
          .map(([id, zutat]) => zutat[language]); 
        // Speichert die geladenen Zutaten
        setZutatenDaten(sortedZutaten); 
        // Initialisiert die gefilterte Liste
        setFilteredZutaten(sortedZutaten); 
      })
      .catch((error) => {
        // Gibt eine Fehlermeldung aus, falls die Anfrage fehlschlägt
        console.error("Fehler beim Laden der Zutaten:", error);
      });
  };

  // Lädt die Zutaten neu, wenn sich die Sprache ändert
  useEffect(() => {
    loadZutaten();
  }, [language]); // Abhängigkeit `language` sorgt für erneutes Laden bei Sprachwechsel

  // Aktualisiert die gefilterten Zutaten basierend auf der Benutzereingabe
  useEffect(() => {
    if (zutaten.trim() === "") {
      // Zeigt alle Zutaten, wenn das Eingabefeld leer ist
      setFilteredZutaten(zutatenDaten);
    } else {
      // Filtert Zutaten, die die Eingabe enthalten (unabhängig von Groß-/Kleinschreibung)
      setFilteredZutaten(
        zutatenDaten.filter((zutat) =>
          zutat.toLowerCase().includes(zutaten.toLowerCase())
        )
      );
    }
  }, [zutaten, zutatenDaten]); // Wird ausgeführt, wenn sich die Eingabe oder die Zutaten-Daten ändern

  // Gibt die Benutzeroberfläche der Komponente zurück
  return (
    // Container für das Eingabefeld und das Dropdown
    <div className={styles.inputContainer}>
      {/* Eingabefeld für die Suche */}
      <input
        // Styling für das Eingabefeld
        className={styles.inputField} 
        // Typ des Eingabefelds ist Text
        type="text" 
        // Verknüpft den State `zutaten` mit dem Eingabefeld
        value={zutaten} 
        // Aktualisiert den State bei Benutzereingabe
        onChange={(e) => setZutaten(e.target.value)} 
        onClick={() => {
          // Öffnet oder schließt das Dropdown, 
          // wenn auf das Eingabefeld geklickt wird
          setIsDropdownOpen((prev) => !prev);
          if (!isDropdownOpen) {
            // Zeigt die vollständige Liste, 
            // wenn das Dropdown geöffnet wird
            setFilteredZutaten(zutatenDaten);
          }
        }}
        // Platzhaltertext im Eingabefeld
        placeholder="🔍 Zutaten suchen" 
      />

      {/* Dropdown-Liste der gefilterten Zutaten */}
      {isDropdownOpen && filteredZutaten.length > 0 && (
        <FilteredList
          // Übergibt die gefilterten Zutaten an die `FilteredList`-Komponente
          items={filteredZutaten} 
          onItemClick={(item) => {
            // Wählt die angeklickte Zutat aus
            onIngredientSelect(item); 
            // Setzt das Eingabefeld zurück
            setZutaten(""); 
            // Schließt das Dropdown
            setIsDropdownOpen(false); 
          }}
        />
      )}
    </div>
  );
}

// Exportiert die `SearchInput`-Komponente,
// damit sie in anderen Dateien importiert und 
// verwendet werden kann
export default SearchInput;
