import React, { useEffect, useRef } from "react";
import styles from "./FilteredList.module.css";

function FilteredList({ items, focusedIndex, onItemClick }) {
  const containerRef = useRef(null); // Referenz für die gesamte Liste
  const itemRefs = useRef([]); // Array von Referenzen für alle Items

  useEffect(() => {
    if (focusedIndex !== null && itemRefs.current[focusedIndex]) {
      // Scrolle das fokussierte Element in den sichtbaren Bereich
      itemRefs.current[focusedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  return (
    <div ref={containerRef} className={styles.dropdownContainer}>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (itemRefs.current[index] = el)} // Element-Referenz speichern
          className={`${styles.dropdownItem} ${
            index === focusedIndex ? styles.focused : ""
          }`}
          onClick={() => onItemClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default FilteredList;
