import { quickLogs } from "@/data/mvp-mock";
import { VoiceTextarea } from "@/components/audio/voice-textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function QuickLogPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Quick Log"
        title="Halte Führungssituationen fest, solange sie noch frisch sind."
        description="Eine Schnellaktion, kein eigener Arbeitsbereich: kurz notieren, später im Journal einordnen."
      />

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Neue Situation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input placeholder="Titel der Situation" />
            <Input placeholder="Person oder Gruppe" />
            <Select defaultValue="kommunikation">
              <SelectTrigger>
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kommunikation">Kommunikation</SelectItem>
                <SelectItem value="priorisierung">Priorisierung</SelectItem>
                <SelectItem value="konflikt">Konflikt</SelectItem>
                <SelectItem value="entwicklung">Entwicklung</SelectItem>
              </SelectContent>
            </Select>
            <VoiceTextarea
              mode="quick-log"
              label="Notiz"
              placeholder="Was ist passiert? Was war dein Anteil? Du kannst schreiben oder einsprechen."
              minHeightClassName="min-h-28"
            />
            <Input placeholder="Stimmung danach" />
            <div className="flex items-center justify-between rounded-xl bg-surface-muted p-4">
              <span className="text-sm font-medium">Abends reflektieren</span>
              <Switch defaultChecked />
            </div>
            <Button type="button" disabled>
              Speichern im Mock nicht aktiv
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heute erfasst</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickLogs.map((log) => (
              <div key={log.title} className="rounded-xl border border-border bg-surface-muted p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{log.title}</p>
                  <Badge variant={log.reflectTonight ? "default" : "outline"}>
                    {log.reflectTonight ? "Abendjournal" : "notiert"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {log.people} · {log.category} · {log.mood}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{log.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
