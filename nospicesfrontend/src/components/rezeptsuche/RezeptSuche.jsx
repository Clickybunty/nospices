import React, { useState, useEffect } from "react";
import LanguageSelector from "../languageselector/LanguageSelector";
import SearchInput from "../searchInput/SearchInput";
import IngredientsList from "../ingredientslist/IngredientsList";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [language, setLanguage] = useState("de"); // Standard-Sprache

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

  // Automatische Sprachdetektion
  useEffect(() => {
    const browserLanguage = navigator.language.split("-")[0]; // z.B. "en-US" -> "en"
    if (languages[browserLanguage]) {
      setLanguage(browserLanguage); // Browser-Sprache setzen, falls unterstützt
    }
  }, []);

  const handleIngredientSelect = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
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
        onLanguageChange={setLanguage}
        onIngredientSelect={handleIngredientSelect}
      />
      <IngredientsList
        ingredients={selectedIngredients}
        onRemove={handleRemoveIngredient}
      />
    </div>
  );
}

export default RezeptSuche;
