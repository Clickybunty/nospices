// Filtert Rezepte basierend auf exakter und partieller Übereinstimmung
function filterAndSortRecipes(recipes, ingredients) {
  // Exakte Übereinstimmungen
  const exactMatchRecipes = recipes.filter((recipe) => {
    const recipeIngredients = [...recipe.ingredients].sort(); // Sortiere für konsistente Vergleiche
    const searchIngredients = [...ingredients].sort();
    return (
      recipeIngredients.length === searchIngredients.length &&
      recipeIngredients.every((id, index) => id === searchIngredients[index])
    );
  });

  // Partielle Übereinstimmungen
  const partialMatchRecipes = recipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients;
    return (
      ingredients.every((id) => recipeIngredients.includes(id)) &&
      !exactMatchRecipes.includes(recipe)
    );
  });

  // Kombiniere die Listen: zuerst exakte Übereinstimmungen, dann partielle
  const sortedRecipes = [...exactMatchRecipes, ...partialMatchRecipes];

  console.log("Sortierte Rezepte:", sortedRecipes);

  // Kombiniere die Ergebnisse: Exakte zuerst
  return sortedRecipes;
}

module.exports = {
  filterAndSortRecipes,
}; 
