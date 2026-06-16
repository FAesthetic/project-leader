import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { mvpPillars, trainingPreview } from "@/data/mock-leadership";
import { isDemoModeEnabled } from "@/lib/demo-mode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LandingPage() {
  const demoModeEnabled = isDemoModeEnabled();
  const primaryHref = demoModeEnabled
    ? "/demo/start?next=/dashboard"
    : "/login";
  const secondaryHref = demoModeEnabled
    ? "/demo/start?next=/onboarding"
    : "/login?next=/onboarding";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="grid min-h-[calc(100vh-8rem)] content-center gap-12">
        <div className="max-w-4xl">
          <Badge variant="outline" className="mb-6">
            Jeden Tag 1 % besser führen
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            Führung wird besser, wenn du sie täglich trainierst.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Project Leadership verbindet Tagesfokus, echte Führungssituationen,
            Reflexion und Modelle zu einem persönlichen Trainingssystem. Klar,
            ruhig und anspruchsvoll, ohne therapeutisch zu werden.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryHref}>
                {demoModeEnabled ? "Demo starten" : "Kostenlos starten"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryHref}>Startprofil öffnen</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 border-y border-border/70 py-6 md:grid-cols-3">
          <Metric value="1 %" label="jeden Tag bewusster führen" />
          <Metric value="4 Wochen" label="als erster Trainingsrhythmus" />
          <Metric value="5 Bereiche" label="ruhig, fokussiert und mobil nutzbar" />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            MVP-Kern
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            Kein Habit Tracker. Ein Trainingssystem für Verhalten.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Die App fragt nicht nur, ob du etwas erledigt hast. Sie fragt, ob
            dein Verhalten zu der Führungskraft gepasst hat, die du werden willst.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {mvpPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-border/70 bg-surface/70 p-5">
              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
              <h3 className="mt-4 font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-border/70 bg-surface/70 p-5 sm:p-7 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Beispielwoche
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            Führung wird konkret, wenn sie in deinen Kalender passt.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Die erste Version hält den Wochenrhythmus bewusst einfach. So
            bleiben Startprofil, Journal und Feedback später sauber an denselben
            Entwicklungsplan anschließbar.
          </p>
        </div>
        <div className="grid gap-3">
          {trainingPreview.map((day) => (
            <Card key={day.day} className="shadow-none">
              <CardContent className="grid gap-3 p-4 sm:grid-cols-[3rem_1fr_5rem] sm:items-center">
                <span className="font-semibold text-primary">{day.day}</span>
                <div>
                  <p className="font-medium">{day.focus}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{day.model}</p>
                </div>
                <span className="text-sm text-muted-foreground">{day.duration}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
