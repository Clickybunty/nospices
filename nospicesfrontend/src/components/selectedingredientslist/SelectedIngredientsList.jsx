import React from "react";
import styles from "./SelectedIngredientsList.module.css";

function SelectedIngredientsList({ ingredients, onRemove }) {
  return (
    <div className={styles.ingredientsList}>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={styles.ingredientItem}>
          {ingredient}
          <button onClick={() => onRemove(ingredient)}>✖</button>
        </div>
      ))}
    </div>
  );
}

export default SelectedIngredientsList;
