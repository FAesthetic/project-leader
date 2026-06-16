"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageSquarePlus, SearchCheck, Sparkles } from "lucide-react";

import { aiGuidance, commitments, journalPrompts, quickLogs } from "@/data/mvp-mock";
import { VoiceTextarea } from "@/components/audio/voice-textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";

export default function JournalPage() {
  const [saved, setSaved] = useState(false);
  const reflectionLogs = quickLogs.filter((log) => log.reflectTonight);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Journal"
        title="Kurz reflektieren. Morgen klarer führen."
        description="Vier Fragen reichen: wichtigste Situation, gutes Verhalten, Unklarheit und ein konkreter nächster Führungszug."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/quick-log">
                <MessageSquarePlus className="h-4 w-4" aria-hidden />
                Log starten
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reflection">
                <SearchCheck className="h-4 w-4" aria-hidden />
                Tiefer reflektieren
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Abendreflexion</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <VoiceTextarea
              mode="journal"
              label="Abend per Audio zusammenfassen"
              placeholder="Sprich frei ein, was heute wichtig war. Die App verdichtet daraus eine Reflexionsnotiz, wenn du einen API-Key hinterlegt hast."
              minHeightClassName="min-h-28"
            />

            <div className="grid gap-4">
              {journalPrompts.evening.map((prompt, index) => (
                <Label key={prompt} className="space-y-2">
                  <span className="text-sm font-medium">{prompt}</span>
                  {index === 0 ? (
                    <Input placeholder="Log auswählen oder freie Situation eintragen" />
                  ) : (
                    <Textarea placeholder="Kurz und ehrlich reicht." className="min-h-24" />
                  )}
                </Label>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-medium">Behavior Checks</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {journalPrompts.behaviorChecks.map((check) => (
                  <Label
                    key={check}
                    className="flex min-h-11 items-center gap-3 rounded-xl bg-background/45 px-3 py-2 text-sm"
                  >
                    <Checkbox />
                    {check}
                  </Label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium">Offene Logs für heute</p>
                <Badge variant="outline">{reflectionLogs.length} offen</Badge>
              </div>
              <div className="mt-3 space-y-2">
                {reflectionLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl bg-background/50 px-3 py-3"
                  >
                    <p className="text-sm font-medium">{log.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {log.category} · {log.people}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Label className="space-y-2">
              <span className="text-sm font-medium">Bewertung optional</span>
              <Input type="number" min={1} max={10} defaultValue={7} />
            </Label>

            {saved ? (
              <Alert className="border-primary/25 bg-accent">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                <AlertTitle>Reflexion vorgemerkt</AlertTitle>
                <AlertDescription>
                  Dein Tageslernpunkt ist erfasst. Morgen startet mit einem
                  klareren Fokus.
                </AlertDescription>
              </Alert>
            ) : null}

            <Button type="button" size="lg" onClick={() => setSaved(true)}>
              Reflexion speichern
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Alert className="border-primary/25 bg-accent">
            <Sparkles className="h-4 w-4" aria-hidden />
            <AlertTitle>{aiGuidance.journal.pattern}</AlertTitle>
            <AlertDescription className="mt-2 leading-6">
              {aiGuidance.journal.reflectionNote}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Nächster Führungszug</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {aiGuidance.journal.nextImpulse}
              </p>
              <div className="rounded-2xl bg-surface-muted p-4">
                <p className="text-sm font-medium">Konkreter Satz</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {aiGuidance.journal.exampleSentence}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{aiGuidance.journal.recommendedModel}</Badge>
                <Badge variant="outline">{aiGuidance.journal.recommendedTraining}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offene Zusagen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commitments.map((commitment) => (
                <div key={commitment.id} className="rounded-2xl bg-surface-muted p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{commitment.title}</p>
                    <Badge
                      variant={commitment.status === "überfällig" ? "destructive" : "outline"}
                    >
                      {commitment.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {commitment.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
