# Feature Index – Project Leadership

Dieses Dokument trackt alle Features von Project Leadership.

Jedes größere Feature bekommt eine eigene Spec-Datei:

```txt
features/PROJ-X-feature-name.md
```

Status-Werte:

- `Backlog`
- `Ready`
- `In Progress`
- `Review`
- `Done`
- `Blocked`

Priorität:

- `P0` = absoluter MVP-Kern
- `P1` = wichtig für guten MVP
- `P2` = später
- `P3` = langfristig

---

## MVP Features

| ID | Feature | Priorität | Status | Spec |
|---|---|---:|---|---|
| PROJ-0 | Projektbasis, Layout, Navigation, Mock-Daten | P0 | Done | `features/PROJ-0-projektbasis-layout-navigation.md` |
| PROJ-1 | Landingpage | P0 | Done | `features/PROJ-1-landingpage.md` |
| PROJ-2 | Startprofil / Onboarding | P0 | Done | `features/PROJ-2-onboarding.md` |
| PROJ-3 | Heute-Ansicht | P0 | Done | Mock-Screen in `src/app/dashboard` |
| PROJ-4 | Trainingsplan | P0 | Done | Mock-Screen in `src/app/training` |
| PROJ-5 | Tagesfokus | P0 | Done | Mock-Screen in `src/app/morning` |
| PROJ-6 | Quick Logs | P0 | Done | Mock-Screen in `src/app/quick-log` |
| PROJ-7 | Abendjournal | P0 | Done | Mock-Screen in `src/app/journal` |
| PROJ-8 | Systemische Reflexion | P0 | Done | Mock-Screen in `src/app/reflection` |
| PROJ-9 | Modellbibliothek | P0 | Done | Mock-Screen in `src/app/models` |
| PROJ-10 | Fortschrittsseite | P1 | Done | Mock-Screen in `src/app/progress` |
| PROJ-11 | Wochenplaner für Führungssituationen | P1 | Done | Mock-Screen in `src/app/planner` |
| PROJ-12 | Auth-Struktur | P1 | Done | `features/PROJ-12-auth-struktur.md` |
| PROJ-13 | Supabase Datenmodell | P1 | Ready | `docs/production/supabase-schema.sql` |
| PROJ-14 | KI-Service-Schicht mit Mock-Provider | P1 | Backlog | offen |
| PROJ-15 | KI-Entwicklungsprofil | P1 | Backlog | offen |
| PROJ-16 | KI-Feedback zum Abendjournal | P1 | Backlog | offen |
| PROJ-17 | Responsive Mobile UX und reduzierte Navigation | P1 | Done | AppShell, 5 Hauptbereiche, Quick-Log-Schnellaktion |
| PROJ-20 | Audioeingabe und Transkription | P1 | Done | `features/PROJ-20-audioeingabe-transkription.md` |
| PROJ-26 | Lokaler Demo-Modus | P1 | Done | `features/PROJ-26-lokaler-demo-modus.md` |
| PROJ-27 | Production Deployment Hostinger | P1 | Done | `features/PROJ-27-production-deployment-hostinger.md` |
| PROJ-28 | Mobile-first Produktstruktur, Team und Zusagen | P1 | Done | `features/PROJ-28-mobile-first-product-structure-team-commitments.md` |

---

## Spätere Features

| ID | Feature | Priorität | Status | Spec |
|---|---|---:|---|---|
| PROJ-18 | Push Notifications | P2 | Backlog | offen |
| PROJ-19 | Kalenderintegration | P2 | Backlog | offen |
| PROJ-21 | Mentor-/Mentee-Matching | P3 | Backlog | offen |
| PROJ-22 | iOS-App | P3 | Backlog | offen |
| PROJ-23 | Team-Version | P3 | Backlog | offen |
| PROJ-24 | Leadership-Reports / Export | P2 | Backlog | offen |
| PROJ-25 | Ressourcen- und Buchempfehlungen | P2 | Backlog | offen |

---

## Aktueller Fokus

Aktueller Produktkern:

1. 5 Hauptbereiche: Heute, Training, Log, Journal, Team
2. Log als zentraler schneller Situationsflow mit Voice/Text
3. Profil/Einstellungen ausschließlich im Avatar-Menü
4. Modelle/Werkzeuge als Unterbereich von Training
5. Zusagen systemweit in Heute, Journal und Team
6. Heute als Tageshub mit Trainingsfokus, offenen Zusagen, Reflexion und Wochenmuster
7. Journal mit maximal vier Kernfragen und Behavior Checks
8. Team-Kontext mit Gesprächen, subjektiver Wahrnehmung, Zusagen und Mustern
9. BYOK OpenAI API-Key bleibt lokal im Browser
10. Supabase Auth mit E-Mail, Google und Apple vorbereitet
11. Supabase Datenmodell mit RLS für Team, Journal, Logs, Zusagen und Training vorbereitet
12. VPS-Deployment für `leaderjournal.de` läuft; HTTPS-Routing ist aktiv, einzelne DNS-Resolver können noch propagieren

Weiterhin keine Kalenderintegration, Push Notifications, iOS-App oder Mentor-Matching. Supabase Auth ist angebunden; Persistenz folgt nach Ausführung des erweiterten RLS-Schemas. KI bleibt Hintergrundfunktion für Strukturierung, Muster und Impulse.

---

## Regeln

- Ein Feature erst bauen, wenn Scope und Akzeptanzkriterien klar sind.
- Nach Umsetzung Status aktualisieren.
- Keine P2/P3 Features bauen, bevor P0/P1 stabil sind.
- Mock-Daten klar kennzeichnen.
- Rollen- und branchenneutral bleiben.
