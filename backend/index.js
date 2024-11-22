const express = require("express");
const cors = require("cors");
const recipesRoute = require("./recipes"); // Route für Rezept-API
const db = require("./callDbData"); // Datenbankfunktionen

const app = express();
app.use(cors()); // CORS für alle Ursprünge aktivieren
app.use(express.json()); // JSON-Parser

// Standard-API-Route
app.get("/api", (req, res) => {
  res.send("Hello from Express API");
});

// Route für Rezepte einbinden
app.use("/api/recipes", recipesRoute);

// GET /zutaten: Alle Zutaten abrufen
app.get("/zutaten", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.getAllZutaten((err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    res.status(200).json(results);
  } catch (err) {
    console.error("Fehler beim Abrufen der Zutaten:", err);
    res.status(500).json({ error: "Fehler beim Abrufen der Zutaten." });
  }
});

// GET /zutaten/:id: Zutat basierend auf der ID abrufen
app.get("/zutaten/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const results = await new Promise((resolve, reject) => {
      db.getZutatById(id, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    if (results.length === 0) {
      return res.status(404).json({ error: "Zutat nicht gefunden." });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error(`Fehler beim Abrufen der Zutat mit ID ${id}:`, err);
    res.status(500).json({ error: "Fehler beim Abrufen der Zutat." });
  }
});

// PUT /zutaten/:id: Bestehende Zutat aktualisieren
app.put("/zutaten/:id", async (req, res) => {
  const id = req.params.id;
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "Ungültige IDs." });
  }

  try {
    const results = await new Promise((resolve, reject) => {
      const query = "UPDATE zutaten SET ids = ? WHERE id = ?";
      db.pool.query(query, [JSON.stringify(ids), id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Zutat nicht gefunden." });
    }
    res.status(200).json({ message: "Zutat erfolgreich aktualisiert." });
  } catch (err) {
    console.error(`Fehler beim Aktualisieren der Zutat mit ID ${id}:`, err);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Zutat." });
  }
});

// POST /zutaten: Neue Zutat hinzufügen
app.post("/zutaten", async (req, res) => {
  const { id, ids } = req.body;

  if (!id || !Array.isArray(ids)) {
    return res.status(400).json({ error: "Ungültige Eingabedaten." });
  }

  try {
    const results = await new Promise((resolve, reject) => {
      const query = "INSERT INTO zutaten (id, ids) VALUES (?, ?)";
      db.pool.query(query, [id, JSON.stringify(ids)], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    res.status(201).json({ message: "Zutat erfolgreich hinzugefügt." });
  } catch (err) {
    console.error("Fehler beim Hinzufügen der Zutat:", err);
    res.status(500).json({ error: "Fehler beim Hinzufügen der Zutat." });
  }
});

// Middleware für Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error("Unerwarteter Fehler:", err.message);
  res.status(err.status || 500).json({ error: "Interner Serverfehler." });
});

// Server starten
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
