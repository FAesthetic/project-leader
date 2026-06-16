import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, Gauge, MessageSquarePlus, Target } from "lucide-react";

import {
  plannedEvents,
  profileSnapshot,
  quickLogs,
  todayFocus,
  trainingWeek,
} from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";

export default function DashboardPage() {
  const nextTraining = trainingWeek.find((day) => day.status === "offen");
  const nextEvent = plannedEvents[0];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Heute"
        title="Heute zählt ein sauberer Führungsimpuls."
        description="Dein täglicher Überblick: Fokus, nächste Übung, offene Reflexionen und die wichtigste Führungssituation."
        action={
          <Button asChild>
            <Link href="/quick-log">
              Situation festhalten
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Energie", value: `${profileSnapshot.energy}/10`, icon: Gauge },
          { label: "Stress", value: `${profileSnapshot.stress}/10`, icon: Target },
          { label: "Streak", value: `${profileSnapshot.streak} Tage`, icon: Flame },
          { label: "Woche", value: `${profileSnapshot.weekProgress}%`, icon: CalendarDays },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Tagesfokus</CardTitle>
              <Badge>{todayFocus.model}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                {todayFocus.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {todayFocus.intention}
              </p>
            </div>
            <div className="rounded-xl bg-surface-muted p-4">
              <p className="text-sm font-medium">Konkretes Vorhaben</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {todayFocus.action}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/journal">Im Journal vertiefen</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Woche</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Fortschritt</span>
                <span className="text-muted-foreground">{profileSnapshot.weekProgress}%</span>
              </div>
              <Progress value={profileSnapshot.weekProgress} />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Nächster Trainingstag</p>
              <Link
                href="/training"
                className="block rounded-xl border border-border bg-surface-muted p-4 transition-colors hover:bg-secondary"
              >
                <p className="font-medium">{nextTraining?.focus}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {nextTraining?.model} · {nextTraining?.duration}
                </p>
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Nächste Führungssituation</p>
              <Link
                href="/planner"
                className="block rounded-xl border border-border bg-surface-muted p-4 transition-colors hover:bg-secondary"
              >
                <p className="font-medium">{nextEvent.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {nextEvent.day}, {nextEvent.time} · {nextEvent.type}
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Situationen von heute</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/quick-log">
                <MessageSquarePlus className="h-4 w-4" aria-hidden />
                Quick Log
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {quickLogs.map((log) => (
            <div key={log.title} className="rounded-xl border border-border bg-surface-muted p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{log.title}</p>
                {log.reflectTonight ? <Badge variant="outline">abends</Badge> : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{log.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
