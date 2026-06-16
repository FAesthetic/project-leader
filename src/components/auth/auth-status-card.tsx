import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import {
  DEMO_MODE_COOKIE,
  isDemoCookieActive,
  isDemoModeEnabled,
} from "@/lib/demo-mode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function AuthStatusCard() {
  const cookieStore = await cookies();
  const demoActive =
    isDemoModeEnabled() &&
    isDemoCookieActive(cookieStore.get(DEMO_MODE_COOKIE)?.value);
  let user: User | null = null;

  try {
    const supabase = await createClient();
    const authResponse = await supabase.auth.getUser();
    user = authResponse.data.user;
  } catch {
    user = null;
  }

  if (!user && demoActive) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Du nutzt gerade eine Vorschau ohne persönliche Speicherung. Für
            dauerhafte Einträge brauchst du einen Account.
          </p>
          <form action="/auth/sign-out" method="post">
            <Button type="submit" variant="outline">
              <LogOut className="h-4 w-4" aria-hidden />
              Vorschau verlassen
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Melde dich an, damit deine Logs, Reflexionen und Teamnotizen deinem
            Account zugeordnet bleiben.
          </p>
          <Button asChild>
            <a href="/login">Einloggen</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">E-Mail</p>
          <p className="mt-1 font-medium">{user.email ?? "Ohne E-Mail"}</p>
        </div>
        <form action="/auth/sign-out" method="post">
          <Button type="submit" variant="outline">
            <LogOut className="h-4 w-4" aria-hidden />
            Abmelden
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
