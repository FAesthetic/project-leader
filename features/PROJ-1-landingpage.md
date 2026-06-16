# PROJ-1 – Landingpage

## Status

Done

## Priorität

P0

## Ziel

Eine erste öffentliche Produktseite für Project Leadership bauen, die Nutzen, Haltung und MVP-Fokus klar vermittelt.

## Nutzerwert

Der Nutzer soll schnell verstehen, dass Project Leadership tägliches Leadership-Training aus Fokus, Reflexion, Modellen und Entwicklung unterstützt.

## User Stories

- Als Nutzer möchte ich sofort verstehen, wofür Project Leadership steht.
- Als Nutzer möchte ich sehen, welche Kernbereiche die App im MVP abdecken wird.
- Als Nutzer möchte ich eine klare, professionelle Sprache ohne Branchenfokus erleben.

## Scope

- Landingpage als erste Seite
- Hero mit Produktname, Leitsatz und klarer Positionierung
- MVP-Bereiche sichtbar machen
- Abgrenzung zu Habit Trackern und reinen Coaching-Chats
- Hinweise auf aktuell vorbereitete, noch nicht aktive Bereiche
- Rollen- und branchenneutrale Sprache

## Out of Scope

- Login-Formular
- Registrierung
- Onboarding-Flow
- Dashboard-Funktionalität
- Echte KI-Ausgaben
- Zahlungs- oder Enterprise-Kommunikation

## UX-Verhalten

Die Landingpage soll ruhig, direkt und hochwertig wirken. Sie soll nicht marketinglaut sein, sondern den Kern des Produkts spürbar machen: Jeden Tag 1 % besser führen.

## Screens / Bereiche

- Startseite `/`
- Hero
- MVP-Übersicht
- Trainingslogik
- Datenschutz-/KI-Hinweis im Produktkontext

## Datenmodell

- Statische Inhalte
- Mock-Feature-Liste
- Keine personenbezogenen Daten

## Validierung

Keine Formulare oder Nutzereingaben in PROJ-1.

## Akzeptanzkriterien

- [x] Die Landingpage ersetzt die Starter-Kit-Default-Seite.
- [x] Die Sprache ist rollen- und branchenneutral.
- [x] Der MVP-Kern ist verständlich.
- [x] Spätere Features werden nicht als aktive Funktionen verkauft.
- [x] Die Seite ist responsive angelegt.
- [x] Es gibt keine Supabase-, Auth- oder KI-Integration.
- [x] `npm run build` wurde geprüft, falls vorhanden.
- [x] `npm run lint` wurde geprüft, falls vorhanden.

## Edge Cases

- Mobile Hero darf keine Inhalte überdecken.
- Lange deutsche Texte müssen sauber umbrechen.
- CTA darf keine nicht vorhandene Auth-Funktion vortäuschen.

## Technische Notizen

- Seite unter `src/app/page.tsx`
- Landing-Komponente unter `src/components/landing/`, falls sinnvoll
- shadcn/ui für Buttons, Cards, Badges und Separatoren nutzen.

## QA-Checklist

- [ ] Desktop visuell im Browser geprüft
- [ ] Mobile visuell im Browser geprüft
- [ ] Ladezustände geprüft
- [ ] Fehlerzustände geprüft
- [ ] Leerer Zustand geprüft
- [x] TypeScript geprüft
- [x] Lint geprüft
- [x] Build geprüft

## Implementierungsnotizen

- Starter-Kit-Default-Seite durch `src/components/landing/landing-page.tsx` ersetzt.
- Landingpage zeigt Produktname, Leitsatz, MVP-Kern, Trainingslogik und Datenschutz-/KI-Haltung.
- Mock-Inhalte für MVP-Pfeiler, Beispielwoche und Produktprinzipien liegen in `src/data/mock-leadership.ts`.
- CTAs verweisen nur auf vorhandene Seitenanker und täuschen keinen Login oder aktiven Onboarding-Flow vor.
- `npm run build` erfolgreich.
- `npm run lint` erfolgreich.
- Dev-Server HTTP-Check erfolgreich; visueller Browsercheck war blockiert, weil der in-app Browser nicht verfügbar war und Playwright-Browserinstallation hängen blieb.

## Offene Punkte

- Auth-CTA ist mit PROJ-12 vorbereitet.
- Onboarding-Einstieg wird später mit PROJ-2 umgesetzt.
- Optional später: echte Produkt-Screenshots oder generierte Visuals ergänzen, sobald mehr UI-Bereiche existieren.

## Änderungsverlauf

- 2026-06-15 – Spec erstellt
- 2026-06-15 – PROJ-1 umgesetzt und geprüft
