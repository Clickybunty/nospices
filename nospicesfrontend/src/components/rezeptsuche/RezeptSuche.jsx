import React, { useState, useEffect } from "react";
import LanguageSelector from "../languageselector/LanguageSelector";
import SearchInput from "../searchInput/SearchInput";
import IngredientsList from "../ingredientslist/IngredientsList";
import Results from "../results/Results"; // Neue Komponente für die Ergebnisse

import axios from "axios";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]); // IDs der Zutaten speichern
  const [language, setLanguage] = useState("de"); // Standard-Sprache
  const [zutatenData, setZutatenData] = useState({}); // Zutaten-Daten
  const [results, setResults] = useState([]); // Ergebnisse vom Backend

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

  // Automatische Sprachdetektion basierend auf der Browsersprache
  useEffect(() => {
    const browserLanguage = navigator.language.split("-")[0]; // "en-US" → "en"
    if (languages[browserLanguage]) {
      setLanguage(browserLanguage); // Setzt die Sprache basierend auf der Browsersprache
    }
  }, []); // Wird nur einmal beim Laden ausgeführt

  // Zutaten aus JSON laden
  useEffect(() => {
    axios
      .get("/zutaten.json")
      .then((response) => setZutatenData(response.data))
      .catch((error) => console.error("Fehler beim Laden der Zutaten:", error));
  }, []);

  // IDs an Backend senden (nur simuliert)
  useEffect(() => {
    if (selectedIngredientIds.length > 0) {
      // Simulierter Backend-Aufruf
      axios
        .post("/api/recipes", { ingredientIds: selectedIngredientIds })
        .then((response) => setResults(response.data))
        .catch((error) =>
          console.error("Fehler beim Abrufen der Ergebnisse:", error)
        );
    } else {
      setResults([]); // Leere Ergebnisse, wenn keine Zutaten ausgewählt
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
      <Results results={results} /> {/* Neue Komponente für Ergebnisse */}
    </div>
  );
}

export default RezeptSuche;
