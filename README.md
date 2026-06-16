# Project Leadership

Project Leadership ist eine KI-gestützte Trainings-App für Leadership, Self Development und Resilienz.

Die App hilft Nutzern, Führung wie Fitness zu trainieren:

- Onboarding
- KI-Entwicklungsprofil
- dynamischer Trainingsplan
- Tagesfokus
- Startprofil und Zielanpassung
- Quick Logs
- Audioeingabe für Quick Log und Journal
- Abendjournal
- systemische Reflexion
- KI-Feedback
- Modellbibliothek
- Fortschrittsübersicht
- Wochenplaner für Führungssituationen

Leitsatz:

> Jeden Tag 1 % besser führen.

---

## Produktidee

In der modernen Führungswelt hat sich viel verändert. Project Leadership hilft, diesen Wandel mitzugestalten, indem wir bei uns selbst anfangen.

Führung muss trainiert werden.

Die App ist kein Therapeut und kein klassischer Habit Tracker. Sie ist ein klarer Sparringspartner für Menschen mit Führungsverantwortung oder Führungsambition.

---

## Zielgruppe

Project Leadership ist rollen- und branchenneutral.

Die App richtet sich an:

- angehende Führungskräfte
- neue Führungskräfte
- erfahrene Führungskräfte
- Teamleads
- Manager
- Projektverantwortliche
- Menschen in fachlicher, lateraler oder disziplinarischer Führung
- Menschen, die Leadership, Selbstführung und Wirkung bewusst entwickeln wollen

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- optional shadcn/ui
- Zod
- react-hook-form
- Supabase für Auth und Datenbank
- AI-Service-Schicht für OpenAI, Anthropic Claude oder Google Gemini
- Vercel Deployment

---

## Lokaler Start

```bash
npm install
npm run dev
```

Die App läuft standardmäßig unter:

```txt
http://localhost:3000
```

Aktuelle Mock-Routen:

```txt
/
/onboarding
/dashboard
/training
/morning
/quick-log
/journal
/reflection
/models
/progress
/planner
/settings
/login
/demo/start
```

Die sichtbare App-Navigation ist bewusst auf fünf Hauptbereiche reduziert:

```txt
Heute
Training
Journal
Modelle
Profil
```

Quick Log ist eine globale Schnellaktion. Fortschritt und Planer liegen als
Unterbereiche im Training. Startprofil und spätere Zielanpassungen liegen im
Profil.

Für eine lokale Produktdemo ohne Google- oder E-Mail-Login kann die Demo über
die Landingpage oder direkt hier gestartet werden:

```txt
http://localhost:3000/demo/start?next=/dashboard
```

Der Demo-Modus nutzt ausschließlich Mock-Daten und setzt lokal einen temporären
Cookie. In `npm run dev` ist er automatisch aktiv. Für `npm run start` oder
Test-Deploys muss er bewusst per Env aktiviert werden:

```bash
DEMO_MODE_ENABLED=true
```

Für die öffentliche Domain ist vorgesehen:

```txt
https://leaderjournal.de
```

Auf Production sollte der Demo-Modus nur bewusst aktiviert werden. Ohne Demo
liegen die App-Bereiche hinter Login/Auth.

---

## Wichtige Scripts

Je nach Projektsetup können folgende Scripts verfügbar sein:

```bash
npm run dev
npm run build
npm run lint
npm run start
npm test
npm run test:e2e
```

Wenn ein Script fehlt, bitte `package.json` prüfen.

---

## ENV-Variablen

Lege eine `.env.local` an.

Nutze `.env.example` als Vorlage.

Wichtige Variablen:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=
NEXT_PUBLIC_AUTH_APPLE_ENABLED=

AI_PROVIDER=
OPENAI_API_KEY=
OPENAI_TRANSCRIBE_MODEL=
OPENAI_SUMMARY_MODEL=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=

