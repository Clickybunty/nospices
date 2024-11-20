import React from "react";
import Content from "./components/layout/content/Content";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";

// Importiere den LanguageProvider
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    // Umschließe die gesamte App mit dem LanguageProvider
    <LanguageProvider>
      <div className="appContainer">
        <Navbar />
        {/*  <Paralaxe />  */}
        <Content />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
