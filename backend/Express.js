const express = require("express");
const mysql = require("mysql");
const axios = require("axios");

const app = express();
app.use(express.json());

// MySQL-Datenbankverbindung
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "ZutatenDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// API-Endpunkt für Rezeptsuche
app.post("/api/search", async (req, res) => {
  const { ingredientIds } = req.body; // Übergebene Zutaten-IDs aus dem Frontend

  if (!ingredientIds || !Array.isArray(ingredientIds)) {
    return res.status(400).send({ error: "Invalid ingredient IDs" });
  }

  try {
    // Abruf aller Rezepte und Zutaten
    const recipes = await getRecipesWithIngredients();

    // Filterung passender Rezepte
    const exactMatchRecipes = recipes.filter((recipe) =>
      ingredientIds.every((id) => recipe.ingredientIds.includes(id))
    );

    const partialMatchRecipes = recipes.filter(
      (recipe) =>
        !exactMatchRecipes.includes(recipe) &&
        recipe.ingredientIds.some((id) => ingredientIds.includes(id))
    );

    // Aufruf der APIs für die gefundenen Rezepte
    const apiResults = await fetchFromAPIs([
      ...exactMatchRecipes,
      ...partialMatchRecipes,
    ]);

    // Rückgabe der Ergebnisse an das Frontend
    res.status(200).send(apiResults);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Funktion zum Abrufen aller Rezepte und deren Zutaten
async function getRecipesWithIngredients() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT r.id AS recipeId, r.name AS recipeName, z.ingredient_id AS ingredientId
      FROM rezeptnames r
      JOIN zutaten z ON r.id = z.recipe_id
    `;

    db.query(query, (err, results) => {
      if (err) return reject(err);

      // Gruppiere Zutaten-IDs nach Rezepten
      const groupedResults = results.reduce((acc, row) => {
        const recipe = acc.find((r) => r.recipeId === row.recipeId);
        if (recipe) {
          recipe.ingredientIds.push(row.ingredientId);
        } else {
          acc.push({
            recipeId: row.recipeId,
            recipeName: row.recipeName,
            ingredientIds: [row.ingredientId],
          });
        }
        return acc;
      }, []);
      resolve(groupedResults);
    });
  });
}

// Funktion zum Abrufen der API-Ergebnisse
async function fetchFromAPIs(recipes) {
  const apiResults = {
    google: [],
    youtube: [],
    chefkoch: [],
  };

  for (const recipe of recipes) {
    const searchTerm = `${recipe.recipeName} Rezept`;
    const youtubeSearchTerm = `${recipe.recipeName} zubereiten`;

    // API-Aufrufe
    const googleResults = await axios.get(
      `https://www.google.com/search?q=${searchTerm}`
    );
    const youtubeResults = await axios.get(
      `https://www.youtube.com/results?search_query=${youtubeSearchTerm}`
    );
    const chefkochResults = await axios.get(
      `https://www.chefkoch.de/rezepte?search=${searchTerm}`
    );

    // Gruppiere die Ergebnisse
    apiResults.google.push({
      recipeName: recipe.recipeName,
      data: googleResults.data,
    });
    apiResults.youtube.push({
      recipeName: recipe.recipeName,
      data: youtubeResults.data,
    });
    apiResults.chefkoch.push({
      recipeName: recipe.recipeName,
      data: chefkochResults.data,
    });
  }

  return apiResults;
}

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
