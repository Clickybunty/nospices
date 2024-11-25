// dotenv laden und konfigurieren
require('dotenv').config({ path: './zugangsdaten.env' });

const mysql = require('mysql');
const fs = require('fs');

/*try {
  const connection = mysql.createConnection({
      // ... connection details
  });
  // ... use the connection
} catch (error) {
  console.error('Error connecting to the database:', error);
  // Handle the error, e.g., log, notify, or retry
} */

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection({
  host: '18.194.88.143', //process.env.DB_HOST,
  port: '3306', //process.env.DB_PORT,
  user: 'root', //process.env.DB_USER,
  password: '0000', //process.env.DB_PASSWORD,
  database: 'ZutatenDB' //process.env.DB_NAME
});

// JSON-Daten einlesen
const data = JSON.parse(fs.readFileSync('ZutatenIDs.json', 'utf-8'));

// Die Daten in die Datenbank einfügen
Object.entries(data).forEach(([id, ids]) => {
  connection.query('INSERT INTO zutaten (id, ids) VALUES (?, ?)', [id, JSON.stringify(ids)], (err, result) => {
    if (err) throw err;
    console.log(`Daten für ID ${id} eingefügt`);
  });
});

connection.end();
