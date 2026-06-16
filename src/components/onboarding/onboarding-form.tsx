"use client";

import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  coachingStyles,
  leadershipExperienceOptions,
  roleOptions,
  workdayOptions,
} from "@/data/onboarding-options";
import { todayFocus } from "@/data/mvp-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const leadershipTopics = [
  "Erwartungen klarer formulieren",
  "Schwierige Gespräche führen",
  "Delegieren ohne Rückdelegation",
  "Ruhig bleiben unter Druck",
  "Leistung ansprechen",
  "Konflikte klären",
  "Team priorisieren",
  "Veränderung erklären",
  "Verantwortung übernehmen, ohne alles selbst zu machen",
  "Sonstiges",
];

type OnboardingState = {
  name: string;
  age: string;
  role: string;
  teamSize: string;
  leadershipExperience: string;
  industryContext: string;
  currentTopic: string;
  goal: string;
  coachingStyle: string;
  trainingMinutes: string;
  trainingDays: string[];
  reminderTime: string;
};

const initialState: OnboardingState = {
  name: "",
  age: "30",
  role: "",
  teamSize: "5",
  leadershipExperience: "",
  industryContext: "",
  currentTopic: "",
  goal: "",
  coachingStyle: "klar-direkt",
  trainingMinutes: "10",
  trainingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  reminderTime: "18:00",
};

