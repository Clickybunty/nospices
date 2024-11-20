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

  return (
    <div className={styles.resultsContainer}>
      <h4>Ergebnisse:</h4>
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

      <div className={styles.resultsList}>
        {categories.google &&
          results.google?.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google: {link}
            </a>
          ))}
        {categories.chefkoch &&
          results.chefkoch?.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chefkoch: {link}
            </a>
          ))}
        {categories.youtube &&
          results.youtube?.map((video, index) => (
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
          ))}
      </div>
    </div>
  );
}

export default Results;
