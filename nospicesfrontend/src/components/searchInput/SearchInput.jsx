import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchInput.module.css";
import FilteredList from "../filteredlist/FilteredList";

function SearchInput({ language, onIngredientSelect }) {
  const [zutaten, setZutaten] = useState("");
  const [zutatenDaten, setZutatenDaten] = useState([]);
  const [filteredZutaten, setFilteredZutaten] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    loadZutaten();
  }, [language]);

  useEffect(() => {
    if (zutaten.trim() === "") {
      setFilteredZutaten(zutatenDaten);
      setIsDropdownOpen(false);
    } else {
      setFilteredZutaten(
        zutatenDaten.filter((zutat) =>
          zutat.toLowerCase().includes(zutaten.toLowerCase())
        )
      );
      setIsDropdownOpen(true);
    }
  }, [zutaten, zutatenDaten]);

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={(e) => setZutaten(e.target.value)}
        onFocus={loadZutaten}
        placeholder="🔍 Zutaten suchen"
      />
      {isDropdownOpen && filteredZutaten.length > 0 && (
        <FilteredList
          items={filteredZutaten}
          onItemClick={(item) => {
            onIngredientSelect(item);
            setZutaten("");
          }}
        />
      )}
    </div>
  );
}

export default SearchInput;
