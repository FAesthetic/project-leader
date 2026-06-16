import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import {
  DEMO_MODE_COOKIE,
  isDemoCookieActive,
  isDemoModeEnabled,
} from "@/lib/demo-mode";
import { Badge } from "@/components/ui/badge";
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
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Account</CardTitle>
            <Badge>Demo aktiv</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Du nutzt gerade die lokale Demo mit Mock-Daten. Echte Speicherung
            wird erst nach Login und Supabase-Persistenz aktiv.
          </p>
          <form action="/auth/sign-out" method="post">
            <Button type="submit" variant="outline">
              <LogOut className="h-4 w-4" aria-hidden />
              Demo verlassen
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
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Account</CardTitle>
            <Badge variant="outline">nicht angemeldet</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Du kannst die Demo ansehen. Für echte Speicherung brauchst du einen
            Account.
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
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Account</CardTitle>
          <Badge>angemeldet</Badge>
        </div>
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
