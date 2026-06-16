import Link from "next/link";
import { MessageSquarePlus, SearchCheck } from "lucide-react";

import { aiMockFeedback, journalPrompts, quickLogs } from "@/data/mvp-mock";
import { VoiceTextarea } from "@/components/audio/voice-textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";

export default function JournalPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Journal"
        title="Reflektiere Verhalten, nicht nur Ergebnis."
        description="Quick Logs, Abendjournal und systemische Reflexion liegen hier zusammen. So werden Alltagssituationen nicht verstreut."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/quick-log">
                <MessageSquarePlus className="h-4 w-4" aria-hidden />
                Quick Log
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reflection">
                <SearchCheck className="h-4 w-4" aria-hidden />
                Reflexion
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Abendreflexion</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <VoiceTextarea
              mode="journal"
              label="Abend per Audio zusammenfassen"
              placeholder="Sprich frei ein, was heute wichtig war. Die App transkribiert und verdichtet daraus eine saubere Reflexionsnotiz."
              minHeightClassName="min-h-28"
            />
            {journalPrompts.evening.map((prompt, index) => (
              <label key={prompt} className="space-y-2">
                <span className="text-sm font-medium">{prompt}</span>
                {index === 2 ? (
                  <Input type="number" min={1} max={10} defaultValue={7} />
                ) : (
                  <Textarea placeholder="Kurz und ehrlich reicht." />
                )}
              </label>
            ))}
            <div className="rounded-xl bg-surface-muted p-4">
              <p className="text-sm font-medium">Quick Logs für tiefere Betrachtung</p>
              <div className="mt-3 space-y-2">
                {quickLogs
                  .filter((log) => log.reflectTonight)
                  .map((log) => (
                    <div key={log.title} className="flex items-center justify-between gap-3 rounded-lg bg-background/55 px-3 py-2">
                      <span className="text-sm">{log.title}</span>
                      <Badge variant="outline">ausgewählt</Badge>
                    </div>
                  ))}
              </div>
            </div>
            <Button type="button" disabled>
              Speichern im Mock nicht aktiv
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Alert className="border-primary/25 bg-accent">
            <AlertTitle>{aiMockFeedback.headline}</AlertTitle>
            <AlertDescription className="mt-2 leading-6">
              {aiMockFeedback.body}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Morgen ableiten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Wenn ein Vorhaben nicht umgesetzt wurde, fragt die App nicht nach
                Schuld, sondern nach Ursache: Ziel unrealistisch, falsch priorisiert,
                innerlich vermieden oder durch Rahmenbedingungen blockiert?
              </p>
              <p className="font-medium text-foreground">
                Nächster Impuls: Eine Erwartung konkret formulieren, bevor du
                Verantwortung einforderst.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
