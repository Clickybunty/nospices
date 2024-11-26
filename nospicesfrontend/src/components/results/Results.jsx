import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Results.module.css";

function Results({ initialRecipes }) {
  const [activeCategory, setActiveCategory] = useState("recipes");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const YOUTUBE_API_KEY = "AIzaSyD6tqjw5IyzMjJUkka4CZ4vSV189Ha1koE";

  // Funktion, um Videos pro Rezept zu laden
  const fetchYouTubeVideosForRecipes = async (recipes) => {
    setLoading(true);
    setError(null);

    try {
      const videoResults = await Promise.all(
        recipes.map(async (recipe) => {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                part: "snippet",
                q: `Rezept ${recipe}`, // Suche nach Rezept + Name
                type: "video",
                maxResults: 1, // Nur ein Ergebnis
                key: YOUTUBE_API_KEY,
              },
            }
          );

          const video = response.data.items[0];
          return {
            recipe,
            videoId: video?.id.videoId || null,
            title: video?.snippet.title || "Kein Video gefunden",
          };
        })
      );

      setResults(videoResults);
    } catch (err) {
      console.error("Fehler beim Abrufen der YouTube-Videos:", err.message);
      setError("Fehler beim Abrufen der YouTube-Videos.");
    } finally {
      setLoading(false);
    }
  };

  // Effekt: Rezepte oder Videos laden
  useEffect(() => {
    if (activeCategory === "youtube") {
      fetchYouTubeVideosForRecipes(initialRecipes || []);
    } else if (activeCategory === "recipes") {
      setResults(initialRecipes.map((recipe) => ({ recipe })));
    }
  }, [activeCategory, initialRecipes]);

  // Kategorie ändern
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.resultsContainer}>
      <h4>Ergebnisse:</h4>

      {/* Kategorieauswahl */}
      <div className={styles.filterContainer}>
        <label>
          <input
            type="radio"
            name="category"
            checked={activeCategory === "recipes"}
            onChange={() => handleCategoryChange("recipes")}
          />
          Rezepte
        </label>
        <label>
          <input
            type="radio"
            name="category"
            checked={activeCategory === "youtube"}
            onChange={() => handleCategoryChange("youtube")}
          />
          YouTube
        </label>
      </div>

      {/* Ergebnisse */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className={styles.resultsList}>
          {activeCategory === "recipes" &&
            results.map((item, index) => (
              <div key={index} className={styles.recipeItem}>
                <h5>{item.recipe}</h5>
              </div>
            ))}

          {activeCategory === "youtube" &&
            results.map((item, index) => (
              <div key={index} className={styles.videoItem}>
                {item.videoId ? (
                  <>
                    <iframe
                      width="300"
                      height="200"
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p>{item.title}</p>
                  </>
                ) : (
                  <p>Kein Video für "{item.recipe}" gefunden</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Results;
