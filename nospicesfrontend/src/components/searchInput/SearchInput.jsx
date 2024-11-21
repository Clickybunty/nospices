import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchInput.module.css";

function SearchInput({ language, zutatenData, onIngredientSelect }) {
  const [zutaten, setZutaten] = useState("");
  const [filteredZutaten, setFilteredZutaten] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const containerRef = useRef(null); // Referenz für den gesamten Container

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
    setIsDropdownOpen(true);
    setFocusedIndex(null); // Fokus zurücksetzen
  };

  // Tastatursteuerung für Dropdown
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;

    if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        prevIndex === null ? 0 : Math.min(filteredZutaten.length - 1, prevIndex + 1)
      );
    }

    if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex) =>
        prevIndex === null ? 0 : Math.max(0, prevIndex - 1)
      );
    }

    if (e.key === "Enter" && focusedIndex !== null) {
      onIngredientSelect(filteredZutaten[focusedIndex].id);
      setZutaten("");
      setIsDropdownOpen(false);
      setFocusedIndex(null);
    }

    if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  // Schließen des Dropdowns bei einem Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.inputContainer} ref={containerRef}>
      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={(e) => setZutaten(e.target.value)}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        placeholder="🔍 Zutaten suchen"
      />
      {isDropdownOpen && filteredZutaten.length > 0 && (
        <ul className={styles.dropdownList}>
          {filteredZutaten.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.dropdownItem} ${
                focusedIndex === index ? styles.focused : ""
              }`}
              onClick={() => {
                onIngredientSelect(item.id);
                setZutaten("");
                setIsDropdownOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
