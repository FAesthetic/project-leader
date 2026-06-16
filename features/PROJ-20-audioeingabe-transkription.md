# PROJ-20 – Audioeingabe und Transkription

## Status

Done

## Priorität

P1

## Ziel

Quick Logs und Journal-Einträge per Sprache erfassen und direkt in brauchbare Leadership-Notizen verdichten.

## Nutzerwert

Führungssituationen passieren oft zwischen Terminen. Audioeingabe senkt die Hürde, eine Situation festzuhalten, bevor Details verloren gehen.

## User Stories

- Als Nutzer möchte ich eine Führungssituation einsprechen, damit ich sie schnell festhalten kann.
- Als Nutzer möchte ich eine Abendreflexion frei einsprechen, damit ich nicht vor einem leeren Textfeld sitze.
- Als Nutzer möchte ich aus Audio eine kurze Zusammenfassung erhalten, damit daraus ein nächster Führungsimpuls entsteht.

## Scope

- Browser-Aufnahme über Mikrofonberechtigung
- Audioeingabe im Quick Log
- Audioeingabe im Journal
- Serverseitige Route für Transkription
- OpenAI Speech-to-Text
- OpenAI-Zusammenfassung für Leadership-Kontext
- Rohtranskript sichtbar machen
- Keine Speicherung der Audiodatei im MVP

## Out of Scope

- Realtime-Streaming
- Spracheingabe auf jedem Feld
- Speicherung von Audio-Dateien
- Supabase-Persistenz
- Sprechertrennung
- Kalenderintegration
- Push Notifications

## UX-Verhalten

Die Aufnahme muss klar zeigen, ob gerade aufgenommen oder verarbeitet wird. Die App darf Audio nicht heimlich senden. Ohne API Key oder Mikrofonfreigabe erscheint ein klarer Fehlerzustand.

## Screens / Bereiche

- Quick Log
- Journal
- API Route `/api/audio/transcribe`

## Datenmodell

Im MVP keine Persistenz.

Verarbeitet werden temporär:

- Audiodatei
- Transkript
- bereinigte Notiz
- Leadership-Signal
- nächster Schritt
- Reflexionsfrage
- Tags

## Validierung

- Audiodatei muss vorhanden sein.
- Audiodatei darf maximal 25 MB groß sein.
- Nur unterstützte Audioformate werden akzeptiert.
- `OPENAI_API_KEY` muss serverseitig vorhanden sein.

## Akzeptanzkriterien

- [x] Quick Log kann Audio aufnehmen.
- [x] Journal kann Audio aufnehmen.
- [x] Audio wird an eine serverseitige Route gesendet.
- [x] API Key bleibt serverseitig.
- [x] Transkript wird sichtbar gemacht.
- [x] Zusammenfassung wird in das Textfeld übernommen.
- [x] Keine Audio-Datei wird gespeichert.
- [x] Fehlerzustände sind verständlich.
- [x] `npm run lint` erfolgreich.
- [x] `npm run build` erfolgreich.

## Edge Cases

- Nutzer verweigert Mikrofonzugriff.
- Browser unterstützt `MediaRecorder` nicht.
- Aufnahme ist leer.
- OpenAI API Key fehlt.
- Transkription klappt, Zusammenfassung schlägt fehl.
- Audiodatei ist zu groß.

## Technische Notizen

- UI-Komponente: `src/components/audio/voice-textarea.tsx`
- API Route: `src/app/api/audio/transcribe/route.ts`
- Typen: `src/types/audio.ts`
- Env:
  - `OPENAI_API_KEY`
  - `OPENAI_TRANSCRIBE_MODEL`
  - `OPENAI_SUMMARY_MODEL`

## QA-Checklist

- [ ] Desktop visuell im Browser geprüft
- [ ] Mobile visuell im Browser geprüft
- [ ] Mikrofonaufnahme manuell geprüft
- [x] Fehlerzustand ohne API Key vorgesehen
- [x] TypeScript geprüft
- [x] Lint geprüft
- [x] Build geprüft

## Implementierungsnotizen

- Request-basierte Audioverarbeitung statt Realtime umgesetzt.
- Quick Log und Journal nutzen dieselbe Audio-Komponente.
- OpenAI-Transkription und Zusammenfassung laufen ausschließlich serverseitig.
- Zusammenfassung ist auf Leadership-Notizen, Muster, nächsten Schritt und Reflexionsfrage zugeschnitten.

## Offene Punkte

- Nach Supabase-Anbindung Transkripte und Zusammenfassungen nutzerbezogen speichern.
- Datenschutztext vor öffentlichem Launch ergänzen.
- Optional später Realtime-Transkription prüfen.
- Optional später systemische Reflexion ebenfalls direkt mit Audio starten.

## Änderungsverlauf

- 2026-06-16 – Feature-Spec erstellt und MVP-Audioeingabe umgesetzt
