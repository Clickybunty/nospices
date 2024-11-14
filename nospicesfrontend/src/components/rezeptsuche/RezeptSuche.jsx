import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RezeptSuche.module.css";
import Flag from "react-world-flags";
import IngredientsList from "../ingredientslist/IngredientsList";

function RezeptSuche() {
  const [zutaten, setZutaten] = useState("");
  const [zutatenDaten, setZutatenDaten] = useState([]);
  const [filteredZutaten, setFilteredZutaten] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Ausgewählte Zutaten
  const [language, setLanguage] = useState("de");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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

  const handleInputChange = (e) => {
    setZutaten(e.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  const languages = {
    de: "DE",
    en: "GB",
    it: "IT",
    fr: "FR",
    es: "ES",
    ar: "AE",
    iw: "IL",
    el: "GR",
  };

  return (
    <div className={styles.inputContainer}>
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
        onFocus={loadZutaten}
        placeholder="🔍"
      />

      {isDropdownOpen && filteredZutaten.length > 0 && (
        <div
          className={styles.dropdownContainer}
          style={{ top: isLanguageMenuOpen ? "80px" : "45px" }}
        >
          {filteredZutaten.map((zutat, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleIngredientClick(zutat)}
            >
              {zutat}
            </div>
          ))}
        </div>
      )}

      <IngredientsList
        ingredients={selectedIngredients}
        onRemove={handleRemoveIngredient}
      />
    </div>
  );
}

export default RezeptSuche;
