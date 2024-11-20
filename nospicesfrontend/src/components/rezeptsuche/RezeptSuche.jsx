import React, { useState, useEffect } from "react";
import LanguageSelector from "../languageselector/LanguageSelector";
import SearchInput from "../searchInput/SearchInput";
import IngredientsList from "../ingredientslist/IngredientsList";
import axios from "axios";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]); // IDs der Zutaten speichern
  const [language, setLanguage] = useState("de"); // Standard-Sprache
  const [zutatenData, setZutatenData] = useState({}); // Zutaten-Daten

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

  // Zutaten aus JSON laden
  useEffect(() => {
    axios
      .get("/zutaten.json")
      .then((response) => setZutatenData(response.data))
      .catch((error) => console.error("Fehler beim Laden der Zutaten:", error));
  }, []);

  const handleIngredientSelect = (ingredientId) => {
    if (!selectedIngredientIds.includes(ingredientId)) {
      setSelectedIngredientIds([...selectedIngredientIds, ingredientId]);
    }
  };

  const handleRemoveIngredient = (ingredientId) => {
    setSelectedIngredientIds(
      selectedIngredientIds.filter((id) => id !== ingredientId)
    );
  };

  return (
    <div className={styles.rezeptSuche}>
      <LanguageSelector
        language={language}
        languages={languages}
        onLanguageChange={setLanguage}
      />
      <SearchInput
        language={language}
        zutatenData={zutatenData}
        onIngredientSelect={handleIngredientSelect}
      />
      <IngredientsList
        ingredients={selectedIngredientIds.map((id) => ({
          id,
          name: zutatenData[id] ? zutatenData[id][language] : "Unbekannt",
        }))}
        onRemove={handleRemoveIngredient}
      />
    </div>
  );
}

export default RezeptSuche;
