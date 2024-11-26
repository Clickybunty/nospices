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

// Weitere Routen und Middleware
// ...
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