NEXT_PUBLIC_APP_URL=
DEMO_MODE_ENABLED=
```

Hinweis:

- Keine API Keys hardcoden.
- `SUPABASE_SERVICE_ROLE_KEY` niemals im Client verwenden.
- Für den MVP darf ein Mock-AI-Provider genutzt werden.
- Audio-Transkription läuft serverseitig über `/api/audio/transcribe`.
- Ohne `OPENAI_API_KEY` zeigt die App einen klaren Fehlerzustand statt Audio heimlich zu senden.

---

## Auth und Supabase

Umgesetzt ist eine erste Supabase-Auth-Schicht:

- E-Mail/Passwort Login unter `/login`
- Account-Erstellung unter `/login`
- Google OAuth Button
- Apple OAuth Button
- OAuth Callback unter `/auth/callback`
- Logout unter `/auth/sign-out`
- Accountstatus in Profil/Einstellungen

Google und Apple funktionieren, sobald die Provider im Supabase-Dashboard aktiviert sind und diese Redirect URL erlaubt ist:

```txt
https://jcstuatpcudqrbkrexer.supabase.co/auth/v1/callback
```

Bei Google gehört `http://localhost:3000` zusätzlich in die Authorized JavaScript origins.

Die lokale App-Callback-URL gehört in Supabase unter `Authentication` -> `URL Configuration`, nicht in Google:

```txt
http://localhost:3000/auth/callback
http://localhost:3000/**
```

Für `leaderjournal.de` zusätzlich in Supabase erlauben:

```txt
https://leaderjournal.de/auth/callback
https://leaderjournal.de/**
```

Und in Google unter Authorized JavaScript origins ergänzen:

```txt
https://leaderjournal.de
```

Setze die Provider-Flags erst danach auf `true`:

```bash
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=true
NEXT_PUBLIC_AUTH_APPLE_ENABLED=true
```

Solange die Flags `false` sind, zeigt die Login-Seite keine klickbaren Google-/Apple-Buttons. Dadurch laufen Nutzer nicht in den Supabase-Fehler `Unsupported provider: provider is not enabled`.

Das vorbereitete Datenmodell mit RLS liegt in:

```txt
docs/production/supabase-schema.sql
```

Dieses SQL muss im Supabase SQL Editor geprüft und ausgeführt werden, bevor echte Persistenz für Profile, Quick Logs, Journal und Training gebaut wird.

---

## Production Deployment

Die App ist als Next.js Node-App vorbereitet. Für Hostinger darf das Deployment-
Archiv keine Build-Artefakte und keine lokalen Secrets enthalten.

Nicht ins Deployment-Archiv:

```txt
node_modules/
.next/
.git/
.env.local
*.zip
```

Wichtige Production-ENV:

```bash
NEXT_PUBLIC_APP_URL=https://leaderjournal.de
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=true
NEXT_PUBLIC_AUTH_APPLE_ENABLED=false
AI_PROVIDER=mock
OPENAI_API_KEY=
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_SUMMARY_MODEL=gpt-5.5
DEMO_MODE_ENABLED=false
```

Security-Header werden in `next.config.ts` gesetzt.

### Hostinger VPS

Da `leaderjournal.de` im verbundenen Hostinger-Account nicht als Shared-Hosting-
Website sichtbar ist, liegt zusätzlich ein VPS-Compose-Setup unter:

```txt
deploy/hostinger/docker-compose.yml
```

Dieses Setup startet die Next.js-App als Node-Service und setzt Traefik-Labels
für Hostingers Reverse Proxy:

```txt
leaderjournal.de
www.leaderjournal.de
```

Aktueller Hostinger-Stand:

- VPS-Projekt `leaderjournal` läuft auf VM `1192698`.
- Container `leaderjournal-app-1` ist healthy.
- DNS `@` zeigt auf `72.62.89.226`.
- Hostingers Traefik-Reverse-Proxy routet `leaderjournal.de` und
  `www.leaderjournal.de` auf den App-Container.
- HTTP leitet auf HTTPS weiter.
- Ein erzwungener HTTPS-Probeaufruf auf `72.62.89.226` mit Host
  `leaderjournal.de` liefert `200`.

Hinweis:

```txt
DNS-Propagation kann noch dauern. Google DNS und Quad9 zeigen bereits auf
72.62.89.226; einzelne Resolver können vorübergehend noch eine alte IP liefern.
```

Falls das Routing später erneut angepasst werden muss, muss der Container im
externen Docker-Netzwerk `web` hängen und Hostingers Traefik-Certresolver `le`
nutzen. Die aktuelle Konfiguration liegt in
`deploy/hostinger/docker-compose.yml`.

---

## Projektstruktur

```txt
src/
  app/
  components/
    ui/
    layout/
    dashboard/
    onboarding/
    training/
    journal/
    models/
    progress/
    planner/
  hooks/
  lib/
    ai/
    supabase/
    utils/
  data/
  types/
docs/
  PRD.md
  production/
features/
  INDEX.md
  README.md
```

