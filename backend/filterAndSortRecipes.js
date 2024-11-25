
function filterAndSortRecipes(recipes, ingredients) {
  console.log("Filter- und Sortierprozess gestartet...");
  console.log("Eingegebene Zutaten:", ingredients);

  const numericIngredients = ingredients.map(Number);

  const sortedRecipes = recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map(Number);
      const matchCount = numericIngredients.filter((id) =>
        recipeIngredients.includes(id)
      ).length;

      return {
        ...recipe,
        matchCount,
        totalIngredients: recipeIngredients.length,
      };
    })
    .filter((recipe) => recipe.matchCount > 0)
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return a.totalIngredients - b.totalIngredients;
    });

  console.log("Gefilterte und sortierte Rezepte:", sortedRecipes);

  return sortedRecipes;
}

module.exports = filterAndSortRecipes;
