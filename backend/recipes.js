const express = require("express");
const router = express.Router();
const db = require("./callDbData");

// Standard-GET-Route, um die Verbindung zu testen
router.get("/", (req, res) => {
  res.status(200).json({ message: "Recipes API is working!" });
});

// Route für die Rezeptsuche basierend auf Zutaten
router.post("/search", (req, res) => {
  const { ingredients } = req.body; // Zutaten aus dem Request-Body
  console.log("Anfrage an POST /search:", ingredients);

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    console.error("Ungültige Eingabe:", req.body);
    return res.status(400).json({ error: "Ungültige oder fehlende Zutaten." });
  }

  db.getRecipesByIngredients(ingredients, (err, results) => {
    if (err) {
      console.error("Fehler bei der Rezeptsuche:", err.message);
      return res.status(500).json({
        error: "Datenbankfehler bei der Rezeptsuche. Bitte prüfe die Logs.",
      });
    }

    console.log("Gefundene Rezepte (vor Filterung):", results);

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "Keine passenden Rezepte gefunden." });
    }

    // Rezeptnamen ohne Anführungszeichen senden
    const recipeNames = results.map((recipe) =>
      recipe.name.replace(/^"|"$/g, "")
    );
    console.log("Rezeptnamen, die ans Frontend gesendet werden:", recipeNames);

    res.status(200).json(recipeNames);
  });
});

module.exports = router;
