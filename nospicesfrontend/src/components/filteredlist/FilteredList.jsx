import React from "react";
import styles from "./FilteredList.module.css";

function FilteredList({ items, onItemClick }) {
  return (
    <div className={styles.dropdownContainer}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => onItemClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default FilteredList;
