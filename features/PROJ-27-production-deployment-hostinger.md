# PROJ-27 – Production Deployment Hostinger

## Status

Done

## Priorität

P1

## Ziel

Project Leadership soll unter `https://leaderjournal.de` als deploybare
Next.js-Webapp vorbereitet und über Hostinger veröffentlicht werden.

## Nutzerwert

Die App ist nicht nur lokal als Demo nutzbar, sondern kann über eine echte
Domain getestet, geteilt und für die nächsten Produktentscheidungen genutzt
werden.

## Scope

- Production-Metadaten für `leaderjournal.de`
- Security-Header im Next.js-Config
- sichere interne Redirects für Login/OAuth/Demo
- öffentlicher Landing-/Login-Bereich ohne App-Sidebar
- Hostinger-kompatibles Deployment-Archiv
- Hostinger-VPS-Compose mit Traefik-Labels
- Lint, Build, Audit und Smoke-Checks
- README und Feature-Index aktualisieren

## Out of Scope

- echte Supabase-Persistenz für Journal, Quick Logs und Training
- produktive Rechtsseiten mit finalem Impressum und Datenschutzerklärung
- Zahlungsmodell
- Push Notifications
- Kalenderintegration
- native App

## UX-Verhalten

Öffentliche Seiten wirken wie Produktseiten und nicht wie interne App-Screens.
Geschützte Produktbereiche bleiben hinter Auth oder bewusst aktiviertem
Demo-Modus.

## Datenmodell

Keine neuen Tabellen. Das vorbereitete Supabase-Schema bleibt in
`docs/production/supabase-schema.sql`.

## Validierung

- interne Redirects dürfen keine externen URLs akzeptieren
- geschützte Routen dürfen ohne Supabase-Konfiguration nicht offen durchfallen
- Demo-Modus ist in Production nur explizit aktivierbar

## Akzeptanzkriterien

- [x] `npm run lint` läuft erfolgreich
- [x] `npm run build` läuft erfolgreich
- [x] `npm audit --omit=dev` meldet keine Production-Vulnerabilities
- [x] `/` lädt ohne App-Sidebar
- [x] `/login` lädt ohne App-Sidebar
- [x] `/auth/callback?next=//example.com` leitet nicht extern weiter
- [x] `leaderjournal.de` ist über Hostinger deployt

## Edge Cases

- Hostinger API nicht erreichbar
- Domain nicht verifiziert
- Supabase OAuth Redirect URLs fehlen
- OpenAI API Key fehlt
- Demo-Modus in Production nicht aktiviert

## Technische Notizen

- `next.config.ts` setzt Security-Header.
- `src/lib/redirects.ts` bündelt sichere interne Redirects.
- `src/components/layout/app-shell.tsx` trennt Public- und App-Routen.
- `deploy/hostinger/docker-compose.yml` nutzt Hostingers externes Traefik-
  Netzwerk `web`, den Certresolver `le` und HTTPS-Redirects, statt eigene Ports
  80/443 zu binden.
- React/React-DOM wurden auf aktuelle Patch-Version aktualisiert.
- PostCSS wurde auf eine sichere Patch-Version gepinnt.

## QA-Checklist

- [ ] Desktop geprüft
- [ ] Mobile geprüft
- [ ] Ladezustände geprüft
- [ ] Fehlerzustände geprüft
- [x] TypeScript geprüft
- [x] Lint geprüft
- [x] Build geprüft
- [x] Deployment geprüft

## Implementierungsnotizen

- Code ist gebaut, geprüft, committed und nach `origin/main` gepusht.
- Hostinger Shared-Hosting-Deploy ist nicht möglich, weil für
  `leaderjournal.de` keine Website/Hosting-Order im verbundenen Hostinger-
  Account existiert.
- VPS-Projekt `leaderjournal` wurde auf VM `1192698` erstellt.
- Container `leaderjournal-app-1` läuft mit `node:22-alpine` und ist healthy.
- VPS-Logs zeigen erfolgreichen `npm ci --include=dev`, `next build` und
  `next start -H 0.0.0.0 -p 3000`.
- Hostinger DNS zeigt `@` auf `72.62.89.226` und `www` per CNAME auf
  `leaderjournal.de.`.
- HTTPS-Routing über Hostingers Traefik-Proxy ist aktiv. Ein erzwungener
  Probeaufruf auf `72.62.89.226` mit Host `leaderjournal.de` liefert `200`.
- HTTP leitet auf HTTPS weiter.

## Offene Punkte

- DNS-Propagation abwarten. Google DNS und Quad9 zeigen bereits auf
  `72.62.89.226`; einzelne Resolver können noch eine alte IP liefern.
- Supabase Redirect URLs für `https://leaderjournal.de` ergänzen.
- Finale Rechtsseiten vor breiter öffentlicher Nutzung ergänzen.

## Änderungsverlauf

- 2026-06-16 – Production Deployment vorbereitet.
- 2026-06-16 – VPS-Container deployt; Domain-Routing durch Hostinger-Proxy blockiert.
- 2026-06-16 – Hostinger-Traefik-Netzwerk und Certresolver korrigiert; HTTPS
  liefert `200`, Container ist healthy.
