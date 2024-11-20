import React, { useState, useEffect } from "react";
import FilteredList from "../filteredlist/FilteredList";
import styles from "./SearchInput.module.css";

function SearchInput({ language, zutatenData, onIngredientSelect }) {
  const [zutaten, setZutaten] = useState("");
  const [filteredZutaten, setFilteredZutaten] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      setFilteredZutaten(
        Object.entries(zutatenData).map(([id, zutat]) => ({
          id,
          name: zutat[language],
        }))
      );
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
        placeholder="🔍 Zutaten suchen"
      />
      {isDropdownOpen && filteredZutaten.length > 0 && (
        <FilteredList
          items={filteredZutaten}
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
