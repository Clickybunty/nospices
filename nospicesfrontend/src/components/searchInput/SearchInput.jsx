import React, { useState, useEffect } from "react";
import FilteredList from "../filteredlist/FilteredList";
import styles from "./SearchInput.module.css";

function SearchInput({ language, zutatenData, onIngredientSelect }) {
  const [zutaten, setZutaten] = useState("");
  const [filteredZutaten, setFilteredZutaten] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null); // Für die Tastaturnavigation

  // Filtere Zutaten basierend auf Eingabe
  useEffect(() => {
    if (!zutaten.trim()) {
      setFilteredZutaten(
        Object.entries(zutatenData).map(([id, zutat]) => ({
          id,
          name: zutat[language],
        }))
      );
    } else {
      setFilteredZutaten(
        Object.entries(zutatenData)
          .filter(([_, zutat]) =>
            zutat[language].toLowerCase().includes(zutaten.toLowerCase())
          )
          .map(([id, zutat]) => ({ id, name: zutat[language] }))
      );
    }
  }, [zutaten, zutatenData, language]);

  const handleInputClick = () => {
    setIsDropdownOpen((prev) => !prev); // Öffnen oder Schließen
    if (!isDropdownOpen) {
      setFocusedIndex(null); // Fokus zurücksetzen
      setFilteredZutaten(
        Object.entries(zutatenData).map(([id, zutat]) => ({
          id,
          name: zutat[language],
        }))
      );
    }
  };

  const handleKeyDown = (e) => {
    if (!isDropdownOpen || filteredZutaten.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        setFocusedIndex((prev) =>
          prev === null || prev === filteredZutaten.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        setFocusedIndex((prev) =>
          prev === null || prev === 0 ? filteredZutaten.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (focusedIndex !== null) {
          const selectedItem = filteredZutaten[focusedIndex];
          onIngredientSelect(selectedItem.id); // Übergebe die ID
          setZutaten(""); // Leere Eingabefeld
          setIsDropdownOpen(false); // Schließe Dropdown
          setFocusedIndex(null); // Fokus zurücksetzen
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={(e) => setZutaten(e.target.value)}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown} // Event-Listener für die Tastatur
        placeholder="🔍 Zutaten suchen"
      />
      {isDropdownOpen && filteredZutaten.length > 0 && (
        <FilteredList
          items={filteredZutaten}
          focusedIndex={focusedIndex} // Übergebe den fokussierten Index
          onItemClick={(item) => {
            onIngredientSelect(item.id); // Übergebe die ID
            setZutaten(""); // Leere Eingabefeld
            setIsDropdownOpen(false); // Schließe Dropdown
          }}
        />
      )}
    </div>
  );
}

export default SearchInput;
