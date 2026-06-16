# PROJ-0 – Projektbasis, Layout und Navigation

## Status

Done

## Priorität

P0

## Ziel

Eine saubere technische und visuelle Basis für die Project-Leadership-Webapp schaffen.

## Nutzerwert

Der Nutzer soll vom ersten Aufruf an erkennen, dass Project Leadership ein professionelles Leadership-Trainingssystem ist und keine generische To-do-App.

## User Stories

- Als Nutzer möchte ich eine klare App-Struktur sehen, damit ich verstehe, welche Trainingsbereiche später verfügbar sind.
- Als Nutzer möchte ich auf Desktop und Mobile eine passende Navigation haben, damit die App wie ein echtes Produkt wirkt.
- Als Entwickler möchte ich Mock-Daten und Domain-Typen vorbereitet haben, damit die nächsten Features modular gebaut werden können.

## Scope

- Globale App-Metadaten
- Dunkles, professionelles Grundlayout
- Desktop Sidebar
- Mobile Bottom Navigation
- Reduzierte Hauptnavigation mit fünf Bereichen
- Quick Log als globale Schnellaktion
- Rollen- und branchenneutrale Navigationssprache
- Vorbereitete Mock-Daten-Struktur
- Vorbereitete Domain-Typen für Navigation und MVP-Status

## Out of Scope

- Supabase-Anbindung
- Auth-Flows
- Echte KI-Anbindung
- Dashboard-Funktionalität
- Persistenz
- Kalenderintegration
- Push Notifications

## UX-Verhalten

Die App soll ruhig, hochwertig und fokussiert wirken. Noch nicht gebaute Bereiche werden klar als späterer MVP-Ausbau markiert und wirken nicht wie kaputte Buttons.

## Screens / Bereiche

- Globales Layout
- Desktop Sidebar
- Mobile Bottom Navigation
- Landingpage-Rahmen

## Datenmodell

- Navigationspunkte
- Feature-Status für Mock-Hinweise
- Keine nutzerbezogenen Daten

## Validierung

Keine Formulare oder Nutzereingaben in PROJ-0.

## Akzeptanzkriterien

- [x] Die App nutzt eine globale Shell mit professioneller dunkler UI.
- [x] Desktop zeigt eine linke Sidebar.
- [x] Mobile zeigt eine Bottom Navigation.
- [x] Die Hauptnavigation ist auf Heute, Training, Journal, Modelle und Profil reduziert.
- [x] Quick Log ist als Schnellaktion erreichbar, aber kein eigener Haupttab.
- [x] Noch nicht aktive Bereiche sind klar markiert.
- [x] Mock-Daten liegen getrennt von UI-Komponenten.
- [x] Es gibt keine Supabase-, Auth- oder KI-Integration.
- [x] `npm run build` wurde geprüft, falls vorhanden.
- [x] `npm run lint` wurde geprüft, falls vorhanden.

## Edge Cases

- Mobile Navigation darf Inhalt nicht verdecken.
- Navigationseinträge ohne aktive Route dürfen nicht wie defekte Links wirken.
- Layout muss ohne eingeloggten Nutzer funktionieren.

## Technische Notizen

- Komponenten unter `src/components/layout/`
- Mock-/Konfigurationsdaten unter `src/data/`
- Typen unter `src/types/`
- shadcn/ui verwenden, wenn vorhandene Komponenten passen.

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

- Globale App-Shell in `src/components/layout/app-shell.tsx` erstellt.
- Desktop Sidebar in `src/components/layout/desktop-sidebar.tsx` erstellt.
- Mobile Bottom Navigation in `src/components/layout/mobile-bottom-navigation.tsx` erstellt.
- Navigation auf fünf Hauptbereiche reduziert.
- Quick Log als globale Schnellaktion ergänzt.
- Matter Influence-Map-Hintergrund in `src/app/globals.css` ergänzt.
- Navigationsdaten in `src/data/navigation.ts` vorbereitet.
- Domain-Typen in `src/types/navigation.ts` und `src/types/mvp.ts` vorbereitet.
- Lint-Script für Next 16 auf ESLint Flat Config aktualisiert.
- `npm run build` erfolgreich.
- `npm run lint` erfolgreich.
- Dev-Server HTTP-Check erfolgreich; visueller Browsercheck war blockiert, weil der in-app Browser nicht verfügbar war und Playwright-Browserinstallation hängen blieb.

## Offene Punkte

- Feature-Routen entstehen erst mit den jeweiligen Feature-Umsetzungen.
- Auth-abhängige Zustände werden später ergänzt.
- Die gezielte ESLint-Ausnahme für `src/components/ui/sidebar.tsx` kann später entfernt werden, wenn die shadcn-Skeleton-Zufallsbreite angepasst oder der React-Compiler-Regelsatz anders konfiguriert wird.

## Änderungsverlauf

- 2026-06-15 – Spec erstellt
- 2026-06-15 – PROJ-0 umgesetzt und geprüft
- 2026-06-16 – Navigation auf fünf Hauptbereiche reduziert und Quick Log als Schnellaktion umgesetzt
