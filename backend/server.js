const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3306;

// MySQL-Verbindung einrichten
const connection = mysql.createConnection({
  host: '18.194.88.143', //"localhost", // Die Adresse des MySQL-Servers (lokal)
  user: "root", // Dein MySQL-Benutzername (standardmäßig 'root')
  password: "0000", // Dein MySQL-Passwort (leerlassen, falls du kein Passwort gesetzt hast)
  database: "ZutatenDB", // Der Name der Datenbank, die du erstellt hast
});

// Verbindung herstellen
connection.connect((err) => {
  if (err) {
    console.error("Fehler beim Verbinden zur Datenbank: " + err.stack);
    return;
  }
  console.log("Verbunden mit der Datenbank als ID " + connection.threadId);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
