import React, { useState } from "react";
import LanguageSelector from "../languageselector/LanguageSelector";
import SearchInput from "../searchInput/SearchInput";
import IngredientsList from "../ingredientslist/IngredientsList";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [language, setLanguage] = useState("de");

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
