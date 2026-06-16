import { CalendarPlus } from "lucide-react";

import { plannedEvents } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlannerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Wochenplaner"
        title="Plane Führungssituationen, nicht nur Termine."
        description="Kein Kalenderersatz: Der Planer hilft, Wirkung, Gesprächsziel und Führungsimpuls vorab zu klären."
      />

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Situation vorbereiten</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input placeholder="Titel" />
            <Select defaultValue="1:1">
              <SelectTrigger>
                <SelectValue placeholder="Art der Situation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="Feedbackgespräch">Feedbackgespräch</SelectItem>
                <SelectItem value="Konfliktgespräch">Konfliktgespräch</SelectItem>
                <SelectItem value="Teamrunde">Teamrunde</SelectItem>
                <SelectItem value="Stakeholder-Gespräch">Stakeholder-Gespräch</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Tag und Uhrzeit" />
            <Input placeholder="Fokus: Was soll klarer werden?" />
            <Button type="button" disabled>
              Speichern im Mock nicht aktiv
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diese Woche</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {plannedEvents.map((event) => (
              <div key={event.title} className="rounded-xl border border-border bg-surface-muted p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.day}, {event.time}
                    </p>
                  </div>
                  <Badge>{event.type}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.focus}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <EmptyState
        icon={CalendarPlus}
        title="Kalenderintegration kommt später"
        description="Im MVP bleibt der Planer bewusst manuell. So bleibt der Fokus auf Führungsvorbereitung statt Kalenderverwaltung."
      />
    </div>
  );
}
