import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MessageSquarePlus,
  Moon,
  Repeat2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  commitments,
  progressSignals,
  quickLogs,
  todayFocus,
  weeklyPattern,
} from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const openCommitments = commitments.filter(
    (commitment) => commitment.status !== "erledigt"
  );
  const reflectionLogs = quickLogs.filter((log) => log.reflectTonight);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Heute"
        title="Heute eine Führungssituation besser führen."
        description="Trainiere Führung im Alltag: Situation erkennen, klar handeln, am Abend reflektieren."
        action={
          <Button asChild size="lg">
            <Link href="/quick-log">
              Situation loggen
              <MessageSquarePlus className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-primary/25 bg-card/95">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Heutiger Trainingsfokus</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  Eine echte Situation reicht. Führung wird durch Anwendung trainiert.
                </p>
              </div>
              <Badge variant="outline" className="border-primary/40 text-primary">
                {todayFocus.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                {todayFocus.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {todayFocus.intention}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-medium">Auf Situation anwenden</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {todayFocus.action}
              </p>
            </div>
            <div className="rounded-2xl bg-accent/70 p-4">
              <p className="text-sm font-medium text-foreground">Werkzeug</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {todayFocus.model}
              </p>
            </div>
            <Button asChild>
              <Link href="/training">
                Training anwenden
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <ActionCard
            icon={MessageSquarePlus}
            title="Situation schnell loggen"
            text="Halte eine Situation in 60 Sekunden fest. Du musst sie jetzt nicht lösen."
            href="/quick-log"
            action="Log starten"
            meta={`${quickLogs.length} Situationen heute`}
          />
          <ActionCard
            icon={Moon}
            title="Abendreflexion"
            text={`${reflectionLogs.length} Logs warten auf Einordnung. Vier Fragen reichen.`}
            href="/journal"
            action="Reflexion starten"
            meta="heute noch offen"
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Offene Zusagen</CardTitle>
              <Badge variant="outline">{openCommitments.length} offen</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {openCommitments.map((commitment) => (
              <div
                key={commitment.id}
                className={cn(
                  "rounded-2xl border bg-surface-muted p-4",
                  commitment.status === "überfällig"
                    ? "border-destructive/35"
                    : "border-border"
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{commitment.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {commitment.description}
                    </p>
                  </div>
                  <Badge
                    variant={commitment.status === "überfällig" ? "destructive" : "outline"}
                  >
                    {commitment.dueDate}
                  </Badge>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="outline">
                <Link href="/team">Nachhalten</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/quick-log">Zusage aus Log ableiten</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Muster der Woche</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-2xl border border-primary/20 bg-accent/60 p-4">
              <div className="flex items-start gap-3">
                <Repeat2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
                <div>
                  <p className="font-medium">{weeklyPattern.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {weeklyPattern.text}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {weeklyPattern.nextMove}
            </p>
            <Button asChild variant="outline">
              <Link href="/journal">Im Journal ansehen</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {progressSignals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-2xl border border-border bg-surface/65 p-4"
          >
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              <span className="text-2xl font-semibold tracking-[-0.03em]">
                {signal.value}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium">{signal.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{signal.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type ActionCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  action: string;
  meta: string;
};

function ActionCard({ icon: Icon, title, text, href, action, meta }: ActionCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5" aria-hidden />
            {meta}
          </span>
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>{action}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
