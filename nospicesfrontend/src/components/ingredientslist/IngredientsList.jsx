// Importiert notwendige React-Funktionen:
// `useEffect` für Seiteneffekte und
// `useState` für Zustandsverwaltung
import React, { useEffect, useState } from "react";

// Importiert Axios für HTTP-Anfragen
import axios from "axios";

// Importiert die CSS-Module-Datei für diese Komponente,
// um spezifisches Styling zu gewährleisten
import styles from "./IngredientsList.module.css";

// Definiert die `IngredientsList`-Komponente
// Props:
// 1. `ingredients`: Eine Liste von ausgewählten Zutaten
// 2. `onRemove`: Eine Callback-Funktion,
// die ausgeführt wird, wenn eine Zutat entfernt wird
function IngredientsList({ ingredients, onRemove }) {
  // Definiert einen State `recipeResults`,
  // um die vom Backend abgerufenen Rezepte zu speichern
  const [recipeResults, setRecipeResults] = useState([]);

  // useEffect wird ausgeführt,
  // wenn sich die `ingredients`-Liste ändert
  // Hier wird eine Anfrage an das Backend gesendet,
  // um Rezepte basierend auf den Zutaten zu suchen
  useEffect(() => {
    // Funktion, um Rezepte asynchron vom Backend abzurufen
    const fetchRecipes = async () => {
      try {
        // Führt eine GET-Anfrage an die
        // `/api/recipes`-Route aus und übergibt die Zutaten als Parameter
        const response = await axios.get("/api/recipes", {
          // Zutaten werden als kommaseparierte Liste gesendet
          params: { ingredients: ingredients.join(",") },
        });
        // Speichert die empfangenen Rezeptdaten im `recipeResults`-State
        setRecipeResults(response.data);
      } catch (error) {
        // Gibt eine Fehlermeldung aus, falls die Anfrage fehlschlägt
        console.error("Fehler beim Abrufen der Rezepte:", error);
      }
    };

    // Überprüft, ob Zutaten ausgewählt wurden
    if (ingredients.length > 0) {
      // Ruft die Rezepte ab,
      // wenn Zutaten vorhanden sind
      fetchRecipes();
    } else {
      // Setzt die Ergebnisliste zurück,
      // wenn keine Zutaten ausgewählt sind
      setRecipeResults([]);
    }
    // Die Abhängigkeit `ingredients` sorgt dafür,
    // dass der Effekt bei Änderungen ausgeführt wird
  }, [ingredients]);

  // Gibt die Benutzeroberfläche der Komponente zurück
  return (
    // Container für die gesamte Liste der ausgewählten Zutaten und Ergebnisse
    <div className={styles.selectedListContainer}>
      {/* Überschrift für die Liste der ausgewählten Zutaten */}
      <h4>Ausgewählte Zutaten:</h4>

      {/* Ungeordnete Liste der ausgewählten Zutaten */}
      <ul>
        {ingredients.map((ingredient, index) => (
          // Jedes Listen-Element repräsentiert eine Zutat
          <li key={index} className={styles.selectedItem}>
            {ingredient} {/* Zeigt den Namen der Zutat an */}
            {/* Button zum Entfernen einer Zutat aus der Liste */}
            <button onClick={() => onRemove(ingredient)}>✕</button>
          </li>
        ))}
      </ul>

      {/* Container für die Ergebnisanzeige */}
      <div className={styles.resultsContainer}>
        {/* Überschrift für die Rezept-Ergebnisse */}
        <h4>Rezept Ergebnisse:</h4>

        {/* Ungeordnete Liste der Rezept-Ergebnisse */}
        <ul>
          {recipeResults.map((recipe, index) => (
            // Jedes Listen-Element repräsentiert ein Rezept
            // Annahme: Die Backend-Antwort enthält ein Feld `name` für den Rezeptnamen
            <li key={index}>{recipe.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Exportiert die `IngredientsList`-Komponente,
// damit sie in anderen Dateien importiert und verwendet werden kann
export default IngredientsList;
