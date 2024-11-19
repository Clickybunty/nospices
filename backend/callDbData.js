const mysql = require('mysql');

// MySQL-Verbindung einrichten
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'zutaten_db',
  port: 3306,
});

// Funktion zum Abrufen aller Zutaten
const getAllZutaten = (callback) => {
  const query = 'SELECT * FROM zutaten';
  pool.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Funktion zum Abrufen einer Zutat basierend auf der ID
const getZutatById = (id, callback) => {
  const query = 'SELECT * FROM zutaten WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getAllRezepte = (callback) => {
  const query = 'SELECT id, name, youtube_link, chefkoch_link FROM rezepte';
  pool.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getRezeptById = (id, callback) => {
  const query = 'SELECT id, name, youtube_link, chefkoch_link FROM rezepte WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]); // Nur ein Rezept zurückgeben
  });
};

module.exports = { getAllRezepte, getRezeptById };


// Exportiere die Funktionen
module.exports = {
  getAllZutaten,
  getZutatById,
};
