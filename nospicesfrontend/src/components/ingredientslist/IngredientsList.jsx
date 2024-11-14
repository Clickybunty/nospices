// IngredientsList.jsx
import React from "react";
import styles from "./IngredientsList.module.css"; // Optional: CSS für das Styling

function IngredientsList({ ingredients, onRemove }) {
  return (
    <div className={styles.selectedListContainer}>
      <h4>Ausgewählte Zutaten:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.selectedItem}>
            {ingredient}
            <button onClick={() => onRemove(ingredient)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
