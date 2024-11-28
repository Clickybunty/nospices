import React, { createContext, useState, useContext, useEffect } from "react";

// Create a LanguageContext to manage global language settings
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("de");

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

  // Automatische Sprachdetektion beim ersten Laden
  useEffect(() => {
    const browserLanguage = navigator.language.split("-")[0]; // Beispiel: "en-US" -> "en"
    if (languages[browserLanguage]) {
      setLanguage(browserLanguage); // Setze die Browsersprache, falls unterstützt
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, languages, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
