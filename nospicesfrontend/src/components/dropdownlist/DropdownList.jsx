// Importiert das React-Modul,
// das für die Erstellung von React-Komponenten notwendig ist
import React from "react";

// Importiert die CSS-Module-Datei für diese Komponente,
// um die Styles spezifisch und kapselbar zu machen
import styles from "./DropdownList.module.css";

// Definiert die Funktion `DropdownList`,
// die als React-Komponente dient
// Sie nimmt zwei Props entgegen:
// 1. `items`: Ein Array von Elementen,
// die in der Dropdown-Liste angezeigt werden sollen
// 2. `onItemClick`: Eine Callback-Funktion,
// die aufgerufen wird, wenn ein Element angeklickt wird
function DropdownList({ items, onItemClick }) {
  // Gibt die Struktur der Dropdown-Liste zurück
  return (
    // Erstellt einen Container für die Dropdown-Liste und
    // wendet eine CSS-Klasse an
    <div className={styles.dropdownContainer}>
      {/* Iteriert über das `items`-Array, um jedes Element darzustellen */}
      {items.map((item, index) => (
        // Erstellt ein einzelnes Dropdown-Element für jedes `item`
        // Die `key`-Eigenschaft sorgt dafür,
        // dass jedes Element eine eindeutige Identität im DOM hat
        <div
          // Der Index des aktuellen Elements im Array wird als Schlüssel verwendet
          key={index}
          // Wendet eine CSS-Klasse für Styling an
          className={styles.dropdownItem}
          // Ruft die `onItemClick`-Funktion auf,
          // wenn das Dropdown-Element angeklickt wird
          onClick={() => onItemClick(item)}
        >
          {/* Zeigt den Text des aktuellen Elements (`item`) an */}
          {item}
        </div>
      ))}
    </div>
  );
}

// Exportiert die `DropdownList`-Komponente,
// damit sie in anderen Dateien importiert und verwendet werden kann
export default DropdownList;
