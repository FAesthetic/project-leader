import Link from "next/link";
import { BarChart3, CalendarDays, CheckCircle2, Circle, Coffee, SkipForward } from "lucide-react";

import { trainingWeek } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const statusIcon = {
  erledigt: CheckCircle2,
  offen: Circle,
  optional: SkipForward,
  frei: Coffee,
};

export default function TrainingPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Training"
        title="Eine Woche Führungstraining, zugeschnitten auf deinen Alltag."
        description="Plan, Übung und Entwicklung gehören zusammen. Fortschritt und geplante Führungssituationen liegen deshalb als Unterbereiche im Training."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/progress">
                <BarChart3 className="h-4 w-4" aria-hidden />
                Fortschritt
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/planner">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Planer
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-4">
        {trainingWeek.map((day) => {
          const Icon = statusIcon[day.status as keyof typeof statusIcon] ?? Circle;

          return (
            <Card key={day.day} className="overflow-hidden">
              <CardContent className="grid gap-5 p-5 lg:grid-cols-[7rem_1fr_12rem] lg:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{day.day}</p>
                    <Badge
                      variant="outline"
                      className={cn(day.status === "erledigt" && "border-primary/40 text-primary")}
                    >
                      {day.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.01em]">{day.focus}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{day.exercise}</p>
                  <p className="mt-3 text-sm text-foreground">{day.reflection}</p>
                </div>

                <div className="rounded-xl bg-surface-muted p-4">
                  <p className="text-sm font-medium">{day.model}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{day.duration}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
