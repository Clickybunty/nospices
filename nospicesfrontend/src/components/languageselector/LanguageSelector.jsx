import React from "react";
//     Importiert eine Bibliothek,
//     die Weltflaggen basierend auf ISO-Codes anzeigt.
import Flag from "react-world-flags";
import styles from "./LanguageSelector.module.css";

function LanguageSelector({ language, languages, onLanguageChange }) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);

  return (
    <div className={styles.languageSelector}>
      <button
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        className={styles.languageButton}
      >
        <Flag
          code={languages[language]}
          style={{ width: "30px", height: "20px" }}
        />
      </button>
      {isLanguageMenuOpen && (
        <div className={styles.languageDropdown}>
          {Object.keys(languages).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onLanguageChange(lang);
                setIsLanguageMenuOpen(false);
              }}
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
  );
}

export default LanguageSelector;
