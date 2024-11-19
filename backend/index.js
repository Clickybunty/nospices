const express = require("express");
const cors = require("cors");
const recipesRoute = require('./routes/recipes');
app.use('/api/recipes', recipesRoute);
const db = require("./callDbData"); // Importiere die Datenbankfunktionen aus callDbData.js


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello from Express");
});

// GET /zutaten: Holt alle Zutaten
app.get("/zutaten", (req, res) => {
  db.getAllZutaten((err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      return res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
    }
    res.json(results);
  });
});

// GET /zutaten/:id: Holt eine spezifische Zutat basierend auf der ID
app.get("/zutaten/:id", (req, res) => {
  const id = req.params.id; // Hole die ID aus der URL
  db.getZutatById(id, (err, results) => {
    if (err) {
      console.error(`Fehler beim Abrufen der Daten für ID ${id}:`, err);
      return res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Zutat nicht gefunden" });
    }
    res.json(results[0]); // Gebe die erste (und einzige) Zutat zurück
  });
});

app.put('/zutaten/:id', (req, res) => {
  const id = req.params.id;
  const { ids } = req.body; // Erwartet ein JSON-Objekt mit neuen Daten
  const query = 'UPDATE zutaten SET ids = ? WHERE id = ?';

  db.pool.query(query, [JSON.stringify(ids), id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Aktualisieren der Daten' });
    }
    res.json({ message: 'Daten erfolgreich aktualisiert' });
  });
});

app.post('/zutaten', (req, res) => {
  const { id, ids } = req.body; // Erwartet ein JSON-Objekt mit neuen Daten
  const query = 'INSERT INTO zutaten (id, ids) VALUES (?, ?)';

  db.pool.query(query, [id, JSON.stringify(ids)], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Hinzufügen der Daten' });
    }
    res.json({ message: 'Daten erfolgreich hinzugefügt' });
  });
});

// GET /rezepte: Alle Rezepte abrufen
app.get('/rezepte', (req, res) => {
  db.getAllRezepte((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
    }
    res.json(results);
  });
});

// GET /rezepte/:id: Ein Rezept abrufen
app.get('/rezepte/:id', (req, res) => {
  const id = req.params.id;
  db.getRezeptById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Abrufen des Rezepts' });
    }
    if (!result) {
      return res.status(404).json({ error: 'Rezept nicht gefunden' });
    }
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log('Server läuft auf http://localhost:5000');
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
