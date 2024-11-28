import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Results.module.css";

function Results({ initialRecipes }) {
  const [activeCategory, setActiveCategory] = useState("recipes");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState({}); // Aktueller Index für jedes Rezept

  const YOUTUBE_API_KEY = "AIzaSyBTzRqNCwYXtmAwSMtuq9xX_3Qf7AAwg84";

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
                maxResults: 5, // Hole 5 Videos
                key: YOUTUBE_API_KEY,
              },
            }
          );

          const videos = response.data.items.map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
          }));

          return { recipe, videos };
        })
      );

      setResults(videoResults);
      // Setze den Index für jedes Rezept auf das erste Video
      const initialIndexes = recipes.reduce((acc, recipe) => {
        acc[recipe] = 0;
        return acc;
      }, {});
      setCurrentVideoIndex(initialIndexes);
    } catch (err) {
      console.error("Fehler beim Abrufen der YouTube-Videos:", err.message);
      setError("Fehler beim Abrufen der YouTube-Videos.");
    } finally {
      setLoading(false);
    }
  };

  // Effekt: Videos laden, wenn die Kategorie "YouTube" ist
  useEffect(() => {
    if (activeCategory === "youtube") {
      fetchYouTubeVideosForRecipes(initialRecipes || []);
    } else {
      setResults(initialRecipes.map((recipe) => ({ recipe, videos: [] })));
    }
  }, [activeCategory, initialRecipes]);

  // Zum nächsten Video wechseln
  const handleNextVideo = (recipe) => {
    setCurrentVideoIndex((prevIndex) => {
      const nextIndex = (prevIndex[recipe] + 1) % results.find((r) => r.recipe === recipe).videos.length;
      return { ...prevIndex, [recipe]: nextIndex };
    });
  };

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
      ) : activeCategory === "recipes" ? (
        <div className={styles.recipeNames}>
          <h5>Rezepte:</h5>
          <ul>
            {initialRecipes.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.resultsList}>
          {results.map((item, index) => (
            <div key={index} className={styles.recipeSection}>
              <h5 className={styles.categoryTitle}>{item.recipe}</h5>
              <div className={styles.videoContainer}>
                <iframe
                  className={styles.video}
                  src={`https://www.youtube.com/embed/${item.videos[currentVideoIndex[item.recipe]]?.videoId}`}
                  title={item.videos[currentVideoIndex[item.recipe]]?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className={styles.nextButton}
                  onClick={() => handleNextVideo(item.recipe)}
                >
                  Nächstes Video &rarr;
                </button>
                <p>{item.videos[currentVideoIndex[item.recipe]]?.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
