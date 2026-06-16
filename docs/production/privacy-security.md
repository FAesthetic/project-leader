# Privacy & Security – Project Leadership

Project Leadership verarbeitet sensible persönliche und berufliche Reflexionsdaten.

Dieses Dokument beschreibt Datenschutz- und Sicherheitsgrundsätze für Entwicklung und späteren Betrieb.

---

## 1. Datenarten

Die App kann folgende Daten verarbeiten:

- Name
- Alter
- Rolle
- Branche
- Teamgröße
- Führungserfahrung
- Karriereziele
- Entwicklungsfelder
- Stärken
- Stressauslöser
- Morgen-Check-ins
- Energielevel
- Stresslevel
- Quick Logs
- Audioaufnahmen für Transkription
- Transkripte
- Abendreflexionen
- KI-Feedback
- geplante Führungssituationen
- Einstellungen

Diese Daten können persönlich, beruflich und emotional sensibel sein.

---

## 2. Grundsätze

Project Leadership soll nach diesen Prinzipien gebaut werden:

- Datenminimierung
- Zweckbindung
- klare Nutzertrennung
- keine unnötigen Analytics
- keine sensiblen Daten in Logs
- keine API Keys im Frontend
- keine öffentlichen Journal-Daten
- KI-Anfragen nur mit notwendigen Informationen
- Audio nur bewusst nach Nutzeraktion übertragen
- Audio im MVP nicht speichern
- Export und Löschung später vorbereiten

---

## 3. Supabase Security

Alle nutzerbezogenen Tabellen brauchen:

- `user_id`
- Row Level Security
- Policies, die Zugriff nur auf eigene Daten erlauben

Beispiel-Prinzip:

```txt
Ein Nutzer darf nur Datensätze lesen, erstellen, ändern und löschen,
bei denen user_id = auth.uid().
```

Keine privaten Nutzerdaten dürfen öffentlich lesbar sein.

---

## 4. API Keys und Secrets

Regeln:

- Keine API Keys hardcoden.
- `.env.local` nutzen.
- `.env.local` nicht committen.
- `.env.example` ohne echte Werte pflegen.
- `SUPABASE_SERVICE_ROLE_KEY` niemals im Client verwenden.
- AI API Keys nur serverseitig verwenden.

---

## 5. Logging

Nicht loggen:

- komplette Journal-Einträge
- private Reflexionen
- Namen anderer Personen aus Quick Logs
- API Keys
- komplette KI-Prompts mit sensiblen Daten
- Auth Tokens

Erlaubt:

- technische Fehler ohne private Inhalte
- generische Event-Informationen
- Performance-Metriken ohne personenbezogene Inhalte

---

## 6. KI-Datenverarbeitung

Die App nutzt KI für:

- Audio-Transkription
- Entwicklungsprofil
- Trainingsplan
- Abendfeedback
- Modell-Empfehlungen
- systemische Reflexion

Regeln:

- Nur notwendige Daten an KI senden.
- Audioaufnahmen nur senden, wenn der Nutzer die Aufnahme aktiv startet und stoppt.
- Audiodateien im MVP nicht dauerhaft speichern.
- Keine unnötige Historie senden.
- Lange Kontexte zusammenfassen.
- KI-Antworten speichern, damit nicht dieselbe Analyse mehrfach bezahlt und übertragen wird.
- Nutzer nicht glauben lassen, dass KI unfehlbar ist.
- Keine medizinischen oder psychologischen Diagnosen erzeugen.

Die KI ist:

> Sparringspartner, nicht Therapeut.

---

## 7. Sensible Inhalte

Die App darf Nutzer bei Stress und Reflexion unterstützen, aber sie ist keine medizinische oder therapeutische Anwendung.

Keine Aussagen wie:

- „Du hast Burnout.“
- „Du hast eine Depression.“
- „Du brauchst Therapie.“
- „Das ist eine psychische Störung.“

Besser:

- „Deine Einträge zeigen erhöhte Belastung.“
- „Es könnte sinnvoll sein, Belastung aktiv zu reduzieren.“
- „Wenn du dauerhaft stark belastet bist, sprich mit einer geeigneten Fachperson.“

---

## 8. Datenschutzseiten für später

Vor öffentlichem Launch vorbereiten:

- Impressum
- Datenschutzerklärung
- Nutzungsbedingungen
- Cookie-/Tracking-Hinweise, falls relevant
- Datenexport
- Account löschen
- Daten löschen

---

## 9. Analytics

Im MVP möglichst keine Analytics.

Wenn später Analytics genutzt werden:

- datensparsam
- keine Journal-Inhalte
- keine Quick-Log-Inhalte
- keine personenbezogenen Freitexte
- nur aggregierte Produktnutzung

---

## 10. Datenexport und Löschung

Später wichtig:

Nutzer soll können:

- eigene Daten exportieren
- Account löschen
- Journal-Einträge löschen
- Quick Logs löschen
- KI-Feedback löschen

Diese Funktionen müssen nicht direkt im MVP fertig sein, aber das Datenmodell soll sie ermöglichen.

---

## 11. Sicherheits-Checkliste vor öffentlichem Launch

- [ ] RLS für alle nutzerbezogenen Tabellen aktiv
- [ ] Policies getestet
- [ ] keine Secrets im Client
- [ ] keine Secrets im Git-Verlauf
- [ ] `.env.example` gepflegt
- [ ] keine sensiblen Daten in Logs
- [ ] Auth-Flows geprüft
- [ ] Fehlerseiten ohne sensible Details
- [ ] Datenschutzseite vorhanden
- [ ] Impressum vorhanden
- [ ] Account-Löschung geplant oder umgesetzt
- [ ] Datenexport geplant oder umgesetzt
- [ ] AI-Prompts auf Datenminimierung geprüft

---

## 12. Entwicklungsregel

Wenn ein Feature neue persönliche Daten speichert oder an KI sendet, muss die Feature-Spec beantworten:

1. Welche Daten werden gespeichert?
2. Warum werden sie gespeichert?
3. Wo werden sie gespeichert?
4. Wer darf sie lesen?
5. Werden sie an KI gesendet?
6. Können sie später gelöscht/exportiert werden?
