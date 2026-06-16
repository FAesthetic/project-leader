"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound, MessageSquarePlus, Sparkles } from "lucide-react";

import { commitments, employees, quickLogs } from "@/data/mvp-mock";
import { VoiceTextarea } from "@/components/audio/voice-textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Erwartung unklar",
  "Delegation/Rückdelegation",
  "Konflikt",
  "Feedback",
  "Belastung/Stress",
  "Entscheidung",
  "Veränderung",
  "Leistung",
  "Kommunikation",
];

export default function QuickLogPage() {
  const [saved, setSaved] = useState(false);
  const [acceptedCommitmentId, setAcceptedCommitmentId] = useState("");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Log"
        title="Halte die Situation kurz fest. Du musst sie jetzt nicht lösen."
        description="Voice oder Text: Speichere den Rohmoment, verknüpfe bei Bedarf eine Person und entscheide später im Journal."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <Card className="border-primary/25">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Situation aufnehmen</CardTitle>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Audio wird nicht dauerhaft gespeichert. Gespeichert wird nur
                  dein Transkript oder deine Notiz, wenn du sie übernimmst.
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <MessageSquarePlus className="h-5 w-5" aria-hidden />
              </span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input placeholder="Titel optional, zum Beispiel: Feedback verschoben" />
            <VoiceTextarea
              mode="quick-log"
              label="Situation / Rohnotiz"
              placeholder="Was ist passiert? Wer war beteiligt? Was war dein Führungsziel?"
              minHeightClassName="min-h-32"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Label className="grid gap-2">
                <span>Beteiligte Person optional</span>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Nicht verknüpfen" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Label>

              <Label className="grid gap-2">
                <span>Kategorie</span>
                <Select defaultValue="Erwartung unklar">
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Label>

              <Label className="grid gap-2">
                <span>Dringlichkeit</span>
                <Select defaultValue="Heute reflektieren">
                  <SelectTrigger>
                    <SelectValue placeholder="Dringlichkeit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nur festhalten">Nur festhalten</SelectItem>
                    <SelectItem value="Heute reflektieren">Heute reflektieren</SelectItem>
                    <SelectItem value="Follow-up nötig">Follow-up nötig</SelectItem>
                  </SelectContent>
                </Select>
              </Label>

              <Label className="grid gap-2">
                <span>Emotion / Belastung optional</span>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {["ruhig", "angespannt", "genervt", "unsicher", "überfordert"].map(
                      (emotion) => (
                        <SelectItem key={emotion} value={emotion}>
                          {emotion}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </Label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Follow-up-Datum optional" />
              <Input placeholder="Zusage oder offener Punkt optional" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-muted p-4">
              <span className="text-sm font-medium">Später im Journal reflektieren</span>
              <Switch defaultChecked />
            </div>

            {saved ? (
              <Alert className="border-primary/25 bg-accent">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                <AlertTitle>Gespeichert für die Abendreflexion</AlertTitle>
                <AlertDescription>
                  Der Log ist vorgemerkt. Du kannst ihn heute Abend im Journal
                  einordnen und daraus Zusagen ableiten.
                </AlertDescription>
              </Alert>
            ) : null}

            <Button type="button" size="lg" onClick={() => setSaved(true)}>
              Speichern und später reflektieren
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Alert className="border-primary/25 bg-accent">
            <KeyRound className="h-4 w-4" aria-hidden />
            <AlertTitle>KI-Auswertung optional</AlertTitle>
            <AlertDescription>
              KI-Auswertung ist verfügbar, wenn du einen API-Key hinterlegst.
              Ohne Key bleibt der Log nutzbar und wird einfach als Notiz gespeichert.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Heute geloggt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickLogs.map((log) => (
                <div key={log.id} className="rounded-2xl border border-border bg-surface-muted p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{log.title}</p>
                    <Badge variant={log.status === "Follow-up offen" ? "default" : "outline"}>
                      {log.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {log.people} · {log.category} · {log.emotion}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {log.summary}
                  </p>
                  <div className="mt-3 rounded-xl bg-background/45 p-3">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                      Nächster Führungszug
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {log.nextStep}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mögliche Zusagen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commitments.slice(0, 2).map((commitment) => (
                <div key={commitment.id} className="rounded-2xl bg-surface-muted p-4">
                  <p className="font-medium">{commitment.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {commitment.description}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setAcceptedCommitmentId(commitment.id)}
                  >
                    {acceptedCommitmentId === commitment.id
                      ? "Zusage vorgemerkt"
                      : "Als Zusage übernehmen"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
