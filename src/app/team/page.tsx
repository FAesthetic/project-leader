"use client";

import { useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  Plus,
  SearchCheck,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { commitments, employees } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function TeamPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0]?.id);
  const [savedNotice, setSavedNotice] = useState("");
  const selectedEmployee =
    employees.find((employee) => employee.id === selectedEmployeeId) ?? employees[0];
  const employeeCommitments = commitments.filter(
    (commitment) => commitment.employeeId === selectedEmployee.id
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Team"
        title="Gespräche, Wahrnehmungen und Zusagen festhalten."
        description="Subjektive Führungsnotiz, keine Personalakte. Der Bereich hilft dir, Follow-ups und Muster nicht zu verlieren."
        action={
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setSavedNotice("Mitarbeiterformular vorgemerkt.")}>
              <UserPlus className="h-4 w-4" aria-hidden />
              Mitarbeiter hinzufügen
            </Button>
            <Button type="button" onClick={() => setSavedNotice("Gesprächseintrag vorgemerkt.")}>
              <MessageSquareText className="h-4 w-4" aria-hidden />
              Gespräch eintragen
            </Button>
          </div>
        }
      />

      {savedNotice ? (
        <div className="rounded-2xl border border-primary/25 bg-accent p-4 text-sm font-medium">
          {savedNotice}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <Card>
          <CardHeader>
            <CardTitle>Team-Kontext</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employees.map((employee) => (
              <button
                key={employee.id}
                type="button"
                onClick={() => setSelectedEmployeeId(employee.id)}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-colors",
                  selectedEmployee.id === employee.id
                    ? "border-primary/40 bg-accent/70"
                    : "border-border bg-surface-muted hover:bg-secondary/70"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-primary">
                    {employee.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{employee.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {employee.role} · {employee.team}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline">letzter Kontakt: {employee.lastContact}</Badge>
                      <Badge variant="outline">{employee.openCommitments} Zusagen</Badge>
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>{selectedEmployee.name}</CardTitle>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {selectedEmployee.contextNote}
                </p>
              </div>
              <Badge variant="outline">Follow-up: {selectedEmployee.nextFollowUp}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-5">
              <TabsList className="grid h-auto w-full grid-cols-5 rounded-2xl bg-surface/70 p-1">
                <TabsTrigger value="overview" className="rounded-xl px-2 py-2 text-xs sm:text-sm">
                  Übersicht
                </TabsTrigger>
                <TabsTrigger value="conversations" className="rounded-xl px-2 py-2 text-xs sm:text-sm">
                  Gespräche
                </TabsTrigger>
                <TabsTrigger value="perception" className="rounded-xl px-2 py-2 text-xs sm:text-sm">
                  Wahrnehmung
                </TabsTrigger>
                <TabsTrigger value="commitments" className="rounded-xl px-2 py-2 text-xs sm:text-sm">
                  Zusagen
                </TabsTrigger>
                <TabsTrigger value="patterns" className="rounded-xl px-2 py-2 text-xs sm:text-sm">
                  Muster
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="grid gap-4 md:grid-cols-2">
                <InfoCard
                  icon={CalendarClock}
                  title="Nächste Klärung"
                  text={selectedEmployee.nextFollowUp}
                />
                <InfoCard
                  icon={CheckCircle2}
                  title="Offene Zusagen"
                  text={`${selectedEmployee.openCommitments} aktiv`}
                />
                <div className="rounded-2xl border border-border bg-surface-muted p-4 md:col-span-2">
                  <p className="text-sm font-medium">Letzter Gesprächseintrag</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {selectedEmployee.conversations[0]?.summary}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="conversations" className="space-y-4">
                {selectedEmployee.conversations.map((conversation) => (
                  <div key={`${conversation.date}-${conversation.type}`} className="rounded-2xl border border-border bg-surface-muted p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{conversation.type}</p>
                      <Badge variant="outline">{conversation.date}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {conversation.summary}
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <MiniBlock label="Führungsziel" text={conversation.leadershipGoal} />
                      <MiniBlock label="Wirkung" text={conversation.perceivedEffect} />
                      <MiniBlock label="Offen" text={conversation.openPoints} />
                      <MiniBlock label="Nächster Schritt" text={conversation.nextStep} />
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="font-medium">Gespräch eintragen</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <Input placeholder="Gesprächstyp" />
                    <Input placeholder="Datum" />
                    <Textarea placeholder="Was wurde besprochen?" className="min-h-24 md:col-span-2" />
                    <Textarea placeholder="Was war mein Führungsziel?" className="min-h-20" />
                    <Textarea placeholder="Was bleibt offen?" className="min-h-20" />
                  </div>
                  <Button type="button" className="mt-4" onClick={() => setSavedNotice("Gesprächseintrag vorgemerkt.")}>
                    Gespräch übernehmen
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="perception" className="space-y-4">
                <div className="rounded-2xl border border-primary/20 bg-accent/60 p-4">
                  <p className="text-sm font-medium">
                    Deine Wahrnehmung für bessere Führung. Keine finale Bewertung.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries(selectedEmployee.perception).map(([key, value]) => (
                    <div key={key} className="rounded-2xl border border-border bg-surface-muted p-4">
                      <p className="text-sm font-medium">{perceptionLabels[key] ?? key}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="commitments" className="space-y-4">
                {employeeCommitments.length > 0 ? (
                  employeeCommitments.map((commitment) => (
                    <div key={commitment.id} className="rounded-2xl border border-border bg-surface-muted p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">{commitment.title}</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {commitment.description}
                          </p>
                        </div>
                        <Badge variant={commitment.status === "überfällig" ? "destructive" : "outline"}>
                          {commitment.dueDate}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={CheckCircle2}
                    title="Keine offene Zusage"
                    description="Wenn aus einem Gespräch ein Follow-up entsteht, taucht es hier auf."
                  />
                )}
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="font-medium">Zusage hinzufügen</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <Input placeholder="Titel" />
                    <Input placeholder="Fälligkeitsdatum" />
                    <Textarea placeholder="Beschreibung optional" className="min-h-20 md:col-span-2" />
                  </div>
                  <Button type="button" className="mt-4" onClick={() => setSavedNotice("Zusage vorgemerkt.")}>
                    Zusage hinzufügen
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="patterns" className="space-y-4">
                <div className="rounded-2xl border border-primary/20 bg-accent/60 p-4">
                  <div className="flex items-start gap-3">
                    <SearchCheck className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
                    <div>
                      <p className="font-medium">Wiederkehrendes Muster</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {selectedEmployee.pattern}
                      </p>
                    </div>
                  </div>
                </div>
                <MiniBlock
                  label="Empfohlenes Werkzeug"
                  text="Delegationsmatrix / Erwartungsklärung"
                />
                <MiniBlock
                  label="Nächster Gesprächsimpuls"
                  text="Kläre zuerst Ergebnis, Spielraum und Meldepunkt. Danach erst über Hindernisse sprechen."
                />
                <Button type="button" onClick={() => setSavedNotice("Gesprächsvorbereitung geöffnet.")}>
                  <Plus className="h-4 w-4" aria-hidden />
                  Nächstes Gespräch vorbereiten
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const perceptionLabels: Record<string, string> = {
  expectationClarity: "Klarheit der Erwartungen",
  trust: "Vertrauen / Arbeitsbeziehung",
  autonomy: "Selbstständigkeit / Autonomie",
  energy: "Belastung / Energie",
  reliability: "Zuverlässigkeit in Vereinbarungen",
  developmentNeed: "Entwicklungsbedarf",
  communicationNeed: "Kommunikationsbedarf",
};

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-muted p-4">
      <Icon className="h-5 w-5 text-primary" aria-hidden />
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function MiniBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl bg-background/45 p-4">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
