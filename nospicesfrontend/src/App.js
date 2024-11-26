import React from "react";
import Content from "./components/layout/content/Content";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";
import useDarkMode from "./hooks/useDarkMode";
import { LanguageProvider } from "./context/LanguageContext";
import CookieBanner from "./components/Cookies/CookieBanner"; // Richtig importiert
import styles from "./App.css";

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

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

