// filterAndSortRecipes.js
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

      const isExactMatch =
        matchCount === numericIngredients.length &&
        numericIngredients.every((id) => recipeIngredients.includes(id));

      return {
        ...recipe,
        matchCount,
        isExactMatch,
      };
    })
    .sort((a, b) => {
      if (a.isExactMatch && !b.isExactMatch) return -1;
      if (!a.isExactMatch && b.isExactMatch) return 1;
      return b.matchCount - a.matchCount;
    });

  console.log("Gefilterte und sortierte Rezepte:", sortedRecipes);

  return sortedRecipes;
}

module.exports = filterAndSortRecipes;
