Hallo!
Willkommen zu NoSpieces

Team Stevan 51, Markus 24/5 und Stefan 24/5

Frontend

cd nospicesfrontend
npx create-react-app nospices
npm install axios

npm start

Backend

cd backend
npm init -y
npm install express cors
npm install nodemon
node index.js
oder
npm run dev



Hier ist die aktualisierte Dokumentation für dein Projekt, die die aktuellen Änderungen und Entwicklungen widerspiegelt:

---

# NoSpieces - Dokumentation

## Projektübersicht

**NoSpieces** ist eine Anwendung, die Rezepte und deren Zutaten verwaltet. Die App enthält ein **Frontend**, das mit **React** entwickelt wurde, und ein **Backend**, das mit **Node.js** und **Express** aufgebaut ist. Die Daten werden in einer **MariaDB-Datenbank** gespeichert, die in **AWS** gehostet wird, um Skalierbarkeit und hohe Verfügbarkeit zu gewährleisten.

### Teammitglieder
- **Stevan (51)**
- **Markus (24/5)**
- **Stefan (24/5)**

---

## Architektur

### Frontend (React)

Das Frontend ist mit React entwickelt, um eine benutzerfreundliche Oberfläche zu bieten. Es kommuniziert mit dem Backend über HTTP-Anfragen, um Rezepte und Zutaten anzuzeigen und zu verwalten.

#### Installationsanweisungen:
1. Navigiere ins Frontend-Verzeichnis:
   ```bash
   cd nospicesfrontend
   ```
2. Erstelle die React-App:
   ```bash
   npx create-react-app nospices
   ```
3. Installiere Axios für die HTTP-Kommunikation:
   ```bash
   npm install axios
   ```
4. Starte die Entwicklungsversion:
   ```bash
   npm start
   ```

#### Weitere Abhängigkeiten:
```bash
npm install dotenv
npm install react-world-flag
npm install mysql
npm install axios
```

---

### Backend (Node.js mit Express)

Das Backend stellt APIs zur Verfügung, um Rezepte und Zutaten zu verwalten und mit der Datenbank zu kommunizieren.

#### Installationsanweisungen:
1. Navigiere ins Backend-Verzeichnis:
   ```bash
   cd backend
   ```
2. Initialisiere das Node.js-Projekt:
   ```bash
   npm init -y
   ```
3. Installiere die erforderlichen Abhängigkeiten:
   ```bash
   npm install express cors
   npm install nodemon
   ```
4. Starte den Server:
   ```bash
   node index.js
   ```
   oder für den Entwicklungsmodus:
   ```bash
   npm run dev
   ```

---

## Datenmodell

### Rezepte
Die Rezepte sind in einem relationalen Datenmodell gespeichert. Jedes Rezept hat eine eindeutige ID und einen Namen.

**Beispiel**:
```json
{
  "Spaghetti Carbonara": "0001"
}
```

### Zutaten
Die Zutaten sind ebenfalls relational gespeichert und über eine eindeutige ID referenziert.

**Beispiel**:
```json
{
  "0001": [6002, 5001, 1002, 9002]
}
```
Die Zahlensequenzen (z. B. 6002, 5001, etc.) repräsentieren die IDs der Zutaten, die für das Rezept benötigt werden.

---

## MariaDB-Datenbank in AWS

Die Anwendung nutzt **MariaDB** für die Speicherung von Rezepten, Zutaten und anderen relevanten Daten. Die Datenbank wird in **AWS** gehostet.

#### MariaDB Setup:
1. Erstellen Sie ein MariaDB-Cluster auf **MariaDB Atlas** oder einer anderen MariaDB-Instanz.
2. Konfigurieren Sie den Cluster und generieren Sie eine Verbindung-URI.
3. Fügen Sie diese URI in der Backend-Anwendung ein, um die Verbindung zur MariaDB-Datenbank herzustellen.

### Datenbankstruktur:
- **Rezepte**: Eine Sammlung von Rezepten, wobei jedes Rezept eine Referenz zu den benötigten Zutaten hat.
- **Zutaten**: Eine Sammlung von Zutaten, die durch eine eindeutige ID identifiziert werden.

---

## Änderungen am Frontend

Im Frontend wurden mehrere Anpassungen vorgenommen, um die Benutzererfahrung zu verbessern:
- **Zentrierte Ausrichtung** der Eingabemaske und der Auswahlbox.
- Beim Eingeben einer Zutat werden **passende Vorschläge** aus der Auswahlbox angezeigt.
- **Ausgewählte Zutaten** werden unterhalb der Eingabemaske angezeigt und gleichzeitig nicht von der Auswahlbox verdeckt.

---

## Änderungen am Backend

### MySQL-Datenbank
Der Wechsel von MongoDB zu **MariaDB** wurde durchgeführt, um die Anwendung stabiler zu gestalten und auf relationalen Datenbanken zu basieren. Dies beinhaltet:
- Datenbankstruktur für Rezepte und Zutaten.
- Skripte für die **Datenmigration** und **Datenformat-Transformation**.

**Beispiel-Datenformat für Zutaten**:
```json
{
  "id": "0001",
  "ids": [2005, 5005, 1002]
}
```

### Backend-APIs
Die Backend-APIs wurden erweitert, um die neuen relationalen Datenstrukturen zu unterstützen. Insbesondere wurden Endpoints für das Abrufen von Rezepten und Zutaten sowie für die Manipulation der Daten in der MariaDB-Datenbank implementiert.

---

## Probleme und Lösungen

Während der Entwicklung gab es Herausforderungen beim **Mergen** der Branches, die als Bug identifiziert und behoben wurden. Alle Synchronisationen sind nun korrekt angepasst, und der Code befindet sich auf dem neuesten Stand.

---

## Kommende Schritte
1. **Backend-Optimierungen**: Implementierung zusätzlicher Endpoints für das Bearbeiten und Löschen von Rezepten und Zutaten.
2. **Deployment**: Fertigstellung der Bereitstellung auf AWS, sowohl für das Backend als auch für die Datenbank.
3. **Weitere Features im Frontend**: Erweiterung des Frontends um zusätzliche Funktionen wie Rezeptbewertungen, Benutzerprofile und Favoriten.

---

Diese Dokumentation stellt den aktuellen Stand des Projekts dar und wird regelmäßig aktualisiert, um neue Änderungen und Fortschritte widerzuspiegeln.

---
