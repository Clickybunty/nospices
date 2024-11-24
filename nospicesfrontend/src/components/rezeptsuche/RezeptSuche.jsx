import React, { useState, useEffect } from "react";
import SearchInput from "../searchInput/SearchInput";
import IngredientsList from "../ingredientslist/IngredientsList";
import Results from "../results/Results";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";
import styles from "./RezeptSuche.module.css";

function RezeptSuche() {
  const { language } = useLanguage();
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]); // IDs der ausgewählten Zutaten
  const [zutatenData, setZutatenData] = useState({}); // Daten der Zutaten
  const [results, setResults] = useState([]); // Suchergebnisse
  const [error, setError] = useState(null); // Fehler-Handling

  // Zutaten-Daten laden
  useEffect(() => {
    axios
      .get("/zutaten.json")
      .then((response) => setZutatenData(response.data))
      .catch((error) => {
        console.error("Fehler beim Laden der Zutaten:", error);
        setError("Fehler beim Laden der Zutaten.");
      });
  }, []);

  // Zutat hinzufügen
  const handleIngredientSelect = (ingredientId) => {
    if (!selectedIngredientIds.includes(ingredientId)) {
      setSelectedIngredientIds([...selectedIngredientIds, ingredientId]);
    }
  };

  // Zutat entfernen
  const handleRemoveIngredient = (ingredientId) => {
    setSelectedIngredientIds(
      selectedIngredientIds.filter((id) => id !== ingredientId)
    );
  };

  // IDs an das Backend senden und Ergebnisse laden
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (selectedIngredientIds.length > 0) {
          console.log("Senden an Backend:", selectedIngredientIds); // Debugging
          const response = await axios.post(
            "http://localhost:5000/api/recipes/search",
            { ingredients: selectedIngredientIds }
          );
          console.log("Ergebnisse vom Backend:", response.data); // Debugging
          setResults(response.data);
          setError(null);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Ergebnisse:", error);
        setError("Fehler beim Abrufen der Rezepte.");
      }
    };

    fetchRecipes();
  }, [selectedIngredientIds]);

  return (
    <div className={styles.rezeptSuche}>
      <h1>Rezeptsuche</h1>
      {/* Eingabefeld für die Suche */}
      <SearchInput
        language={language}
        zutatenData={zutatenData}
        onIngredientSelect={handleIngredientSelect}
      />

      {/* Liste der ausgewählten Zutaten */}
      <IngredientsList
        ingredients={selectedIngredientIds.map((id) => ({
          id,
          name: zutatenData[id] ? zutatenData[id][language] : "Unbekannt",
        }))}
        onRemove={handleRemoveIngredient}
      />

      {/* Fehleranzeige */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Ergebnisse anzeigen */}
      {results.length > 0 ? (
        <Results initialRecipes={results} />
      ) : (
        <p>Keine Ergebnisse gefunden.</p>
      )}
    </div>
  );
}

export default RezeptSuche;
