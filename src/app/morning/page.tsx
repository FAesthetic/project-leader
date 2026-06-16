import { BatteryMedium, CalendarClock, Target } from "lucide-react";
import Link from "next/link";

import { todayFocus } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";

export default function MorningPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Tagesfokus"
        title="Setze einen Führungsimpuls, bevor der Tag dich setzt."
        description="Kein eigener Hauptbereich: Der Tagesfokus gehört zu Heute. Das ausführliche Startprofil wird beim Onboarding erstellt und später im Profil angepasst."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Fokus für heute</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">Energielevel 1–10</span>
                <Input type="number" min={1} max={10} defaultValue={7} />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Stresslevel 1–10</span>
                <Input type="number" min={1} max={10} defaultValue={5} />
              </label>
            </div>
            <label className="space-y-2">
              <span className="text-sm font-medium">Tagesziel</span>
              <Input defaultValue="Eine Erwartung vor dem Gespräch sauber formulieren" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Erwartete wichtige Führungssituation</span>
              <Input defaultValue="1:1 zur neuen Verantwortung" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Konkretes Vorhaben</span>
              <Textarea defaultValue={todayFocus.action} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Optionaler Freitext</span>
              <Textarea placeholder="Was sollte dein späteres Ich über diesen Morgen wissen?" />
            </label>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted p-4">
              <p className="text-sm text-muted-foreground">
                Dein Morgenfokus wird als Tagesrahmen vorgemerkt.
              </p>
              <Button asChild>
                <Link href="/dashboard">Heute öffnen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {[
            { icon: BatteryMedium, label: "Energie zuerst", text: "Führung braucht Selbstwahrnehmung, nicht nur Willenskraft." },
            { icon: Target, label: "Ein Fokus", text: "Ein konkretes Vorhaben schlägt fünf vage Absichten." },
            { icon: CalendarClock, label: "Situation vorwegnehmen", text: "Der Plan wird besser, wenn er an echte Gespräche andockt." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label}>
                <CardContent className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <Badge variant="outline">{item.label}</Badge>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
