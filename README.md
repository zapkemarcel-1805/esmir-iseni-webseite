# ESMIR ISENI – Webseite mit Terminbuchungssystem

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Resend

## Inhalt

- 5 Hauptseiten (Start, Sportwagenvermietung, Autoaufbereitung, An- & Verkauf, Termin buchen)
- Impressum & Datenschutz (Vorbereitung, siehe Hinweise auf den Seiten)
- Echtes Terminanfragesystem: Formular → Datenbank → E-Mail an den Inhaber mit
  Bestätigen-/Ablehnen-Link → sichere Bestätigungsseite → E-Mail an den Kunden
- Zentrale Konfiguration in `config/business.ts` und `config/vehicles.ts`

---

## 1. Projekt lokal starten

Voraussetzung: [Node.js](https://nodejs.org) Version 18 oder neuer.

```bash
npm install
cp .env.example .env.local
# .env.local mit echten Werten befüllen (siehe Schritte 2–5)
npm run dev
```

Die Seite läuft danach unter `http://localhost:3000`.

---

## 2. Datenbank einrichten (Supabase)

1. Kostenloses Konto auf [supabase.com](https://supabase.com) anlegen, neues Projekt erstellen.
2. Im Supabase-Dashboard → **SQL Editor** → **New query** öffnen.
3. Inhalt der Datei `supabase/schema.sql` aus diesem Projekt hineinkopieren und ausführen.
   Damit wird die Tabelle `booking_requests` inklusive aller Sicherheitsmechanismen angelegt.
4. Unter **Project Settings → API** findest du:
   - `Project URL` → als `SUPABASE_URL` in `.env.local` eintragen
   - `service_role` Key (unter „Project API keys") → als `SUPABASE_SERVICE_ROLE_KEY` eintragen
   
   **Wichtig:** Der `service_role`-Key hat volle Datenbankrechte. Er wird ausschließlich
   serverseitig verwendet (API-Routen) und darf niemals im Browser sichtbar werden.

---

## 3. E-Mail-Versand einrichten (Resend)

1. Konto auf [resend.com](https://resend.com) anlegen.
2. Unter **API Keys** einen neuen Key erstellen → als `RESEND_API_KEY` in `.env.local` eintragen.
3. Unter **Domains** deine eigene Domain hinzufügen und die angezeigten DNS-Einträge
   (SPF/DKIM) bei deinem Domain-Anbieter setzen, bis der Status „Verified" ist.
   Ohne verifizierte Domain kannst du zunächst nur an deine eigene, bei Resend
   hinterlegte Test-Adresse senden.

---

## 4. Hotmail-Adresse als Empfänger hinterlegen

Deine Hotmail-Adresse `iseniesmir@hotmail.com` ist bereits als Standard-Empfänger
in `config/business.ts` hinterlegt und wird verwendet, sofern du in `.env.local`
keinen abweichenden Wert für `OWNER_NOTIFICATION_EMAIL` setzt.

---

## 5. Verifizierte Absenderadresse konfigurieren

**Wichtig:** Deine Hotmail-Adresse ist die *Empfänger*-Adresse für Terminanfragen.
Sie kann in der Regel **nicht** gleichzeitig als technische *Absender*-Adresse für
den automatischen Versand genutzt werden, da Resend eine verifizierte, selbst
kontrollierte Domain für den Versand verlangt (z. B. `termine@esmir-iseni.de`).

Trage die verifizierte Absenderadresse in `.env.local` unter `EMAIL_FROM` ein, z. B.:

```
EMAIL_FROM="ESMIR ISENI <termine@esmir-iseni.de>"
```

Solltest du (noch) keine eigene Domain besitzen, kannst du für erste Tests die von
Resend bereitgestellte Testadresse `onboarding@resend.dev` verwenden — diese ist
jedoch nicht für den produktiven Dauerbetrieb gedacht.

---

## 6. Benötigte Umgebungsvariablen (Übersicht)

Siehe `.env.example` für alle Variablen mit Erklärung:

| Variable | Zweck |
|---|---|
| `SUPABASE_URL` | Supabase-Projekt-URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Geheimer DB-Zugriffsschlüssel (nur serverseitig) |
| `RESEND_API_KEY` | API-Schlüssel für den E-Mail-Versand |
| `EMAIL_FROM` | Verifizierte technische Absenderadresse |
| `OWNER_NOTIFICATION_EMAIL` | Empfänger neuer Terminanfragen (Hotmail-Adresse) |
| `NEXT_PUBLIC_SITE_URL` | Öffentliche URL der Webseite (für Links in E-Mails) |

---

## 7. Vollständigen Buchungsablauf testen

1. `npm run dev` starten, `.env.local` vollständig befüllt.
2. Auf `/termin-buchen` eine Testanfrage mit deiner eigenen E-Mail-Adresse absenden.
3. Prüfen:
   - Wurde die Anfrage in der Supabase-Tabelle `booking_requests` mit Status `PENDING` gespeichert?
   - Ist eine E-Mail bei `OWNER_NOTIFICATION_EMAIL` angekommen (ggf. Spam-Ordner prüfen)?
   - Öffnet der „TERMIN BESTÄTIGEN"-Link die Bestätigungsseite, **ohne** den Status sofort zu ändern?
   - Ändert erst der Klick auf „Termin jetzt verbindlich bestätigen" den Status auf `CONFIRMED`?
   - Kommt die Bestätigungs-E-Mail beim Kunden an?
   - Funktioniert der Ablehnen-Link entsprechend mit Status `DECLINED`?
   - Lässt sich ein bereits entschiedener Link kein zweites Mal ausführen?
4. Für den Test von abgelaufenen Links kannst du testweise `TOKEN_TTL_HOURS` in
   `lib/tokens.ts` temporär auf einen sehr kleinen Wert setzen.

**Hinweis:** Da diese Implementierung ohne Zugriff auf eine echte Supabase-/Resend-
Umgebung erstellt wurde, konnte der End-to-End-Test nicht tatsächlich durchgeführt
werden. Bitte führe die obigen Schritte bei dir lokal mit echten Zugangsdaten durch.

---

## 8. Veröffentlichung über Vercel

1. Projekt in ein GitHub-Repository pushen.
2. Auf [vercel.com](https://vercel.com) einloggen → **New Project** → Repository auswählen.
3. Unter **Environment Variables** alle Variablen aus `.env.local` eintragen
   (inklusive `NEXT_PUBLIC_SITE_URL` mit der späteren echten Domain).
4. Deploy starten.

---

## 9. Fahrzeuge und Bilder später ergänzen

- Mietfahrzeuge: in `config/vehicles.ts` das Array `rentalVehicles` befüllen.
- Verkaufsfahrzeuge: dort das Array `saleVehicles` befüllen.
- Bilder: am einfachsten im `public/`-Ordner ablegen (z. B. `public/vehicles/…`)
  und im jeweiligen `images`-Array referenzieren, oder auf einen Bilder-Hosting-
  Dienst verlinken.
- Logo: Die aktuelle SVG-Rekonstruktion in `components/Logo.tsx` kann jederzeit
  durch deine Original-Logodatei ersetzt werden (z. B. als `public/logo.svg`
  und Einbindung per `<Image src="/logo.svg" ... />`).
- Öffnungstage: sobald feststehend, in `config/business.ts` unter
  `openingHours.days` eintragen und `isPlaceholder: false` setzen.

---

## 10. Eigene Domain verbinden

1. In Vercel → Projekt → **Settings → Domains** → Domain hinzufügen.
2. Bei deinem Domain-Anbieter die von Vercel angezeigten DNS-Einträge setzen.
3. `NEXT_PUBLIC_SITE_URL` in den Vercel-Umgebungsvariablen auf die finale Domain
   aktualisieren und neu deployen (wichtig für korrekte Bestätigungslinks in E-Mails).

---

## Rechtliches

`/impressum` und `/datenschutz` enthalten deutlich markierte Platzhalter
(gold hinterlegt) für Angaben, die vor Veröffentlichung ergänzt bzw. rechtlich
geprüft werden müssen. Es wurden bewusst keine Pflichtangaben erfunden.

## Sicherheitshinweise zum Buchungssystem

- Bestätigungs-/Ablehnungstokens werden nur gehasht (SHA-256) gespeichert.
- Der Linkaufruf allein ändert nichts — erst der aktive Klick auf der
  Bestätigungsseite löst den serverseitigen POST-Request aus.
- Status-Änderungen erfolgen atomar per bedingtem Datenbank-Update
  (`WHERE status = 'PENDING' AND token_hash = ...`), sodass ein Termin nicht
  doppelt bestätigt/abgelehnt werden kann.
- `/confirm/*` und `/decline/*` sind per `robots.ts` von der Indexierung ausgeschlossen.
- E-Mail-Versand mit automatischem Wiederholungsversuch (bis zu 3 Versuche).
- Einfaches IP-basiertes Rate-Limiting auf der Anfrage-API.
