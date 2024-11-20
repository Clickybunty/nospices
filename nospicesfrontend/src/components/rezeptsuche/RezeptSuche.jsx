import React, { useState, useEffect } from "react";
import SearchInput from "../searchInput/SearchInput";
import IngredientsList from "../ingredientslist/IngredientsList";
import Results from "../results/Results";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const { language } = useLanguage();
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
  const [zutatenData, setZutatenData] = useState({});
  const [results, setResults] = useState([]);

  // Load ingredient data
  useEffect(() => {
    axios
      .get("/zutaten.json")
      .then((response) => setZutatenData(response.data))
      .catch((error) => console.error("Fehler beim Laden der Zutaten:", error));
  }, []);

  // Send IDs to backend
  useEffect(() => {
    if (selectedIngredientIds.length > 0) {
      axios
        .post("/api/recipes", { ingredientIds: selectedIngredientIds })
        .then((response) => setResults(response.data))
        .catch((error) =>
          console.error("Fehler beim Abrufen der Ergebnisse:", error)
        );
    } else {
      setResults([]);
    }
  }, [selectedIngredientIds]);

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
      <Results results={results} />
    </div>
  );
}

export default RezeptSuche;
