//     Importiert die grundlegenden React-Bibliotheken und
//     Hooks, um Zustand und
//     Lifecycle-Methoden zu verwalten.
import React, { useState, useEffect } from "react";

//     Importiert Axios,
//     umum HTTP-Anfragen auszuführen
//     (z.B. zum Laden von Zutaten aus einer JSON-Datei).
import axios from "axios";

//     Importiert spezifische CSS-Module für Styling,
//     die nur auf diese Komponente angewendet werden.
import styles from "./RezeptSuche.module.css";

//     Importiert eine Bibliothek,
//     die Weltflaggen basierend auf ISO-Codes anzeigt.
import Flag from "react-world-flags";

//     Importiert die `IngredientsList`-Komponente,
//     um die ausgewählten Zutaten darzustellen und
//     zu verwalten.
import IngredientsList from "../ingredientslist/IngredientsList";

//     Die Hauptkomponente 
//     `RezeptSuche` 
//     stellt die Benutzeroberfläche für die Zutaten-Suche und
//     -Auswahl bereit.
function RezeptSuche() {
  //     Zustand zur Verwaltung der aktuellen Eingabe für die Suche.
  const [zutaten, setZutaten] = useState("");

  //     Zustand für alle geladenen Zutaten in der aktuellen Sprache.
  const [zutatenDaten, setZutatenDaten] = useState([]);

  //     Zustand für die gefilterte Liste der Zutaten basierend auf der Eingabe.
  const [filteredZutaten, setFilteredZutaten] = useState([]);

  //     Zustand für die vom Benutzer ausgewählten Zutaten.
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //     Zustand für die aktuell ausgewählte Sprache.
  const [language, setLanguage] = useState("de");

  //     Zustand, um das Dropdown-Menü für die Suchvorschläge anzuzeigen oder zu verbergen.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //     Zustand, um das Sprachmenü anzuzeigen oder zu verbergen.
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  //     Funktion zum Laden der Zutaten aus einer JSON-Datei,
  //     sortiert nach der aktuellen Sprache.
  const loadZutaten = () => {
    axios
      .get("/zutaten.json") //     HTTP GET-Anfrage an die JSON-Datei.
      .then((response) => {
        //     Sortiert die Zutaten alphabetisch nach der aktuellen Sprache.
        const sortedZutaten = Object.entries(response.data)
          .sort((a, b) => a[1][language].localeCompare(b[1][language]))
          .map(([id, zutat]) => zutat[language]);
        //     Setzt die Zutaten-Daten und die gefilterten Zutaten.
        setZutatenDaten(sortedZutaten);
        setFilteredZutaten(sortedZutaten);
      })
      .catch((error) => {
        //     Gibt Fehler beim Laden der Zutaten in der Konsole aus.
        console.error("Fehler beim Laden der Zutaten:", error);
      });
  };

  //     Lädt Zutaten neu, wenn sich die Sprache ändert.
  useEffect(() => {
    loadZutaten();
  }, [language]);

  //     Aktualisiert die gefilterte Zutatenliste basierend auf der Benutzereingabe.
  useEffect(() => {
    if (zutaten.trim() === "") {
      //     Setzt die gefilterte Liste auf alle Zutaten zurück,
      //     wenn keine Eingabe erfolgt.
      setFilteredZutaten(zutatenDaten);
      setIsDropdownOpen(false); //     Schließt das Dropdown-Menü.
    } else {
      //     Filtert die Zutaten basierend auf der Eingabe.
      setFilteredZutaten(
        zutatenDaten.filter((zutat) =>
          zutat.toLowerCase().includes(zutaten.toLowerCase())
        )
      );
      setIsDropdownOpen(true); //     Öffnet das Dropdown-Menü.
    }
  }, [zutaten, zutatenDaten]);

  //     Verarbeitet die Eingabe des Benutzers und
  //     aktualisiert den Zustand.
  const handleInputChange = (e) => {
    setZutaten(e.target.value);
  };

  //     Fügt eine Zutat zur Liste der ausgewählten Zutaten hinzu,
  //     falls sie nicht bereits vorhanden ist.
  const handleIngredientClick = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  //     Entfernt eine Zutat aus der Liste der ausgewählten Zutaten.
  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  //     Ändert die Sprache und schließt das Sprachmenü.
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  //     Definiert die verfügbaren Sprachen mit ihren entsprechenden ISO-Codes.
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

  //     Rendert die Benutzeroberfläche der Komponente.
  return (
    <div className={styles.inputContainer}>
      {/* Sprachwechsler */}
      <div className={styles.languageSelector}>
        <button
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          className={styles.languageButton}
        >
          {/* Anzeige der aktuellen Sprache als Flagge */}
          <Flag
            code={languages[language]}
            style={{ width: "30px", height: "20px" }}
          />
        </button>
        {isLanguageMenuOpen && (
          <div className={styles.languageDropdown}>
            {/* Dropdown-Menü für die Auswahl der Sprache */}
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

      {/* Eingabefeld für die Suche nach Zutaten */}
      <input
        className={styles.inputField}
        type="text"
        value={zutaten}
        onChange={handleInputChange}
        onFocus={loadZutaten}
        placeholder="🔍"
      />

      {/* Dropdown für gefilterte Zutaten */}
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

      {/* Anzeige der ausgewählten Zutaten */}
      <IngredientsList
        ingredients={selectedIngredients}
        onRemove={handleRemoveIngredient}
      />
    </div>
  );
}

//     Exportiert die Komponente für den Einsatz in anderen Teilen der Anwendung.
export default RezeptSuche;
