// IngredientsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./IngredientsList.module.css";

function IngredientsList({ ingredients, onRemove }) {
  const [recipeResults, setRecipeResults] = useState([]); // Zum Speichern der Backend-Ergebnisse

  // Backend-Anfrage für Rezepte bei Änderungen in ingredients
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes", {
          params: { ingredients: ingredients.join(",") },
        });
        setRecipeResults(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Rezepte:", error);
      }
    };

    if (ingredients.length > 0) {
      fetchRecipes();
    } else {
      setRecipeResults([]); // Leere Ergebnisliste, wenn keine Zutaten ausgewählt sind
    }
  }, [ingredients]);

  return (
    <div className={styles.selectedListContainer}>
      <h4>Ausgewählte Zutaten:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.selectedItem}>
            {ingredient}
            <button onClick={() => onRemove(ingredient)}>✕</button>
          </li>
        ))}
      </ul>

      {/* Ergebnisanzeige */}
      <div className={styles.resultsContainer}>
        <h4>Rezept Ergebnisse:</h4>
        <ul>
          {recipeResults.map((recipe, index) => (
            <li key={index}>{recipe.name}</li> // Annahme: Die Antwort enthält ein `name` Feld
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IngredientsList;
