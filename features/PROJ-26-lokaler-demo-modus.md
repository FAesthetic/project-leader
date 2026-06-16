# PROJ-26 – Lokaler Demo-Modus

## Ziel

Die App soll lokal als vollständige Produktdemo nutzbar sein, auch wenn Google,
Apple oder E-Mail-Auth noch nicht vollständig eingerichtet sind.

## Scope

- Demo-Einstieg über Landingpage und Login
- temporärer Demo-Cookie
- Auth-Guard lässt geschützte MVP-Screens im Demo-Modus durch
- Accountstatus markiert Demo klar als Mock-Daten-Modus
- Demo kann über Abmelden wieder verlassen werden

## Nicht im Scope

- echte Nutzerpersistenz
- Demo-Accounts in Supabase
- produktiver Auth-Bypass
- echte KI- oder Datenbankdaten

## Akzeptanzkriterien

- `/demo/start?next=/dashboard` öffnet die App lokal ohne Login.
- Geschützte MVP-Screens sind danach erreichbar.
- `/login` zeigt einen Demo-Einstieg, solange Demo-Modus aktivierbar ist.
- Der Demo-Modus ist in Production nur mit `DEMO_MODE_ENABLED=true` aktiv.
- README und Feature-Index dokumentieren den Stand.

## Status

Done
