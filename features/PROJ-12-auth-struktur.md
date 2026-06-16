# PROJ-12 – Auth-Struktur

## Status

Done

## Priorität

P1

## Ziel

Eine echte Account-Grundlage schaffen, damit Project Leadership von Mock-Daten zu nutzerbezogener Speicherung wechseln kann.

## Nutzerwert

Nutzer sollen sich anmelden können, damit Startprofil, Quick Logs, Journal und Einstellungen später privat und dauerhaft gespeichert werden.

## User Stories

- Als Nutzer möchte ich mich mit E-Mail und Passwort anmelden.
- Als Nutzer möchte ich optional Google oder Apple Login nutzen.
- Als Nutzer möchte ich meinen Loginstatus sehen und mich abmelden können.

## Scope

- Supabase Browser Client
- Supabase Server Client mit Cookies
- Login-Seite
- E-Mail/Passwort Login
- Account-Erstellung
- Google OAuth Button
- Apple OAuth Button
- Provider-Flags für Google und Apple
- OAuth Callback Route
- Logout Route
- Accountstatus in Einstellungen
- Schutz der Produktbereiche über `src/proxy.ts`

## Out of Scope

- Persistenz von Profil- und Journal-Daten
- Rollen/Rechte jenseits der Nutzertrennung
- Provider-Konfiguration im Supabase-Dashboard

## UX-Verhalten

Landingpage und Login bleiben öffentlich. Produktbereiche leiten ohne Session auf `/login` weiter. Google und Apple werden nur angezeigt, wenn sie in Supabase aktiviert und per Env freigeschaltet sind.

## Datenmodell

Supabase Auth verwaltet Nutzer in `auth.users`.

App-Tabellen sind in `docs/production/supabase-schema.sql` vorbereitet.

## Validierung

- E-Mail darf nicht leer sein.
- Passwort braucht mindestens 6 Zeichen.
- OAuth leitet über `/auth/callback` zurück.

## Akzeptanzkriterien

- [x] Login-Seite ist erreichbar.
- [x] E-Mail/Passwort Login ist verdrahtet.
- [x] Account-Erstellung ist verdrahtet.
- [x] Google OAuth ist vorbereitet.
- [x] Apple OAuth ist vorbereitet.
- [x] Nicht aktivierte OAuth Provider werden nicht klickbar angezeigt.
- [x] Produktbereiche sind ohne Session geschützt.
- [x] Callback Route tauscht Code gegen Session.
- [x] Logout Route entfernt Session.
- [x] Profil zeigt Loginstatus.
- [x] `npm run lint` erfolgreich.
- [x] `npm run build` erfolgreich.

## Edge Cases

- OAuth Provider ist in Supabase noch nicht aktiviert.
- Env-Flag ist versehentlich aktiv, Provider aber im Dashboard deaktiviert.
- E-Mail-Bestätigung ist aktiv.
- Session fehlt oder ist abgelaufen.
- Supabase Env Vars fehlen.

## Technische Notizen

- `@supabase/ssr`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/app/login/page.tsx`
- `src/app/auth/callback/route.ts`
- `src/app/auth/sign-out/route.ts`
- `src/proxy.ts`
- `NEXT_PUBLIC_AUTH_GOOGLE_ENABLED`
- `NEXT_PUBLIC_AUTH_APPLE_ENABLED`
- `src/components/auth/auth-form.tsx`
- `src/components/auth/auth-status-card.tsx`

## QA-Checklist

- [x] TypeScript geprüft
- [x] Lint geprüft
- [x] Build geprüft
- [ ] Google Provider im Supabase-Dashboard aktiviert
- [ ] Apple Provider im Supabase-Dashboard aktiviert
- [ ] Redirect Allow List in Supabase geprüft

## Implementierungsnotizen

Supabase Auth ist technisch angebunden. Google und Apple Login benötigen noch externe Provider-Konfigurationen im Supabase-Dashboard und werden erst nach Env-Freigabe angezeigt.

## Offene Punkte

- App-Routen nach Datenpersistenz schützen.
- Passwort-Reset ergänzen.
- E-Mail-Templates prüfen.
- Produktivdomain in Redirect Allow List aufnehmen.

## Änderungsverlauf

- 2026-06-16 – Supabase Auth-Struktur umgesetzt
