// Importiert das React-Modul,
// das für die Erstellung von React-Komponenten notwendig ist
import React from "react";

// Importiert die CSS-Module-Datei für diese Komponente,
// um die Stile spezifisch und gekapselt zu halten
import styles from "./FilteredList.module.css";

// Definiert die Funktion `FilteredList`,
// die als React-Komponente dient
// Sie nimmt zwei Props entgegen:
// 1. `items`: Ein Array von Elementen,
// die angezeigt werden sollen
// 2. `onItemClick`: Eine Callback-Funktion,
// die ausgeführt wird, wenn ein Element angeklickt wird
function FilteredList({ items, onItemClick }) {
  // Gibt die Struktur der gefilterten Liste zurück
  return (
    // Erstellt einen Container für die gefilterte Liste und wendet eine CSS-Klasse an
    <div className={styles.dropdownContainer}>
      {/* Iteriert über das `items`-Array, um jedes Element als Listeneintrag darzustellen */}
      {items.map((item, index) => (
        // Erstellt ein einzelnes Element für jedes Item im Array
        // Die `key`-Eigenschaft stellt sicher,
        // dass jedes Element im virtuellen DOM eine eindeutige Identität hat
        <div
          // Der Index des aktuellen Elements im Array wird als Schlüssel verwendet
          key={index}
          // Wendet eine CSS-Klasse für das Styling an
          className={styles.dropdownItem}
          // Ruft die `onItemClick`-Funktion auf,
          // wenn ein Element angeklickt wird
          onClick={() => onItemClick(item)}
        >
          {/* Zeigt den Text des aktuellen Elements (`item`) in der Liste an */}
          {item}
        </div>
      ))}
    </div>
  );
}

// Exportiert die `FilteredList`-Komponente,
// damit sie in anderen Dateien importiert und verwendet werden kann
export default FilteredList;
