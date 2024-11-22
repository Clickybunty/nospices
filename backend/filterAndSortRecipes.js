// utils/filterAndSortRecipes.js
function filterAndSortRecipes(recipes, ingredients) {
  console.log("Filter- und Sortierprozess gestartet...");
  console.log("Eingegebene Zutaten:", ingredients);

  // Exakte Übereinstimmungen
  const exactMatchRecipes = recipes.filter((recipe) => {
    const recipeIngredients = [...recipe.ingredients].sort(); // Sortiere für konsistente Vergleiche
    const searchIngredients = [...ingredients].sort();
    const isExactMatch =
      recipeIngredients.length === searchIngredients.length &&
      recipeIngredients.every((id, index) => id === searchIngredients[index]);

    console.log(`Rezept: ${recipe.name}`);
    console.log(`Rezeptzutaten: ${recipeIngredients}`);
    console.log(`Exakte Übereinstimmung: ${isExactMatch}`);

    return isExactMatch;
  });

  // Partielle Übereinstimmungen
  const partialMatchRecipes = recipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients;
    const isPartialMatch =
      ingredients.every((id) => recipeIngredients.includes(id)) &&
      !exactMatchRecipes.includes(recipe);

    console.log(`Rezept: ${recipe.name}`);
    console.log(`Rezeptzutaten: ${recipeIngredients}`);
    console.log(`Partielle Übereinstimmung: ${isPartialMatch}`);

    return isPartialMatch;
  });

  // Kombiniere die Listen: zuerst exakte, dann partielle Übereinstimmungen
  const sortedRecipes = [...exactMatchRecipes, ...partialMatchRecipes];

  console.log("Exakte Übereinstimmungen:", exactMatchRecipes);
  console.log("Partielle Übereinstimmungen:", partialMatchRecipes);
  console.log("Sortierte Rezepte:", sortedRecipes);

  return sortedRecipes;
}

module.exports = {
  filterAndSortRecipes,
};
