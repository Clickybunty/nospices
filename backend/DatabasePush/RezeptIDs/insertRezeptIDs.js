const mysql = require("mysql");
const fs = require("fs");

// MySQL-Verbindung einrichten
const connection = mysql.createConnection({
  host: "localhost", // Der MySQL-Server (lokal)
  user: "root", // Dein MySQL-Benutzername
  password: "0000", // Dein MySQL-Passwort (lassen wir leer, wenn kein Passwort gesetzt)
  database: "zutatendb", // Der Name der Datenbank
});

// Verbindung herstellen
connection.connect((err) => {
  if (err) {
    console.error("Fehler beim Verbinden zur Datenbank: " + err.stack);
    return;
  }
  console.log("Verbunden mit der Datenbank als ID " + connection.threadId);
});

// Lese die umgewandelte JSON-Datei ein
fs.readFile("transformedRezeptIDs.json", "utf8", (err, data) => {
  if (err) {
    console.error("Fehler beim Lesen der Datei:", err);
    return;
  }

  const transformedData = JSON.parse(data);

  // Füge jedes Element der umgewandelten Daten in die MySQL-Tabelle ein
  transformedData.forEach((item) => {
    const { id, rezeptname } = item;

    // SQL-Query zum Einfügen der Daten
    connection.query(
      "INSERT INTO rezeptnames (id, rezeptname) VALUES (?, ?)",
      [id, JSON.stringify(rezeptname)],
      (err, result) => {
        if (err) {
          console.error("Fehler beim Einfügen der Daten für ID " + id, err);
          return;
        }
        console.log(`Daten für ID ${id} erfolgreich eingefügt.`);
      }
    );
  });

  // Verbindung schließen, nachdem alle Daten eingefügt wurden
  connection.end();
});
