# Feature Specs – Project Leadership

Dieses Verzeichnis enthält Feature-Spezifikationen für Project Leadership.

Jedes größere Feature bekommt eine eigene Datei.

Beispiel:

```txt
features/PROJ-2-onboarding.md
```

---

## Feature-Datei Vorlage

Neue Feature-Dateien sollen diese Struktur nutzen:

```md
# PROJ-X – Feature Name

## Status

Backlog / Ready / In Progress / Review / Done / Blocked

## Priorität

P0 / P1 / P2 / P3

## Ziel

Kurze Beschreibung, welches Problem dieses Feature löst.

## Nutzerwert

Warum ist dieses Feature für den Nutzer wichtig?

## User Stories

- Als Nutzer möchte ich ..., damit ...
- Als Nutzer möchte ich ..., damit ...

## Scope

Was gehört zu diesem Feature?

- Punkt 1
- Punkt 2
- Punkt 3

## Out of Scope

Was gehört bewusst nicht dazu?

- Punkt 1
- Punkt 2

## UX-Verhalten

Wie soll sich das Feature anfühlen und verhalten?

## Screens / Bereiche

Welche UI-Bereiche sind betroffen?

- Dashboard
- Onboarding
- Journal
- etc.

## Datenmodell

Welche Daten werden gebraucht?

Beispiel:

- user_id
- date
- title
- status

## Validierung

Welche Eingaben müssen validiert werden?

## Akzeptanzkriterien

- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3

## Edge Cases

- Was passiert bei leerem Zustand?
- Was passiert bei Fehlern?
- Was passiert auf Mobile?
- Was passiert ohne API Key?
- Was passiert ohne Supabase?

## Technische Notizen

- Komponenten
- Hooks
- API Routes
- Supabase-Tabellen
- AI-Funktionen

## QA-Checklist

- [ ] Desktop geprüft
- [ ] Mobile geprüft
- [ ] Ladezustände geprüft
- [ ] Fehlerzustände geprüft
- [ ] Leerer Zustand geprüft
- [ ] TypeScript geprüft
- [ ] Lint geprüft
- [ ] Build geprüft

## Implementierungsnotizen

Was wurde gebaut?

## Offene Punkte

Was fehlt noch?

## Änderungsverlauf

- Datum – Änderung
```

---

## Arbeitsregel

Vor dem Bauen:

1. `AGENTS.md` lesen
2. `docs/PRD.md` lesen
3. `features/INDEX.md` lesen
4. passende Feature-Spec lesen oder erstellen

Nach dem Bauen:

1. Feature-Datei aktualisieren
2. `features/INDEX.md` aktualisieren
3. README aktualisieren, falls Setup oder Commands betroffen sind

---

## Feature-ID-Regeln

Feature IDs sind fortlaufend:

- PROJ-0
- PROJ-1
- PROJ-2
- PROJ-3

Commit-Konvention, falls Git genutzt wird:

```txt
feat(PROJ-X): kurze beschreibung
fix(PROJ-X): kurze beschreibung
docs(PROJ-X): kurze beschreibung
refactor(PROJ-X): kurze beschreibung
```

---

## MVP-Regel

Keine P2- oder P3-Features bauen, solange P0/P1 nicht stabil sind.

Insbesondere nicht früh bauen:

- Kalenderintegration
- Push Notifications
- Mentor-Matching
- iOS-App
- Zahlungsmodell
- Team-Version