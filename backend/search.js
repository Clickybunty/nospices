const { filterAndSortRecipes } = require("./utils/filterAndSortRecipes");

router.post("/search", (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Ungültige oder fehlende Zutaten." });
  }

  db.getRecipesByIngredients(ingredients, (err, results) => {
    if (err) {
      console.error("Fehler bei der Rezeptsuche:", err.message);
      return res.status(500).json({
        error: "Datenbankfehler bei der Rezeptsuche. Bitte prüfe die Logs.",
      });
    }

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "Keine passenden Rezepte gefunden." });
    }

    // Filtere und sortiere die Rezepte
    const sortedRecipes = filterAndSortRecipes(results, ingredients);

    // Sende die sortierten Rezepte ans Frontend
    res.status(200).json(sortedRecipes);
  });
});
