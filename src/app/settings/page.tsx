import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthStatusCard } from "@/components/auth/auth-status-card";
import { UserApiKeySettings } from "@/components/settings/user-api-key-settings";
import { AccentColorPicker } from "@/components/theme/accent-color-picker";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default async function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Profil & Einstellungen"
        title="Passe Startprofil, Ziele und Oberfläche an."
        description="Der Check-in findet beim Startprofil statt. Wenn sich Rolle, Ziele oder Arbeitsrhythmus ändern, wird der Rahmen später hier nachjustiert."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <AuthStatusCard />
        <UserApiKeySettings />

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Startprofil</CardTitle>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ausgangslage, Ziele, Entwicklungsfelder und Coaching-Stil. Im
                  MVP bleibt das ein Mock ohne Speicherung.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/onboarding">
                  Startprofil öffnen
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Aktuelles Entwicklungsziel</span>
              <Textarea
                defaultValue="In schwierigen Gesprächen klarer Erwartungen formulieren, ohne sofort in Lösung oder Rechtfertigung zu springen."
                className="min-h-24"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Was hat sich verändert?</span>
              <Textarea
                placeholder="Neue Rolle, anderes Team, veränderte Ziele oder ein wiederkehrendes Muster."
                className="min-h-24"
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Darstellung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium">Theme</p>
              <ThemeToggle />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">Akzentfarbe</p>
              <AccentColorPicker />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Trainingsrahmen</CardTitle>
              <Badge variant="outline">Mock</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <label className="space-y-2">
              <span className="text-sm font-medium">Trainingszeit pro Tag</span>
              <Input defaultValue="15 Minuten" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Arbeitsbeginn</span>
              <Input type="time" defaultValue="09:00" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Feierabend</span>
              <Input type="time" defaultValue="17:00" />
            </label>
            <div className="flex items-center justify-between rounded-xl bg-surface-muted p-4">
              <span className="text-sm font-medium">Training an freien Tagen</span>
              <Switch />
            </div>
            <Button type="button" disabled>
              Speichern im Mock nicht aktiv
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
