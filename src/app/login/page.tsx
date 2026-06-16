import Link from "next/link";

import { AuthForm } from "@/components/auth/auth-form";
import { getOAuthProviders } from "@/lib/auth/oauth-providers";
import { isDemoModeEnabled } from "@/lib/demo-mode";
import { sanitizeInternalPath } from "@/lib/redirects";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(params.next);
  const providers = getOAuthProviders();
  const demoModeEnabled = isDemoModeEnabled();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-5 py-8 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Login"
        title="Willkommen zurück."
        description="Melde dich an, damit Startprofil, Journal und Training später sauber deinem Account zugeordnet werden."
        action={
          <Button asChild variant="outline">
            <Link href="/">Zur Startseite</Link>
          </Button>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-surface/60 p-5">
          <p className="text-sm font-medium">Nächster Produktstand</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Auth ist die Basis für echte Speicherung. Danach werden Startprofil,
            Quick Logs, Journal und Einstellungen in Supabase mit RLS gesichert.
          </p>
        </div>
        <AuthForm
          nextPath={nextPath}
          providers={providers}
          demoModeEnabled={demoModeEnabled}
        />
      </div>
    </div>
  );
}

function sanitizeNextPath(value: string | undefined) {
  return sanitizeInternalPath(value);
}
