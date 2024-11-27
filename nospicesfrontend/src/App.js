import React, { useEffect } from "react";
import Content from "./components/layout/content/Content";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";
import useDarkMode from "./hooks/useDarkMode";
import { LanguageProvider } from "./context/LanguageContext";
import CookieBanner from "./components/Cookies/CookieBanner"; // Richtig importiert
import styles from "./App.css";
import Cookies from "js-cookie";


function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    const consent = Cookies.get("userConsent");
    if (consent) {
      const parsedConsent = JSON.parse(consent);
      if (parsedConsent.statistics) {
        console.log("Statistik-Tracking aktiviert.");
        // Tracking-Code für Statistik aktivieren
      }
      if (parsedConsent.marketing) {
        console.log("Marketing-Tracking aktiviert.");
        // Tracking-Code für Marketing aktivieren
      }
    }
  }, []);
  
  

  return (
    <LanguageProvider>
      <div className={styles.darkMode ? "dark-mode" : ""}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Content darkMode={darkMode} />
        <Footer darkMode={darkMode} />
        
        {/* CookieBanner wird hier hinzugefügt */}
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}

export default App;

