# PROJ-28 - Mobile-first Produktstruktur, Team und Zusagen

## Status

Done

## Prioritaet

P1

## Ziel

Leaderjournal wird von einer breiten Dashboard-Navigation zu einem mobilen
Leadership-Trainingssystem mit fuenf Hauptbereichen weiterentwickelt:
Heute, Training, Log, Journal und Team.

## Nutzerwert

Nutzer koennen taeglich schneller handeln: Situation loggen, Training anwenden,
abends reflektieren, Zusagen nachhalten und Team-Kontext behalten.

## Scope

- Mobile Bottom Navigation mit maximal fuenf Hauptbereichen
- schlanke Desktop-Rail mit denselben fuenf Hauptbereichen
- Avatar-Menue fuer Profil, Einstellungen, Datenschutz, API-Key, Darstellung
  und Reminder
- Heute-Screen als Tageshub
- Training mit Plan, Werkzeugen und Fortschritt als Unterbereiche
- Log als schneller Voice/Text-Flow
- Journal mit vier Kernfragen
- Team-Bereich mit Mitarbeiterprofil, Gespraechen, Wahrnehmung, Zusagen und
  Mustern
- systemweite Zusagen in Heute, Journal und Team sichtbar
- AI-Ausgabeformate und Fallbacks fuer Log, Journal und Team
- Supabase-Schema mit RLS fuer Team, Journal, Zusagen und Training ergaenzen
- normale User-Flows ohne Mock-/Demo-/Dev-Sprache

## Out of Scope

- Kalenderintegration
- Push Notifications
- native App
- Mentor-Matching
- Zahlungsmodell
- vollstaendige Echtzeit-Synchronisation in allen Formularen
- heimliche Audioaufzeichnung von Gespraechen

## UX-Verhalten

Die App soll sich mobil wie ein fokussiertes taegliches Fuehrungswerkzeug
anfuehlen. Modelle sind Werkzeuge innerhalb von Training, Zusagen sind
kontextuell sichtbar, Profil und Einstellungen liegen im Avatar-Menue.

## Screens / Bereiche

- Heute
- Training
- Log
- Journal
- Team
- Profil/Einstellungen
- Onboarding

## Datenmodell

- profiles
- quick_logs
- journal_entries
- employees
- employee_conversations
- employee_perception_snapshots
- commitments
- training_items
- training_progress
- user_settings

Alle nutzerbezogenen Tabellen brauchen `user_id` und RLS.

## Validierung

- API-Key wird nicht in Supabase gespeichert.
- Mitarbeiterdaten sind subjektive Fuehrungsnotizen, keine Personalakte.
- Audio wird nur durch aktive Nutzeraktion verarbeitet.
- Ohne API-Key bleiben Log, Journal, Training und Team nutzbar.

## Akzeptanzkriterien

- [x] Es gibt maximal fuenf Hauptbereiche.
- [x] Mobile nutzt Bottom Navigation mit Heute, Training, Log, Journal, Team.
- [x] Profil/Einstellungen sind nicht mehr Haupttab.
- [x] Modelle liegen unter Training > Werkzeuge.
- [x] Zusagen erscheinen in Heute, Journal und Team.
- [x] Heute zeigt Trainingsfokus, Log-Einstieg, offene Zusagen, Abendreflexion
  und Wochenmuster.
- [x] Training fuehlt sich wie Leadership-Fitness an.
- [x] Log bietet Voice/Text und spaetere Reflexion.
- [x] Journal nutzt maximal vier Kernfragen.
- [x] Team-Bereich zeigt Mitarbeiter, Gespraeche, Wahrnehmung, Zusagen,
  Follow-ups und Muster.
- [x] Normale User-Flows zeigen keine Mock-/Demo-/Dev-Hinweise.
- [x] Lint und Build laufen erfolgreich.

## Edge Cases

- kein API-Key hinterlegt
- kein eingeloggter Account
- keine Mitarbeiter angelegt
- keine offenen Zusagen
- mobile Einhandbedienung
- alte URLs wie `/models` oder `/progress`

## Technische Notizen

- App Router bleibt erhalten.
- shadcn/ui-Komponenten werden weiterverwendet.
- Mock-/Seed-Daten bleiben getrennt in `src/data/`.
- Supabase-SQL wird in `docs/production/supabase-schema.sql` erweitert.

## QA-Checklist

- [x] Desktop geprueft
- [x] Mobile geprueft
- [x] Ladezustaende geprueft
- [x] Fehlerzustaende geprueft
- [x] Leerer Zustand geprueft
- [x] TypeScript geprueft
- [x] Lint geprueft
- [x] Build geprueft

## Implementierungsnotizen

- Navigation auf Heute, Training, Log, Journal und Team reduziert.
- Desktop-Rail und Mobile Bottom Navigation neu gebaut.
- Avatar-Menue fuer Profil/Einstellungen/API-Key/Datenschutz/Reminder gebaut.
- Heute, Training, Log, Journal, Team und Onboarding produktlogisch neu
  strukturiert.
- AI-Ausgabeformate und Fallbacks ergaenzt.
- Supabase-Schema fuer Team, Journal, Logs, Zusagen und Trainingsfortschritt
  erweitert.
- README und Feature-Index aktualisiert.

## Offene Punkte

- echte Supabase-Mutationen fuer alle Formulare final verdrahten
- Rechtsseiten vor breiter oeffentlicher Nutzung ergaenzen

## Aenderungsverlauf

- 2026-06-17 - Spec fuer mobile-first Produktstruktur erstellt.
- 2026-06-17 - Mobile-first Produktstruktur umgesetzt und geprueft.
