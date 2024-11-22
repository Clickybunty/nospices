import React, { useState } from "react";
import styles from "./Results.module.css";


function Results({ results }) {
  const [categories, setCategories] = useState({
    google: true,
    chefkoch: true,
    youtube: true,
  });

  const handleCheckboxChange = (category) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!results) {
    return <p>Lade Ergebnisse...</p>;
  }

  return (
    <div className={styles.resultsContainer}>
      <h4>Ergebnisse:</h4>

      {/* Filteroptionen */}
      <div className={styles.filterContainer}>
        <label>
          <input
            type="checkbox"
            checked={categories.google}
            onChange={() => handleCheckboxChange("google")}
          />
          Google
        </label>
        <label>
          <input
            type="checkbox"
            checked={categories.chefkoch}
            onChange={() => handleCheckboxChange("chefkoch")}
          />
          Chefkoch
        </label>
        <label>
          <input
            type="checkbox"
            checked={categories.youtube}
            onChange={() => handleCheckboxChange("youtube")}
          />
          YouTube
        </label>
      </div>

      {/* Ergebnisse */}
      <div className={styles.resultsList}>
        {categories.google &&
          (results.google && results.google.length > 0 ? (
            results.google.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google: {link}
              </a>
            ))
          ) : (
            <p>Keine Google-Ergebnisse gefunden.</p>
          ))}

        {categories.chefkoch &&
          (results.chefkoch && results.chefkoch.length > 0 ? (
            results.chefkoch.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chefkoch: {link}
              </a>
            ))
          ) : (
            <p>Keine Chefkoch-Ergebnisse gefunden.</p>
          ))}

        {categories.youtube &&
          (results.youtube && results.youtube.length > 0 ? (
            results.youtube.map((video, index) => (
              <div key={index} className={styles.videoContainer}>
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
            ))
          ) : (
            <p>Keine YouTube-Ergebnisse gefunden.</p>
          ))}
      </div>
    </div>
  );
}

export default Results;
