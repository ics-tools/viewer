# ICS-Viewer

Dieses Projekt ist eine Webanwendung, die technische Kalenderdateien im iCalendar-Format (ICS-Dateien) einliest und diese in einem Kalender anzeigt. Die Anwendung verarbeitet die ICS-Dateien vollständig lokal, ohne dass die Daten an einen Server gesendet werden.

Die Webseite ist unter folgender URL erreichbar: https://viewer.ics.tools/

## Verwendung

Um diese Anwendung zu verwenden, öffnen Sie die [Webseite](https://viewer.ics.tools/) in einem Webbrowser Ihrer Wahl. Sie können dann einzelne oder mehrere ICS-Dateien auswählen und sie werden in einem Kalender dargestellt. Sie können zwischen verschiedenen Ansichten des Kalenders wählen, um eine Tages-, Wochen- oder Monatsansicht zu sehen.

## ICS-Dateien

ICS steht für iCalendar, ein Standardformat für den Austausch von Kalenderdaten zwischen verschiedenen Anwendungen. Eine ICS-Datei enthält Termine und Ereignisse sowie Informationen wie den Namen des Ereignisses, den Ort, die Zeit und die Dauer. ICS-Dateien können auch wiederkehrende Ereignisse enthalten, die an bestimmten Tagen oder in bestimmten Intervallen stattfinden. ICS-Dateien können in verschiedenen Anwendungen verwendet werden, wie zum Beispiel in Microsoft Outlook, Apple iCal oder Google Kalender.

## Abhängigkeiten

Das Projekt nutzt folgende wichtige Abhängigkeiten:

- [Bootstrap](https://getbootstrap.com/): Ein CSS-Framework zum schnellen Entwickeln von responsiven Webseiten.
- [FullCalendar](https://fullcalendar.io/): Eine JavaScript-Bibliothek zum Erstellen von interaktiven Kalendern.

## Verwendete Technologien

Das Projekt basiert auf folgenden Technologien:

- HTML
- CSS
- TypeScript
- Webpack

## Lokales Bauen des Projekts

Um das Projekt lokal zu bauen, müssen die folgenden Schritte ausgeführt werden:

1. Stellen Sie sicher, dass Node.js auf Ihrem Computer installiert ist.
2. Öffnen Sie ein Terminal oder eine Befehlszeile im Hauptverzeichnis des Projekts.
3. Führen Sie den Befehl `npm install` aus, um die Abhängigkeiten des Projekts zu installieren.
4. Führen Sie den Befehl `npm run build` aus, um das Projekt zu bauen.
5. Das gebaute Projekt befindet sich nun im `dist`-Verzeichnis.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen zur Lizenzierung finden Sie in der Datei `LICENSE`.
