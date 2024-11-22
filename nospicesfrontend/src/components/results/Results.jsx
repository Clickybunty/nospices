import React, { useState, useEffect } from "react";
import styles from "./Results.module.css";
import axios from "axios";

function Results({ initialRecipes }) {
  const [activeCategory, setActiveCategory] = useState("recipes");
  const [results, setResults] = useState(initialRecipes || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (activeCategory === "recipes") {
        setResults(initialRecipes || []);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let apiUrl = "";
        if (activeCategory === "youtube") {
          apiUrl = `/api/youtube?query=Rezepte`;
        } else if (activeCategory === "chefkoch") {
          apiUrl = `/api/chefkoch?query=Rezepte`;
        } else if (activeCategory === "google") {
          apiUrl = `/api/google?query=Rezepte`;
        }

        const response = await axios.get(apiUrl);
        setResults(response.data || []);
      } catch (err) {
        console.error("Fehler beim Abrufen der Ergebnisse:", err);
        setError("Fehler beim Abrufen der Ergebnisse.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [activeCategory, initialRecipes]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.resultsContainer}>
      <h4>Ergebnisse:</h4>

      {/* Rezeptnamen */}
      {activeCategory === "recipes" && (
        <div className={styles.recipeNames}>
          <h5>Rezepte:</h5>
          <ul>
            {results.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      )}

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
        <label>
          <input
            type="radio"
            name="category"
            checked={activeCategory === "chefkoch"}
            onChange={() => handleCategoryChange("chefkoch")}
          />
          Chefkoch
        </label>
        <label>
          <input
            type="radio"
            name="category"
            checked={activeCategory === "google"}
            onChange={() => handleCategoryChange("google")}
          />
          Google
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
            results.map((recipe, index) => (
              <div key={index} className={styles.recipeItem}>
                <h5>{recipe}</h5>
              </div>
            ))}
          {activeCategory === "youtube" &&
            results.map((video, index) => (
              <div key={index} className={styles.videoItem}>
                <iframe
                  width="300"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{video.title}</p>
              </div>
            ))}
          {activeCategory === "chefkoch" &&
            results.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}
          {activeCategory === "google" &&
            results.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}
        </div>
      )}
    </div>
  );
}

export default Results;
