# NoSpieces - Dokumentation

## 🔏 License & Copyright

This work is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0)**.  
This means you are free to share and build upon this work, as long as you credit me as the author.

📜 [View License](https://creativecommons.org/licenses/by/4.0/)

---

## Projektübersicht

**NoSpieces** ist eine Anwendung, die Rezepte und deren Zutaten verwaltet. Die App enthält ein **Frontend**, das mit **React** entwickelt wurde, und ein **Backend**, das mit **Node.js** und **Express** aufgebaut ist. Die Daten werden in einer **MariaDB-Datenbank** gespeichert, die in **AWS** gehostet wird, um Skalierbarkeit und hohe Verfügbarkeit zu gewährleisten.

### Teammitglieder

- **Stevan (51)**
- **Markus (24/5)**
- **Stefan (24/5)**

---

# Die README-Datei richtet sich an Benutzer und Entwickler, die mit dem Code arbeiten möchten.

## Sie erklärt:

Voraussetzungen: Welche Software oder Pakete erforderlich sind.
Installation: Schritt-für-Schritt-Anleitung zur Einrichtung der Anwendung.
Ausführung: Anweisungen, wie der Code gestartet und verwendet wird.
Features: Eine Übersicht über die wichtigsten Funktionen der Anwendung.
Kontakt oder Beitragshinweise: Informationen, wie man bei Fragen oder zur Weiterentwicklung beitragen kann.

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

5.  ```bash
    npm install dotenv
    ```
6.  ```bash
    npm install react-world-flag
    ```
7.  ```bash
    npm install mysql
    ```
8.  ```bash
    npm install axios
    ```
9.
   ### Cockies
   ```bash
   npm install react-cookie-consent
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

## MySQL-Datenbank

Das Backend verwendet **MySQL** für die Speicherung von Zutaten-IDs und Rezeptdaten. 
Die Datenbank ist lokal installiert und beinhaltet Tabellen für Zutaten und Rezepte. 
Die Tabellenstruktur ist relational, wobei Zutaten durch eindeutige IDs referenziert werden.

### MySQL Setup

1. **Datenbank "zutaten_db" erstellen:**

   Melde dich in MySQL Workbench an und erstelle die Datenbank `zutaten_db`:

   ```sql
   CREATE DATABASE zutaten_db;
   USE zutaten_db;
   ```

2. **Tabelle "zutaten" erstellen:**

   Erstelle eine Tabelle für die Zutaten, die `id` und die zugehörigen `ids` speichert:

   ```sql
   CREATE TABLE zutaten (
     id VARCHAR(10) PRIMARY KEY,
     ids JSON
   );
   ```

3. **Daten einfügen:**

   Um Daten in die MySQL-Datenbank zu importieren, stelle sicher,
   dass das Skript `insertData.js` (wie im Backend beschrieben) ausgeführt wird,
   um die umgewandelte `transformedZutatenIDs.json` in die Tabelle `zutaten` einzufügen.

4. **Tabelle "multilanguage" erstellen:**

   Erstelle eine Tabelle multilanguage, Die SQL-Tabelle multilanguage muss wie folgt definiert sein:
   
   ```sql
   CREATE TABLE multilanguage (
     id INT NOT NULL,
     land VARCHAR(10) NOT NULL,
     zutat VARCHAR(255) NOT NULL,
     PRIMARY KEY (id, land) -- Optional, wenn Kombination eindeutig sein soll
   );
   ```
5. **Daten einfügen:**

   Um Daten in die MySQL-Datenbank zu importieren, stelle sicher,
   dass das Skript `insertZutatenMultiLanguageData.js` (wie im Backend beschrieben) ausgeführt wird,
   um die umgewandelte `transformedZutatenMultiLanguageFile.json` in die Tabelle `multilanguage` einzufügen.

6. **Tabelle "rezeptnames" erstellen:**

   Erstelle eine Tabelle für die Rezeptnamen, die `id` und die zugehörigen `rezeptname` speichert:

   ```sql
   CREATE TABLE rezeptnames (
     id VARCHAR(10) PRIMARY KEY,
     ids JSON
   );
   ```

7. **Daten einfügen:**

   Um Daten in die MySQL-Datenbank zu importieren, stelle sicher,
   dass das Skript `insertRezeptIDs.js` (wie im Backend beschrieben) ausgeführt wird,
   um die umgewandelte `transformedRezeptIDs.json` in die Tabelle `rezeptnames` einzufügen.

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

## Änderungen am Backend

### MySQL-Datenbank

Der Wechsel von MongoDB zu **MySQL** wurde durchgeführt, um die Anwendung stabiler zu gestalten und auf relationalen Datenbanken zu basieren. Dies beinhaltet:

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

Die Backend-APIs wurden erweitert, um die neuen relationalen Datenstrukturen zu unterstützen. Insbesondere wurden Endpoints für das Abrufen von Rezepten und Zutaten sowie für die Manipulation der Daten in der MySQL-Datenbank implementiert.

##

### GitHub eine ASCII-Darstellung

**Branch-Struktur**:

```
main
├── Testing
│ ├── WorkBranch
│ │ ├── TaskBranch1
│ │ ├── TaskBranch2
│ │ ├── TaskBranch3
│ │ └── TaskBranchN
│ └── FeatureBranch
└── HotfixBranch
```

## Erklärung:

main: Der Hauptzweig

Testing: Ein Zweig, der vom main-Branch ausgeht.

WorkBranch: Ein Unterzweig von Testing, der als Basis für spezifische Aufgaben dient.

TaskBranch1, TaskBranch2, ...: Branches, die von WorkBranch abzweigen und jeweils eine spezifische Aufgabe repräsentieren.

FeatureBranch & HotfixBranch: Zusätzliche Branches für Features oder Hotfixes, die parallel entwickelt werden.


## DARK MODE "like a vader"

 Der Dark Mode funktioniert, 
 indem das Design in der Anwendung zwischen zwei Farbschemata wechselt: hell (Light Mode) und 
 dunkel (Dark Mode). 
 Dabei kommen CSS-Variablen ins Spiel, 
 die zentrale Farben wie den Hintergrund, 
 den Text oder Ränder definieren. Diese Variablen ändern ihre Werte, 
 wenn der Dark Mode aktiviert wird.

 Der Wechsel erfolgt, 
 indem ein data-theme-Attribut (z. B. auf dem <html>-Element) gesetzt wird. 
 Wenn dieses Attribut dark ist, 
 werden die Dark Mode-Farben 
 (z. B. ein dunkler Hintergrund und helle Schrift) 
 aus den CSS-Variablen geladen. 
 So passt sich das gesamte Design dynamisch an, 
 ohne die HTML- oder CSS-Struktur zu ändern.


## Domainerwerb
### NoSpices.de und NoSpices.com

   Die Domains NoSpices.de und 
   NoSpices.com wurden über den Anbieter Strato.de erworben. 
   Strato bietet eine benutzerfreundliche Plattform für die Domainregistrierung sowie umfassende Verwaltungsoptionen für DNS-Einstellungen, 
   die in diesem Projekt genutzt werden.

   Beide Domains werden für das Hosting der Webseite verwendet, 
   die auf AWS betrieben wird. 
   Die DNS-Konfiguration wurde entsprechend angepasst, 
   um eine problemlose Verbindung zur AWS-Infrastruktur zu gewährleisten.


## Zählen der geschriebenen JavaScript- und JSX-Zeilen

Um die Anzahl der geschriebenen `.js`- und `.jsx`-Dateien in einem Verzeichnis (wo der `.git`-Ordner liegt) zu ermitteln, kann folgender Befehl in der Bash-Konsole ausgeführt werden:


```Bash
    git log --author="Clickybunty" --pretty=tformat: --numstat | grep -E "\.js$|\.jsx$" | awk '{add+=$1; del+=$2} END {print "Hinzugefügte Zeilen: ", add, "\nEntfernte Zeilen: ", del, "\nNetto Zeilen: ", add-del}'
```

Beschreibung
find .: Durchsucht das aktuelle Verzeichnis und dessen Unterverzeichnisse.
-type f: Sucht nur nach Dateien.
-name "*.js" -o -name "*.jsx": Filtert nach Dateien mit den Endungen .js und .jsx.
-exec wc -l {} +: Führt den wc -l-Befehl aus, um die Zeilenanzahl jeder Datei zu zählen.
awk: Summiert alle Zeilen und gibt das Gesamtergebnis aus.

   





