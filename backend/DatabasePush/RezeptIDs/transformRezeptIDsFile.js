const fs = require('fs');

// Lese die ZutatenIDs.json-Datei ein
fs.readFile('RezeptIDs.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Fehler beim Lesen der Datei:', err);
    return;
  }

  // Umwandeln der JSON-Daten in ein Objekt
  const originalData = JSON.parse(data);

  // Funktion zur Umwandlung der Struktur
  const transformData = (data) => {
    const result = [];
    
    // Iteriere durch die ursprünglichen Daten und baue die neue Struktur
    for (const [id, rezeptname] of Object.entries(data)) {
      result.push({ id, rezeptname });
    }

    return result;
  };

  // Umgewandelte Daten
  const transformedData = transformData(originalData);

  // Schreibe die umgewandelte Struktur in eine neue Datei
  fs.writeFile('transformedRezeptIDs.json', JSON.stringify(transformedData, null, 2), (err) => {
    if (err) {
      console.error('Fehler beim Schreiben der Datei:', err);
      return;
    }
    console.log('Daten erfolgreich umgewandelt und in "transformedZutatenIDs.json" gespeichert.');
  });
});
