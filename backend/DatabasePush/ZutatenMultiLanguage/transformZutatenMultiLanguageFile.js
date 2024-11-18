const fs = require("fs");

// Lese die JSON-Datei ein
fs.readFile("zutaten.json", "utf8", (err, data) => {
  if (err) {
    console.error("Fehler beim Lesen der Datei:", err);
    return;
  }

  // Umwandeln der JSON-Daten in ein Objekt
  const originalData = JSON.parse(data);

  // Funktion zur Umwandlung der Struktur
  const transformData = (data) => {
    const result = [];

    // Iteriere durch die ursprünglichen Daten
    for (const [id, translations] of Object.entries(data)) {
      for (const [land, zutat] of Object.entries(translations)) {
        result.push({
          id, // Ursprüngliche ID beibehalten
          land, // Sprachcode
          zutat, // Übersetzung der Zutat
        });
      }
    }

    return result;
  };

  // Umgewandelte Daten
  const transformedData = transformData(originalData);

  // Schreibe die umgewandelte Struktur in eine neue Datei
  fs.writeFile(
    "transformedZutatenMultiLanguageFile.json",
    JSON.stringify(transformedData, null, 2),
    (err) => {
      if (err) {
        console.error("Fehler beim Schreiben der Datei:", err);
        return;
      }
      console.log(
        'Daten erfolgreich umgewandelt und in "transformedZutatenMultiLanguageFile.json" gespeichert.'
      );
    }
  );
});
