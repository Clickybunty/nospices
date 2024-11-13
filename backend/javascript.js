// dotenv laden und konfigurieren
require('dotenv').config({ path: './zugangsdaten.env' });

const mysql = require('mysql');
const fs = require('fs');

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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
