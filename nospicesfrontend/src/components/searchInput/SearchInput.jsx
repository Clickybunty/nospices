import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchInput.module.css";
import FilteredList from "../filteredlist/FilteredList";

function SearchInput({ language, onIngredientSelect }) {
  const [zutaten, setZutaten] = useState("");
  const [zutatenDaten, setZutatenDaten] = useState([]);
  const [filteredZutaten, setFilteredZutaten] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Funktion zum Laden der Zutaten
  const loadZutaten = () => {
    axios
      .get("/zutaten.json")
      .then((response) => {
        const sortedZutaten = Object.entries(response.data)
          .sort((a, b) => a[1][language].localeCompare(b[1][language]))
          .map(([id, zutat]) => zutat[language]);
        setZutatenDaten(sortedZutaten);
        setFilteredZutaten(sortedZutaten);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Zutaten:", error);
      });
  };

  // Lädt die Zutaten, wenn die Sprache wechselt
  useEffect(() => {
    loadZutaten();
  }, [language]);

  // Aktualisiert die gefilterten Zutaten basierend auf der Benutzereingabe
  useEffect(() => {
    if (zutaten.trim() === "") {
      // Wenn das Eingabefeld leer ist, zeige die gesamte Liste
      setFilteredZutaten(zutatenDaten);
    } else {
      // Filtere basierend auf der Eingabe
      setFilteredZutaten(
        zutatenDaten.filter((zutat) =>
          zutat.toLowerCase().includes(zutaten.toLowerCase())
        )
      );
    }
  }, [zutaten, zutatenDaten]);

  return (
    <div className={styles.inputContainer}>
      {/* Eingabefeld */}
      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={(e) => setZutaten(e.target.value)}
        onFocus={() => {
          setIsDropdownOpen(true); // Öffne das Dropdown beim Fokussieren
          setFilteredZutaten(zutatenDaten); // Zeige die alphabetische Liste
        }}
        placeholder="🔍 Zutaten suchen"
      />
      {/* Dropdown für gefilterte Zutaten */}
      {isDropdownOpen && filteredZutaten.length > 0 && (
        <FilteredList
          items={filteredZutaten}
          onItemClick={(item) => {
            onIngredientSelect(item);
            setZutaten(""); // Eingabefeld zurücksetzen
            setIsDropdownOpen(false); // Dropdown schließen
          }}
        />
      )}
    </div>
  );
}

export default SearchInput;
