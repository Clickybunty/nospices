import React from "react";
import styles from "./Impressum.module.css";

const Impressum = () => {
  return (
    <div className={styles.impressumContainer}>
      <h1>Impressum</h1>
      <p>
        <strong>Angaben gemäß § 5 TMG</strong>
      </p>
      <p>
        <strong>Anbieter:</strong>
        <br />
        [Name des Unternehmens oder der verantwortlichen Person]
        <br />
        [Anschrift]
        <br />
        [Postleitzahl, Ort]
        <br />
        [Land]
      </p>
      <p>
        <strong>Vertreten durch:</strong>
        <br />
        [Name der vertretungsberechtigten Person, falls ein Unternehmen]
      </p>
      <p>
        <strong>Kontakt:</strong>
        <br />
        Telefon: [Telefonnummer]
        <br />
        E-Mail: [E-Mail-Adresse]
        <br />
        Website: [Webadresse eurer App]
      </p>
      <p>
        <strong>Registereintrag:</strong>
        <br />
        Eintragung im Handelsregister.
        <br />
        Registergericht: [Name des Amtsgerichts]
        <br />
        Registernummer: [Nummer]
      </p>
      <p>
        <strong>Umsatzsteuer-ID:</strong>
        <br />
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
        [ID-Nummer]
      </p>
      <p>
        <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
        <br />
        [Name]
        <br />
        [Anschrift]
      </p>
      <h2>Haftungsausschluss (Disclaimer)</h2>
      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>
      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>
      <h3>Plattform der EU-Kommission zur Online-Streitbeilegung (OS):</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.impressumLink}
        >
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
    </div>
  );
};

export default Impressum;
