# PROJ-2 – Startprofil / Onboarding

## Status

Done

## Priorität

P0

## Ziel

Ein rollen- und branchenneutrales Startprofil vorbereiten, das später die Grundlage für Entwicklungsprofil, Trainingsplan und Coaching-Stil bildet.

## Nutzerwert

Der Nutzer soll seine Ausgangslage, Ziele, Herausforderungen und Rahmenbedingungen so erfassen können, dass die App daraus ein sinnvolles Leadership-Training ableiten kann.

## User Stories

- Als Nutzer möchte ich meine Rolle und meinen Führungskontext beschreiben, damit die App mich passend einordnet.
- Als Nutzer möchte ich Ziele, Stärken und Entwicklungsfelder angeben, damit mein Training relevant wird.
- Als Nutzer möchte ich Arbeitstage und Trainingszeit festlegen, damit der Plan realistisch bleibt.

## Scope

- Startprofil-/Onboarding-Fragen nach AGENTS.md
- Coaching-Stil-Auswahl mit Standard `klar und direkt`
- Arbeitstage, Arbeitsbeginn, Feierabend und Training an freien Tagen
- Validierung der Pflichtfelder
- Mock-Modus ohne Persistenz, bis Supabase gebaut wird

## Out of Scope

- Supabase-Speicherung
- Auth-Zwang
- KI-Entwicklungsprofil
- Echter Trainingsplan-Generator
- Kalenderimport

## UX-Verhalten

Das Startprofil soll fokussiert, direkt und nicht bürokratisch wirken. Es soll sensible Reflexionsdaten ernst nehmen und klar machen, wofür Informationen genutzt werden.

## Screens / Bereiche

- Startprofil-Flow
- Profilgrundlagen
- Ziele und Entwicklungsfelder
- Arbeitsrhythmus
- Coaching-Stil

## Datenmodell

- Name
- Alter
- aktuelle Rolle
- Branche
- Teamgröße
- Führungserfahrung
- Zielrolle
- Karriereziele
- aktuelle Herausforderungen
- größte Stärke
- größte Entwicklungsfelder
- typische Stressauslöser
- gewünschter Coaching-Stil
- verfügbare Trainingszeit pro Tag
- Arbeitstage
- Arbeitsbeginn
- Feierabend
- Training an freien Tagen aktiv?

## Validierung

- Pflichtfelder dürfen nicht leer sein.
- Alter, Teamgröße und Trainingszeit brauchen sinnvolle Wertebereiche.
- Mindestens ein Arbeitstag muss gewählt werden.
- Coaching-Stil muss einer erlaubten Option entsprechen.

## Akzeptanzkriterien

- [x] Alle Pflichtfelder aus AGENTS.md sind abgebildet.
- [x] Sprache bleibt rollen- und branchenneutral.
- [x] Ohne Supabase funktioniert ein Mock-Flow.
- [x] Validierungsfehler sind klar und nicht beschämend formuliert.
- [x] Daten werden noch nicht an KI gesendet.
- [x] Startprofil ist nicht mehr als täglicher Hauptbereich in der Navigation platziert.

## Edge Cases

- Nutzer hat keine formale Führungsrolle, aber Führungsambition.
- Nutzer arbeitet Teilzeit oder unregelmäßig.
- Nutzer möchte an freien Tagen nicht trainieren.
- Nutzer hat wenig Trainingszeit pro Tag.

## Technische Notizen

- Später `react-hook-form` und Zod nutzen.
- Typen unter `src/types/profile.ts` oder `src/types/onboarding.ts`.
- Keine Speicherung ohne PROJ-13.
- Kein KI-Aufruf ohne PROJ-14/15.

## QA-Checklist

- [ ] Desktop visuell im Browser geprüft
- [ ] Mobile visuell im Browser geprüft
- [x] Ladezustände geprüft
- [x] Fehlerzustände geprüft
- [x] Leerer Zustand geprüft
- [x] TypeScript geprüft
- [x] Lint geprüft
- [x] Build geprüft

## Implementierungsnotizen

- Onboarding-Route unter `src/app/onboarding/page.tsx` erstellt.
- Mock-Formular unter `src/components/onboarding/onboarding-form.tsx` gebaut.
- UI-Copy auf Startprofil geschärft, damit der Check-in als initialer Rahmen verstanden wird.
- Feld-Hilfetexte reduziert; Labels und Placeholder tragen den Hauptkontext.
- Validierung mit Zod und `react-hook-form` umgesetzt.
- Pflichtfelder aus AGENTS.md abgebildet.
- Coaching-Stil mit Standard `klar und direkt` umgesetzt.
- Arbeitstage, Arbeitszeiten und Training an freien Tagen umgesetzt.
- Lokale Mock-Zusammenfassung nach Submit erstellt; keine Speicherung, kein Supabase, keine KI.
- Startprofil aus der Hauptnavigation entfernt und über Profil sowie Landingpage erreichbar gemacht.
- `npm run build` erfolgreich.
- `npm run lint` erfolgreich.
- HTTP-Check für `/` und `/onboarding` erfolgreich.
- `npm audit fix` ohne `--force` ausgeführt; verbleibende moderate Meldung betrifft Next-interne PostCSS-Abhängigkeit. `--force` wurde bewusst nicht ausgeführt, da npm dafür einen breaking Downgrade vorschlägt.

## Offene Punkte

- Visueller Browsercheck bleibt offen, weil kein lokaler Browser/Playwright-Browser verfügbar war.
- Später Supabase-Speicherung mit RLS vorbereiten.
- Später KI-Entwicklungsprofil aus validiertem Startprofil ableiten.

## Änderungsverlauf

- 2026-06-15 – Spec erstellt
- 2026-06-15 – PROJ-2 als Mock-Onboarding umgesetzt und geprüft
- 2026-06-16 – Copy und Navigation auf Startprofil-Logik angepasst