export function OnboardingForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState<OnboardingState>(initialState);
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const selectedTopic = profile.currentTopic || "Erwartungen klarer formulieren";
  const selectedCoachingStyle = useMemo(
    () =>
      coachingStyles.find((style) => style.value === profile.coachingStyle) ??
      coachingStyles[0],
    [profile.coachingStyle]
  );

  function updateField<Key extends keyof OnboardingState>(
    key: Key,
    value: OnboardingState[Key]
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function toggleTrainingDay(day: string) {
    setProfile((current) => {
      const nextDays = current.trainingDays.includes(day)
        ? current.trainingDays.filter((currentDay) => currentDay !== day)
        : [...current.trainingDays, day];

      return { ...current, trainingDays: nextDays };
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-7 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <SectionHeader
        eyebrow="Startprofil"
        title="Dein erstes Führungstraining vorbereiten."
        description="Ein Schritt nach dem anderen. Der Check-in passiert einmal beim Start und kann später im Profil angepasst werden."
      />

      <Card className="overflow-hidden">
        <CardHeader className="space-y-5">
          <div>
            <p className="text-sm font-medium text-primary">
              Schritt {stepIndex + 1} von {steps.length}
            </p>
            <Progress value={progress} className="mt-3" />
          </div>
          <div>
            <CardTitle className="text-2xl tracking-[-0.03em]">
              {currentStep.title}
            </CardTitle>
            {currentStep.description ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {currentStep.description}
              </p>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {stepIndex === 0 ? (
            <Input
              value={profile.name}
              onChange={(event) => updateField("name", event.currentTarget.value)}
              placeholder="Zum Beispiel: Mara"
              autoFocus
            />
          ) : null}

          {stepIndex === 1 ? (
            <Input
              type="number"
              min={16}
              max={100}
              value={profile.age}
              onChange={(event) => updateField("age", event.currentTarget.value)}
            />
          ) : null}

          {stepIndex === 2 ? (
            <OptionGrid
              options={roleOptions}
              value={profile.role}
              onChange={(value) => updateField("role", value)}
            />
          ) : null}

          {stepIndex === 3 ? (
            <Input
              type="number"
              min={0}
              value={profile.teamSize}
              onChange={(event) => updateField("teamSize", event.currentTarget.value)}
            />
          ) : null}

          {stepIndex === 4 ? (
            <OptionGrid
              options={leadershipExperienceOptions}
              value={profile.leadershipExperience}
              onChange={(value) => updateField("leadershipExperience", value)}
            />
          ) : null}

          {stepIndex === 5 ? (
            <Input
              value={profile.industryContext}
              onChange={(event) =>
                updateField("industryContext", event.currentTarget.value)
              }
              placeholder="Zum Beispiel: Tech, Handel, Bildung, Verwaltung"
            />
          ) : null}

          {stepIndex === 6 ? (
            <OptionGrid
              options={leadershipTopics}
              value={profile.currentTopic}
              onChange={(value) => updateField("currentTopic", value)}
            />
          ) : null}

          {stepIndex === 7 ? (
            <Textarea
              value={profile.goal}
              onChange={(event) => updateField("goal", event.currentTarget.value)}
              placeholder="Was soll sich durch dein Training konkret verbessern?"
              className="min-h-36"
            />
          ) : null}

          {stepIndex === 8 ? (
            <RadioGroup
              value={profile.coachingStyle}
              onValueChange={(value) => updateField("coachingStyle", value)}
              className="grid gap-3"
            >
              {coachingStyles.map((style) => (
                <Label
                  key={style.value}
                  className="flex min-h-24 cursor-pointer gap-3 rounded-2xl border border-border bg-surface/70 p-4 text-sm transition hover:bg-secondary/70"
                >
                  <RadioGroupItem value={style.value} />
                  <span>
                    <span className="block font-medium text-foreground">
                      {style.title}
                    </span>
                    <span className="mt-1 block leading-6 text-muted-foreground">
                      {style.description}
                    </span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          ) : null}

          {stepIndex === 9 ? (
            <div className="grid gap-5">
              <Label className="space-y-2">
                <span>Wie viele Minuten pro Tag willst du investieren?</span>
                <Select
                  value={profile.trainingMinutes}
                  onValueChange={(value) => updateField("trainingMinutes", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["5", "10", "15", "20"].map((minutes) => (
                      <SelectItem key={minutes} value={minutes}>
                        {minutes} Minuten
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Label>

              <div>
                <p className="mb-3 text-sm font-medium">
                  An welchen Tagen willst du trainieren?
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {workdayOptions.map((day) => {
                    const checked = profile.trainingDays.includes(day.value);

                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleTrainingDay(day.value)}
                        className={cn(
                          "h-12 rounded-2xl border text-sm font-medium transition-colors",
                          checked
                            ? "border-primary/40 bg-accent text-primary"
                            : "border-border bg-surface/70 text-muted-foreground"
                        )}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Label className="space-y-2">
                <span>Wann möchtest du an die Abendreflexion erinnert werden?</span>
                <Input
                  type="time"
                  value={profile.reminderTime}
                  onChange={(event) =>
                    updateField("reminderTime", event.currentTarget.value)
                  }
                />
              </Label>
            </div>
          ) : null}

          {isLastStep ? (
            <div className="space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                <CheckCircle2 className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  Dein erstes Führungstraining ist vorbereitet.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Thema: {selectedTopic}. Coaching-Stil: {selectedCoachingStyle.title}.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <SummaryCard label="Entwicklungsthema" value={selectedTopic} />
                <SummaryCard label="Heutiger Fokus" value={todayFocus.title} />
                <SummaryCard label="Werkzeug" value={todayFocus.model} />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/training">Training starten</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/quick-log">Erste Situation loggen</Link>
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
              disabled={stepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Zurück
            </Button>
            {!isLastStep ? (
              <Button
                type="button"
                onClick={() =>
                  setStepIndex((current) => Math.min(steps.length - 1, current + 1))
                }
              >
                Weiter
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            ) : (
              <Badge variant="outline">Startprofil bereit</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const steps = [
  {
    title: "Wie möchtest du angesprochen werden?",
  },
  {
    title: "Wie alt bist du?",
    description:
      "Alter kann Führungskontext beeinflussen, zum Beispiel wenn du deutlich jünger oder älter als dein Team bist.",
  },
  {
    title: "Welche Führungsrolle hast du aktuell?",
  },
  {
    title: "Für wie viele Menschen trägst du aktuell Führungsverantwortung?",
  },
  {
    title: "Wie viel Führungserfahrung hast du?",
  },
  {
    title: "In welchem Kontext führst du?",
  },
  {
    title: "Welche Führungssituation kostet dich gerade am meisten Klarheit oder Energie?",
  },
  {
    title: "Was soll sich durch dein Training konkret verbessern?",
  },
  {
    title: "Wie soll die App dich coachen?",
  },
  {
    title: "Wie soll dein Trainingsrhythmus aussehen?",
  },
  {
    title: "Dein erstes Führungstraining ist vorbereitet.",
  },
];

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors",
            value === option
              ? "border-primary/45 bg-accent text-foreground"
              : "border-border bg-surface/70 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-muted p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}
