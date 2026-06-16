import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Dumbbell,
  Search,
  SkipForward,
  Sparkles,
} from "lucide-react";

import {
  leadershipTools,
  plannedEvents,
  progressSignals,
  todayFocus,
  toolSituations,
  trainingWeek,
} from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const statusIcon = {
  erledigt: CheckCircle2,
  offen: Circle,
  optional: SkipForward,
  frei: Sparkles,
};

export default function TrainingPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Training"
        title="Führung wird trainiert wie ein Muskel."
        description="Jede Einheit braucht eine echte Anwendung: kurz vorbereiten, im Alltag ausprobieren, abends reflektieren."
        action={
          <Button asChild>
            <Link href="/quick-log">
              Auf echte Situation anwenden
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="plan" className="space-y-6">
        <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl bg-surface/70 p-1 sm:w-fit">
          <TabsTrigger value="plan" className="rounded-xl px-4 py-2.5">
            Plan
          </TabsTrigger>
          <TabsTrigger value="tools" className="rounded-xl px-4 py-2.5">
            Werkzeuge
          </TabsTrigger>
          <TabsTrigger value="progress" className="rounded-xl px-4 py-2.5">
            Fortschritt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-5">
          <Card className="border-primary/25">
            <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.75fr] lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Dumbbell className="h-4 w-4" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    heutige Einheit
                  </span>
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  {todayFocus.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {todayFocus.action}
                </p>
              </div>
              <div className="rounded-2xl bg-accent/70 p-4">
                <p className="text-sm font-medium">Konkreter Satz</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {todayFocus.concreteSentence}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {trainingWeek.map((day) => {
              const Icon = statusIcon[day.status as keyof typeof statusIcon] ?? Circle;

              return (
                <Card key={day.id} className="overflow-hidden">
                  <CardContent className="grid gap-5 p-5 xl:grid-cols-[7rem_1fr_13rem] xl:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{day.day}</p>
                        <Badge
                          variant="outline"
                          className={cn(
                            day.status === "erledigt" && "border-primary/40 text-primary"
                          )}
                        >
                          {day.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h2 className="text-xl font-semibold tracking-[-0.02em]">
                          {day.focus}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {day.goal}
                        </p>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <InfoBlock label="3-Minuten-Anwendung" value={day.application} />
                        <InfoBlock label="Abendcheck" value={day.reflection} />
                      </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border bg-surface-muted p-4">
                      <p className="text-sm font-medium">{day.model}</p>
                      <p className="text-sm text-muted-foreground">{day.duration}</p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/quick-log">Auf Situation anwenden</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
            <Card>
              <CardHeader>
                <CardTitle>Wähle zuerst die Situation, nicht das Modell.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Modelle sind Werkzeuge. Die App empfiehlt dir das passende
                  Werkzeug zur konkreten Führungssituation.
                </p>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    className="pl-9"
                    placeholder="Situation, Modell oder Thema suchen"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {toolSituations.map((situation) => (
                    <Badge key={situation} variant="outline" className="whitespace-normal">
                      {situation}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Empfehlung für heute</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <Badge variant="outline">Erwartungen sind unklar</Badge>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                    Erwartungsklärung
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Nutze dieses Werkzeug, wenn Ergebnis, Zeitpunkt oder
                    Entscheidungsspielraum nie klar ausgesprochen wurden.
                  </p>
                </div>
                <div className="rounded-2xl bg-accent/70 p-4">
                  <p className="text-sm font-medium">3-Minuten-Anwendung</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Kläre Ergebnis, Zeitpunkt, Qualität, Spielraum und Meldepunkt.
                  </p>
                  <Button asChild className="mt-4" variant="outline">
                    <Link href="/quick-log">Auf Log anwenden</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {leadershipTools.map((tool) => (
              <Card key={tool.title}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    {tool.category}
                  </Badge>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ToolSection title="Wann nutzen?" text={tool.fit} />
                  <ToolSection title="Nicht nutzen, wenn..." text={tool.whenNot} />
                  <ToolSection title="3-Minuten-Anwendung" text={tool.application} />
                  <ToolSection title="Typischer Fehler" text={tool.mistake} />
                  <div className="rounded-2xl bg-surface-muted p-4">
                    <p className="text-sm font-medium">Konkreter Satz</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {tool.sentence}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/quick-log">Auf Situation anwenden</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {progressSignals.map((signal) => (
              <Card key={signal.label}>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{signal.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                    {signal.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{signal.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Diese Woche trainieren</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainingWeek.map((day, index) => (
                <div
                  key={day.id}
                  className="grid gap-3 rounded-2xl bg-surface-muted p-4 md:grid-cols-[4rem_1fr_12rem] md:items-center"
                >
                  <div className="font-semibold">{day.day}</div>
                  <div>
                    <p className="font-medium">{day.focus}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{day.reflection}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={index < 2 ? 100 : index === 2 ? 45 : 10} />
                    <Badge variant="outline">{day.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geplante Führungssituationen</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {plannedEvents.map((event) => (
                <div key={event.title} className="rounded-2xl border border-border bg-surface-muted p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{event.title}</p>
                    <Badge>{event.type}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {event.day}, {event.time}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {event.focus}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-muted p-4">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function ToolSection({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
