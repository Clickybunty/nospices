import React from "react";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPolicy}>
      <h1>Datenschutzerklärung</h1>
      <p>
        <strong>1. Name und Kontaktdaten des Verantwortlichen</strong>
        <br />
        Verantwortlich für die Verarbeitung der Daten auf dieser Website ist:
        <br />
        <strong>[Name des Unternehmens/Betreibers]</strong>
        <br />
        Adresse: [Anschrift]
        <br />
        E-Mail: [E-Mail-Adresse]
        <br />
        Telefon: [Telefonnummer]
      </p>
      <p>
        <strong>2. Allgemeines zur Datenverarbeitung</strong>
        <br />
        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten
        werden vertraulich und entsprechend der gesetzlichen
        Datenschutzvorschriften sowie dieser Datenschutzerklärung behandelt.
      </p>
      <p>
        <strong>3. Verwendung von Cookies</strong>
        <br />
        Unsere Website verwendet folgende Arten von Cookies:
      </p>
      <ul>
        <li>
          <strong>Technisch notwendige Cookies:</strong> Diese Cookies sind
          erforderlich und benötigen keine Zustimmung (Art. 6 Abs. 1 lit. f
          DSGVO).
        </li>
        <li>
          <strong>Statistik-Cookies:</strong> Diese Cookies sammeln
          anonymisierte Daten über das Nutzungsverhalten (Art. 6 Abs. 1 lit. a
          DSGVO).
        </li>
        <li>
          <strong>Marketing-Cookies:</strong> Diese Cookies ermöglichen
          personalisierte Werbung (Art. 6 Abs. 1 lit. a DSGVO).
        </li>
      </ul>
      <p>
        <strong>4. Datenweitergabe an Dritte</strong>
        <br />- <strong>Google Analytics:</strong> Anonymisierte
        Nutzungsauswertungen.
        <br />- <strong>Facebook Pixel:</strong> Tracking für Marketingzwecke.
      </p>
      <p>
        <strong>5. Rechte der betroffenen Person</strong>
        <br />
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Widerspruch
        und Datenübertragbarkeit gemäß DSGVO.
      </p>
      <p>
        <strong>6. Kontakt für Datenschutzanfragen</strong>
        <br />
        Für Fragen oder zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte
        unter:
        <br />
        [E-Mail-Adresse].
      </p>
      <p>
        <strong>7. Änderungen der Datenschutzerklärung</strong>
        <br />
        Diese Erklärung kann an neue gesetzliche oder technische Anforderungen
        angepasst werden.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
