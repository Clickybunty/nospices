const mysql = require("mysql");

// MySQL-Verbindungspool einrichten
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "ZutatenDB",
  port: 3306,
  connectionLimit: 10, // Maximale Verbindungen
});

// Funktion zum Abrufen aller Zutaten
const getAllZutaten = (callback) => {
  const query = "SELECT * FROM zutaten";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen aller Zutaten:", err.message);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Funktion zum Abrufen einer Zutat basierend auf der ID
const getZutatById = (id, callback) => {
  const query = "SELECT * FROM zutaten WHERE id = ?";
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error(`Fehler beim Abrufen der Zutat mit ID ${id}:`, err.message);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Funktion zum Abrufen von Rezepten basierend auf Zutaten-IDs
const getRecipesByIngredients = (ingredients, callback) => {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return callback(new Error("Ungültige oder fehlende Zutaten"), null);
  }

  // Konvertiere alle Zutaten-IDs in Zahlen
  const numericIngredients = ingredients.map((id) => Number(id));

  const placeholders = numericIngredients.map(() => "?").join(",");
  const query = `
    SELECT z.id AS recipe_id, z.ids AS ingredient_ids, rn.rezeptname AS recipe_name
    FROM zutaten z
    JOIN rezeptnames rn ON z.id = rn.id
    WHERE JSON_CONTAINS(z.ids, JSON_ARRAY(${placeholders}))
  `;

  console.log("SQL-Abfrage:", query); // Debugging
  console.log("Parameter:", numericIngredients); // Debugging

  pool.query(query, numericIngredients, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Rezepte:", err.message);
      return callback(err, null);
    }

    // Ergebnisse formatieren
    const formattedResults = results.map((row) => ({
      id: row.recipe_id,
      name: row.recipe_name,
      ingredients: JSON.parse(row.ingredient_ids),
    }));

    callback(null, formattedResults);
  });
};

// Funktion zum Abrufen eines Rezepts basierend auf der ID
const getRecipeById = (id, callback) => {
  // Konvertiere die ID zu einer Zahl
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return callback(new Error("Ungültige Rezept-ID"), null);
  }

  const query = `
    SELECT z.id AS recipe_id, rn.rezeptname AS recipe_name, z.ids AS ingredient_ids
    FROM zutaten z
    JOIN rezeptnames rn ON z.id = rn.id
    WHERE z.id = ?
  `;

  console.log("SQL-Abfrage für Rezept:", query); // Debugging
  console.log("Parameter:", numericId); // Debugging

  pool.query(query, [numericId], (err, results) => {
    if (err) {
      console.error(
        `Fehler beim Abrufen des Rezepts mit ID ${id}:`,
        err.message
      );
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback(null, []);
    }

    const formattedResult = {
      id: results[0].recipe_id,
      name: results[0].recipe_name,
      ingredients: JSON.parse(results[0].ingredient_ids),
    };

    callback(null, formattedResult);
  });
};

// Exportiere die Funktionen
module.exports = {
  getAllZutaten,
  getZutatById,
  getRecipesByIngredients,
  getRecipeById,
  pool, // Pool wird exportiert, falls er direkt benötigt wird
};
