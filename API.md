## 1. Ein Google Cloud-Konto einrichten
Besuchen Sie die Google Cloud Console.
Melden Sie sich mit Ihrem Google-Konto an.
Falls Sie noch kein Google-Konto haben, erstellen Sie eins.
## 2. Ein neues Projekt erstellen
Klicken Sie oben links auf das Menü (drei Striche) und wählen Sie APIs & Dienste > Bibliothek.
Klicken Sie oben in der Leiste auf das Dropdown-Menü für Projekte und wählen Sie Neues Projekt.
Geben Sie Ihrem Projekt einen Namen (z. B. "YouTube Suche").
Klicken Sie auf Erstellen.
Warten Sie, bis das Projekt erstellt wurde (oben rechts erscheint eine Benachrichtigung).
## 3. Die YouTube Data API v3 aktivieren
Stellen Sie sicher, dass das richtige Projekt oben in der Leiste ausgewählt ist.
Gehen Sie zu APIs & Dienste > Bibliothek.
Suchen Sie nach YouTube Data API v3 in der Suchleiste.
Klicken Sie auf die API und dann auf Aktivieren.
Sie werden auf eine Übersichtsseite weitergeleitet, auf der die API aktiviert wird.
## 4. Einen API-Schlüssel erstellen
Gehen Sie zu APIs & Dienste > Anmeldedaten (Credentials).
Klicken Sie auf Anmeldedaten erstellen > API-Schlüssel.
Ein API-Schlüssel wird generiert und angezeigt. Kopieren Sie ihn, um ihn später zu verwenden.
Optional: Klicken Sie auf Schlüssel bearbeiten, um Einschränkungen festzulegen:
API-Einschränkungen:
Wählen Sie YouTube Data API v3.
IP-Beschränkungen (optional, für Backend):
Wenn Sie den Schlüssel nur von bestimmten Servern aus verwenden möchten, geben Sie deren IP-Adressen ein.
## 5. API-Kontingente prüfen
Gehen Sie zu APIs & Dienste > Dashboard.
Wählen Sie die YouTube Data API v3 aus.
Prüfen Sie die Kontingente:
Standardmäßig haben Sie 10.000 Einheiten/Tag.
Eine einfache Suchabfrage (search) kostet 100 Einheiten.
## 6. Schlüssel im Projekt verwenden
Fügen Sie den generierten API-Schlüssel in Ihrem Code ein:
javascript
Code kopieren
const YOUTUBE_API_KEY = "Ihr_API_Schlüssel"; // Kopieren Sie den Schlüssel hierher
## 7. Testen des API-Schlüssels
Führen Sie eine Beispielanfrage mit curl oder Postman aus:

Mit curl:
bash
Code kopieren
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Pizza&key=IHR_API_SCHLÜSSEL&type=video&maxResults=1"
## Mit Postman:
Erstellen Sie eine neue GET-Anfrage.
URL: 

  ```Nash
    https://www.googleapis.com/youtube/v3/search
  ```



Parameter:
part=snippet
q=Pizza
key=IHR_API_SCHLÜSSEL
type=video
maxResults=1
Senden Sie die Anfrage.
## 8. Probleme beheben
Falls Sie auf Probleme stoßen:

Prüfen Sie, ob der Schlüssel korrekt ist.
Stellen Sie sicher, dass die API aktiviert ist.
Prüfen Sie, ob Sie das tägliche Kontingent überschritten haben.
