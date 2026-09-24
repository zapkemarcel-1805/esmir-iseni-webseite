# ESMIR ISENI – aktueller Stand

Diese Version enthält bereits:

- echtes ESMIR-ISENI-Logo aus der Visitenkarte
- VW Golf 8 GTI Clubsport als aktuell einziges Mietfahrzeug
- echte GTI-Fotos und mobile Bildergalerie / Lightbox
- Mietkonditionen: 300 PS, DSG, ab 199 € inkl. 200 km, Wochenende 349 € inkl. 500 km
- Kautionshinweis und Fahrgebiet Deutschland
- Startseite auf den aktuellen GTI angepasst
- Öffnungszeiten Montag bis Samstag 10:00-18:00 Uhr, Sonntag geschlossen
- Sonntag im Terminkalender gesperrt
- serverseitige Prüfung der Buchungszeiten ergänzt
- Datenschutz-Zustimmung im Anfrageformular ergänzt
- Resend-Feld `reply_to` korrigiert
- Terminbestätigung/Ablehnung zeigt korrekt an, wenn Kunden-E-Mail nicht versendet wurde

## Lokal starten

Im Projektordner in PowerShell:

```powershell
npm install
npm run dev
```

Danach im Browser:

http://localhost:3000

## Noch offen vor Veröffentlichung

1. Supabase-Projekt anlegen und `supabase/schema.sql` ausführen.
2. Resend bzw. eine verifizierte Absenderdomain einrichten.
3. `.env.local` aus `.env.example` erstellen und echte Zugangsdaten nur dort hinterlegen.
4. Buchungssystem Ende-zu-Ende testen.
5. Impressum und Datenschutzerklärung mit den tatsächlich verwendeten Diensten vervollständigen/rechtlich prüfen.
6. Optional: tatsächliches Baujahr des GTI ergänzen, sobald es sicher bekannt ist.
7. Next.js/ESLint-Pakete vor Veröffentlichung auf eine aktuelle gepatchte Version aktualisieren und anschließend `npm run build` ausführen.

## Prüfungen dieser Version

- `npx tsc --noEmit`: erfolgreich
- `npm run lint`: erfolgreich

Ein vollständiger Next.js-Build konnte in der Bearbeitungsumgebung nicht abgeschlossen werden, weil das für Linux benötigte SWC-Paket nicht aus dem npm-Registry heruntergeladen werden konnte. Auf dem lokalen Windows-Rechner bitte nach `npm install` zusätzlich `npm run build` testen.
