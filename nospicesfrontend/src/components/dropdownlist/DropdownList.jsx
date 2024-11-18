import React from "react";
import styles from "./DropdownList.module.css";

function DropdownList({ items, onItemClick }) {
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

export default DropdownList;
