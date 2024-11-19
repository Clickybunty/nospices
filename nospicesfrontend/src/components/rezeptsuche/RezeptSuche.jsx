// Importiert notwendige React-Funktionen:
// `useState` für Zustandsverwaltung und
// `useEffect` für Seiteneffekte
import React, { useState, useEffect } from "react";

// Importiert die `LanguageSelector`-Komponente zur Auswahl der Sprache
import LanguageSelector from "../languageselector/LanguageSelector";

// Importiert die `SearchInput`-Komponente für die Suchleiste
import SearchInput from "../searchInput/SearchInput";

// Importiert die `IngredientsList`-Komponente,
// die die ausgewählten Zutaten und Rezepte anzeigt
import IngredientsList from "../ingredientslist/IngredientsList";

// Importiert die CSS-Module-Datei für diese Komponente,
// um spezifisches Styling zu gewährleisten
import styles from "./RezeptSuche.module.css";

// Definiert die `RezeptSuche`-Komponente,
// die den Hauptsuchbereich darstellt
function RezeptSuche() {
  // State zum Verwalten der ausgewählten Zutaten
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // State zum Verwalten der aktuell ausgewählten Sprache
  const [language, setLanguage] = useState("de"); // Standardmäßig Deutsch

  // Ein Objekt, das unterstützte Sprachen und
  // ihre entsprechenden Codes definiert
  const languages = {
    de: "DE", // Deutsch
    en: "GB", // Englisch
    it: "IT", // Italienisch
    fr: "FR", // Französisch
    es: "ES", // Spanisch
    ar: "AE", // Arabisch
    iw: "IL", // Hebräisch
    el: "GR", // Griechisch
  };

  // useEffect für automatische Sprachdetektion basierend auf der Browsereinstellung
  useEffect(() => {
    // Liest die Sprache des Browsers aus (z.B. "en-US") und
    // extrahiert den Sprachcode (z.B. "en")
    const browserLanguage = navigator.language.split("-")[0];

    // Überprüft, ob die ermittelte Sprache in den unterstützten Sprachen vorhanden ist
    if (languages[browserLanguage]) {
      // Setzt die Sprache auf die erkannte Browser-Sprache
      setLanguage(browserLanguage);
    }
    // Leerer Abhängigkeitsarray,
    // damit die Sprachdetektion nur beim ersten Rendern ausgeführt wird
  }, []);

  // Funktion, um eine Zutat zur Liste der ausgewählten Zutaten hinzuzufügen
  const handleIngredientSelect = (ingredient) => {
    // Überprüft, ob die Zutat nicht bereits ausgewählt ist
    if (!selectedIngredients.includes(ingredient)) {
      // Fügt die Zutat zur Liste hinzu
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Funktion, um eine Zutat aus der Liste der ausgewählten Zutaten zu entfernen
  const handleRemoveIngredient = (ingredient) => {
    // Filtert die Zutat aus der Liste heraus
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  // Gibt die Benutzeroberfläche der Komponente zurück
  return (
    // Hauptcontainer der Rezeptsuche mit Styling
    <div className={styles.rezeptSuche}>
      {/* Komponente zur Sprachwahl, 
      übergibt die aktuelle Sprache und 
      die unterstützten Sprachen */}
      <LanguageSelector
        language={language} // Aktuell ausgewählte Sprache
        languages={languages} // Unterstützte Sprachen
        onLanguageChange={setLanguage} // Callback zum Ändern der Sprache
      />

      {/* Suchleiste zum Hinzufügen von Zutaten */}
      <SearchInput
        // Aktuell ausgewählte Sprache
        language={language}
        // Callback zum Ändern der Sprache
        onLanguageChange={setLanguage}
        // Callback zum Hinzufügen einer Zutat
        onIngredientSelect={handleIngredientSelect}
      />

      {/* Komponente zur Anzeige der ausgewählten Zutaten und Rezeptliste */}
      <IngredientsList
        // Liste der ausgewählten Zutaten
        ingredients={selectedIngredients}
        // Callback zum Entfernen einer Zutat
        onRemove={handleRemoveIngredient}
      />
    </div>
  );
}

// Exportiert die `RezeptSuche`-Komponente,
// damit sie in anderen Dateien importiert und
// verwendet werden kann
export default RezeptSuche;
