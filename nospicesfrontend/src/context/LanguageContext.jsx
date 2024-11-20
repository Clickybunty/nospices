import React, { createContext, useState, useContext } from "react";

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
