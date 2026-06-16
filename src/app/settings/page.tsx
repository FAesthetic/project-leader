import Link from "next/link";
import { ArrowRight, Bell, Download, ShieldCheck } from "lucide-react";

import { AuthStatusCard } from "@/components/auth/auth-status-card";
import { UserApiKeySettings } from "@/components/settings/user-api-key-settings";
import { AccentColorPicker } from "@/components/theme/accent-color-picker";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default async function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Profil & Einstellungen"
        title="Dein Führungsprofil bleibt der Trainingsrahmen."
        description="Passe Zielbild, Coaching-Stil, Darstellung, Reminder und KI-Nutzung an, wenn sich dein Alltag verändert."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div id="account" className="scroll-mt-24">
          <AuthStatusCard />
        </div>

        <Card id="profile" className="scroll-mt-24">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle>Mein Führungsprofil</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/onboarding">
                  Profil aktualisieren
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Label className="space-y-2">
              <span>Aktuelles Entwicklungsthema</span>
              <Textarea
                defaultValue="Erwartungen früher konkret machen, bevor Frust entsteht."
                className="min-h-24"
              />
            </Label>
            <Label className="space-y-2">
              <span>Zielbild</span>
              <Textarea
                defaultValue="Klar führen, Verantwortung bewusst übergeben und Zusagen verlässlich nachhalten."
                className="min-h-24"
              />
            </Label>
          </CardContent>
        </Card>

        <Card id="privacy-ai" className="scroll-mt-24 lg:col-span-2">
          <CardHeader>
            <CardTitle>Datenschutz & KI</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <PrivacyPoint
              title="Du entscheidest, was gespeichert wird"
              text="Logs, Reflexionen und Gesprächsnotizen entstehen nur, wenn du sie aktiv erfasst."
            />
            <PrivacyPoint
              title="Keine heimliche Gesprächsaufzeichnung"
              text="Audio wird nur verarbeitet, wenn du aktiv eine Voice-Notiz startest."
            />
            <PrivacyPoint
              title="KI arbeitet im Hintergrund"
              text="Sie strukturiert deine gespeicherten Notizen, erkennt Muster und schlägt Werkzeuge vor."
            />
            <PrivacyPoint
              title="API-Key bleibt lokal"
              text="Dein OpenAI-Key wird nicht in deinem Account gespeichert."
            />
            <PrivacyPoint
              title="Teamnotizen bleiben subjektiv"
              text="Sie sind deine Führungswahrnehmung, keine Personalakte."
            />
            <PrivacyPoint
              title="Löschen bleibt vorgesehen"
              text="Einträge sollen später exportierbar und löschbar sein."
            />
          </CardContent>
        </Card>

        <div id="api-key" className="scroll-mt-24">
          <UserApiKeySettings />
        </div>

        <Card id="appearance" className="scroll-mt-24">
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

        <Card id="reminders" className="scroll-mt-24">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" aria-hidden />
              <CardTitle>Reminder</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between rounded-2xl bg-surface-muted p-4">
              <span className="text-sm font-medium">Abendreflexion erinnern</span>
              <Switch defaultChecked />
            </div>
            <Label className="space-y-2">
              <span>Uhrzeit</span>
              <Input type="time" defaultValue="18:00" />
            </Label>
            <Label className="space-y-2">
              <span>Trainingstage</span>
              <Input defaultValue="Mo, Di, Mi, Do, Fr" />
            </Label>
          </CardContent>
        </Card>

        <Card id="data" className="scroll-mt-24">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" aria-hidden />
              <CardTitle>Datenexport & Löschen</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Export und Löschung gehören zu einem vertrauenswürdigen Produkt.
              Der Bereich ist vorbereitet und wird vor breiter Nutzung
              vollständig angebunden.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" disabled>
                Export vorbereiten
              </Button>
              <Button type="button" variant="outline" disabled>
                Löschung vorbereiten
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PrivacyPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-muted p-4">
      <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
