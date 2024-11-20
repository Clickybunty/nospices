import React from "react";
import styles from "./IngredientsList.module.css";

function IngredientsList({ ingredients, onRemove }) {
  return (
    <div className={styles.selectedListContainer}>
      <h4>Ausgewählte Zutaten:</h4>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className={styles.selectedItem}>
            {ingredient.name}
            <button onClick={() => onRemove(ingredient.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