---

## Design-System

Die App nutzt ein mattes, ruhiges Premium-Design auf Basis von Tailwind CSS und shadcn/ui.

Umgesetzt sind:

- Light Mode, Dark Mode und System Theme über `next-themes`
- lokale Akzentfarbe über `localStorage`
- Akzentfarben: Emerald, Blue, Violet, Amber, Rose, Slate
- zentrale CSS Tokens in `src/app/globals.css`
- Theme-Provider in `src/components/theme/theme-provider.tsx`
- Theme Toggle und Accent Color Picker in `src/components/theme/`
- reduzierte Sidebar und Mobile Bottom Navigation
- gemeinsame UI-Helfer wie `SectionHeader` und `EmptyState`

Die Einstellungen sind im Mock unter `/settings` sichtbar. Die Auswahl beeinflusst das UI sofort, wird aber noch nicht in einer Datenbank gespeichert.

Darstellung und Akzentfarbe werden ausschließlich in Profil/Einstellungen gesteuert, nicht in der Hauptnavigation.

---

## Audioeingabe

Quick Log und Journal unterstützen eine erste Audioeingabe:

- Aufnahme im Browser über Mikrofonberechtigung
- Upload an die serverseitige Route `src/app/api/audio/transcribe/route.ts`
- Transkription über OpenAI Speech-to-Text
- kurze Leadership-Zusammenfassung über OpenAI Responses API
- keine Speicherung der Audiodatei im MVP
- Ausgabe von Rohtranskript, bereinigter Notiz und nächstem Führungsimpuls

Konfiguration:

```bash
OPENAI_API_KEY=
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_SUMMARY_MODEL=gpt-5.5
```

---

## MVP-Umfang

Der Mock-MVP umfasst aktuell:

1. Landingpage
2. Startprofil / Onboarding-Mock
3. Heute-Ansicht
4. Training mit Wochenplan
5. Tagesfokus
6. Quick Log als Schnellaktion
7. Abendjournal
8. systemische Reflexion
9. statisches Mock-Feedback
10. Modellbibliothek
11. Fortschrittsseite
12. Wochenplaner für Führungssituationen
13. Profil/Einstellungen mit Startprofil, Theme und Akzentfarbe
14. responsive Webapp

Noch nicht echt angebunden:

- Auth-Struktur
- Supabase-Datenmodell
- KI-Entwicklungsprofil
- dynamischer Trainingsplan
- KI-Feedback

---

## Bewusst nicht im MVP

Nicht direkt bauen:

- native iOS-App
- Push Notifications
- echte Kalenderintegration
- Mentor-/Mentee-Matching
- Team-Version
- Enterprise-Version
- Zahlungsmodell
- Werbung
- Apple Health
- komplexe Social Features

Diese Features dürfen vorbereitet, aber nicht umgesetzt werden, solange der MVP-Kern nicht stabil ist.

---

## Arbeitsweise

Das Projekt nutzt Feature-Dateien.

Alle Features werden in `features/INDEX.md` getrackt.

Für größere Features wird eine eigene Datei angelegt:

```txt
features/PROJ-X-feature-name.md
```

Jede Feature-Datei enthält:

- Ziel
- User Stories
- Scope
- Out of Scope
- UX-Verhalten
- Datenmodell
- Akzeptanzkriterien
- Edge Cases
- QA-Checklist
- Implementierungsnotizen

---

## Datenschutz

Project Leadership verarbeitet sensible Reflexionsdaten.

Siehe:

```txt
docs/production/privacy-security.md
```

Grundsätze:

- Datenminimierung
- Row Level Security
- keine Secrets im Frontend
- keine vertraulichen Daten in Logs
- keine unnötigen Analytics
- KI-Anfragen sparsam und bewusst gestalten

---

## Codex-Hinweis

Für Codex ist `AGENTS.md` die wichtigste Arbeitsanweisung.

Vor größeren Änderungen immer lesen:

1. `AGENTS.md`
2. `docs/PRD.md`
3. `features/INDEX.md`
4. passende Feature-Datei

---

## Nächste sinnvolle Schritte

1. Projektbasis prüfen
2. UI-Mock bauen
3. Feature-Dateien für MVP anlegen
4. Supabase später anbinden
5. AI-Service später anbinden
6. Datenschutz und RLS sauber vorbereiten
