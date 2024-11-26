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
    console.log("Cookie-Zustimmung:", consent);

    // Beispiel: Aktionen basierend auf der Zustimmung
    if (consent === "accepted") {
      console.log("Alle Cookies aktiviert.");
      // Google Analytics oder Tracking-Tools hier starten
    } else if (consent === "declined") {
      console.log("Keine Cookies aktiviert.");
    } else if (consent === "custom") {
      console.log("Benutzer hat benutzerdefinierte Cookie-Einstellungen.");
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

