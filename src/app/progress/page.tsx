import { progressSignals, trainingWeek } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";

export default function ProgressPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Fortschritt"
        title="Entwicklung wird sichtbar, wenn Muster sichtbar werden."
        description="Der Mock zeigt Kennzahlen, die später aus Training, Quick Logs und Journalen entstehen."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {progressSignals.map((signal) => (
          <Card key={signal.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{signal.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.03em]">{signal.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{signal.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wochenlinie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trainingWeek.map((day, index) => (
            <div key={day.day} className="grid gap-3 rounded-xl bg-surface-muted p-4 md:grid-cols-[4rem_1fr_12rem] md:items-center">
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
    </div>
  );
}
