"use client";

import { Apple, Chrome, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type {
  OAuthProviderConfig,
  OAuthProviderId,
} from "@/lib/auth/oauth-providers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  nextPath: string;
  providers: OAuthProviderConfig[];
  demoModeEnabled: boolean;
};

export function AuthForm({
  nextPath,
  providers,
  demoModeEnabled,
}: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const supabase = createClient();
  const enabledProviders = providers.filter((provider) => provider.enabled);

  async function handleEmailAuth() {
    setPending(true);
    setError("");
    setMessage("");

    const authCall =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
            },
          });

    const { error: authError } = await authCall;

    if (authError) {
      setError(authError.message);
      setPending(false);
      return;
    }

    if (mode === "signup") {
      setMessage(
        "Account angelegt. Falls E-Mail-Bestätigung aktiv ist, prüfe dein Postfach."
      );
      setPending(false);
      return;
    }

    window.location.assign(nextPath);
  }

  async function handleOAuth(provider: OAuthProviderId) {
    setPending(true);
    setError("");
    setMessage("");

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });

    if (authError) {
      setError(getOAuthErrorMessage(authError.message, provider));
      setPending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zugang</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <Tabs value={mode} onValueChange={(value) => setMode(value as AuthMode)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Einloggen</TabsTrigger>
            <TabsTrigger value="signup">Account erstellen</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-5 space-y-4">
            <AuthFields
              email={email}
              password={password}
              pending={pending}
              buttonLabel="Einloggen"
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleEmailAuth}
            />
          </TabsContent>
          <TabsContent value="signup" className="mt-5 space-y-4">
            <AuthFields
              email={email}
              password={password}
              pending={pending}
              buttonLabel="Account erstellen"
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleEmailAuth}
            />
          </TabsContent>
        </Tabs>

        {demoModeEnabled ? (
          <div className="rounded-2xl border border-primary/20 bg-accent p-4">
            <p className="text-sm font-medium">Nur kurz ansehen?</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Starte eine unverbindliche Vorschau. Keine Registrierung, keine
              persönlichen Einträge.
            </p>
            <Button asChild variant="secondary" className="mt-4 w-full">
              <Link href={`/demo/start?next=${encodeURIComponent(nextPath)}`}>
                Vorschau ohne Login starten
              </Link>
            </Button>
          </div>
        ) : null}

        {enabledProviders.length > 0 ? (
          <div className="grid gap-2">
            {enabledProviders.map((provider) => (
              <Button
                key={provider.id}
                type="button"
                variant="outline"
                onClick={() => handleOAuth(provider.id)}
                disabled={pending}
              >
                <OAuthIcon provider={provider.id} />
                Mit {provider.label} fortfahren
              </Button>
            ))}
          </div>
        ) : (
          <Alert className="border-primary/25 bg-accent">
            <AlertTitle>Weitere Login-Wege werden vorbereitet</AlertTitle>
            <AlertDescription>
              E-Mail-Login funktioniert bereits. Google oder Apple erscheinen,
              sobald sie für dieses Produkt freigeschaltet sind.
            </AlertDescription>
          </Alert>
        )}

        {message ? (
          <Alert className="border-primary/25 bg-accent">
            <AlertTitle>Fast fertig</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}

        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Login nicht möglich</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}

function OAuthIcon({ provider }: { provider: OAuthProviderId }) {
  if (provider === "google") {
    return <Chrome className="h-4 w-4" aria-hidden />;
  }

  return <Apple className="h-4 w-4" aria-hidden />;
}

function getOAuthErrorMessage(message: string, provider: OAuthProviderId) {
  if (
    message.toLowerCase().includes("unsupported provider") ||
    message.toLowerCase().includes("not enabled")
  ) {
    return `${provider === "google" ? "Google" : "Apple"} Login ist gerade noch nicht vollständig eingerichtet. Nutze bitte E-Mail oder versuche es später erneut.`;
  }

  return message;
}

type AuthFieldsProps = {
  email: string;
  password: string;
  pending: boolean;
  buttonLabel: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
};

function AuthFields({
  email,
  password,
  pending,
  buttonLabel,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: AuthFieldsProps) {
  return (
    <>
      <label className="space-y-2">
        <span className="text-sm font-medium">E-Mail</span>
        <Input
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.currentTarget.value)}
          placeholder="du@example.com"
          autoComplete="email"
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium">Passwort</span>
        <Input
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.currentTarget.value)}
          placeholder="Mindestens 6 Zeichen"
          autoComplete="current-password"
        />
      </label>
      <Button
        type="button"
        className="w-full"
        onClick={onSubmit}
        disabled={pending || !email || password.length < 6}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {buttonLabel}
      </Button>
    </>
  );
}
