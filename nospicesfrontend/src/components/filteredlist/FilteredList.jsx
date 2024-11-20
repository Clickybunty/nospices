import React from "react";
import styles from "./FilteredList.module.css";

function FilteredList({ items, onItemClick }) {
  return (
    <div className={styles.dropdownContainer}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => onItemClick(item)} // Das gesamte Objekt wird weitergegeben
        >
          {item.name} {/* Nur die `name`-Eigenschaft wird gerendert */}
        </div>
      ))}
    </div>
  );
}

export default FilteredList;
