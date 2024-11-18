const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// MySQL-Verbindung einrichten
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "zutaten_db",
});

// Verbindung zur Datenbank herstellen
connection.connect((err) => {
  if (err) {
    console.error("Fehler beim Verbinden zur Datenbank: " + err.stack);
    return;
  }
  console.log("Verbunden mit der Datenbank als ID " + connection.threadId);
});

// Route für die Rezeptsuche basierend auf Zutaten
router.post("/search", (req, res) => {
  const { ingredients } = req.body; // Zutaten vom Frontend

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "Keine Zutaten angegeben." });
  }

  // SQL-Abfrage: Suche nach Rezepten, die mindestens eine der Zutaten enthalten
  const placeholders = ingredients.map(() => "?").join(",");
  const query = `
    SELECT r.id, r.name
    FROM rezepte r
    JOIN rezept_zutaten rz ON r.id = rz.rezept_id
    JOIN zutaten z ON rz.zutat_id = z.id
    WHERE z.name IN (${placeholders})
    GROUP BY r.id, r.name
    ORDER BY COUNT(DISTINCT z.name) DESC
  `;

  connection.query(query, ingredients, (err, results) => {
    if (err) {
      console.error("Fehler bei der Abfrage:", err);
      return res.status(500).json({ error: "Datenbankfehler." });
    }

    res.json(results);
  });
});

module.exports = router;
