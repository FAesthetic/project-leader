"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  coachingStyles,
  leadershipExperienceOptions,
  roleOptions,
  workdayOptions,
} from "@/data/onboarding-options";
import {
  onboardingSchema,
  type OnboardingSchemaInput,
  type OnboardingSchemaValues,
} from "@/lib/onboarding/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/ui/section-header";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const defaultValues: OnboardingSchemaInput = {
  name: "",
  age: 30,
  currentRole: "",
  industry: "",
  teamSize: 5,
  leadershipExperience: "",
  targetRole: "",
  careerGoals: "",
  currentChallenges: "",
  biggestStrength: "",
  developmentFields: "",
  stressTriggers: "",
  coachingStyle: "klar-direkt",
  dailyTrainingMinutes: 15,
  workdays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  workStart: "09:00",
  workEnd: "17:00",
  trainOnDaysOff: false,
};

export function OnboardingForm() {
  const [submittedProfile, setSubmittedProfile] =
    useState<OnboardingSchemaValues | null>(null);

  const form = useForm<
    OnboardingSchemaInput,
    unknown,
    OnboardingSchemaValues
  >({
    resolver: zodResolver(onboardingSchema),
    defaultValues,
    mode: "onSubmit",
  });

  function onSubmit(values: OnboardingSchemaValues) {
    setSubmittedProfile(values);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <SectionHeader
        eyebrow="Startprofil"
        title="Kläre den Rahmen, bevor das Training startet."
        description="Einmal beim Einstieg, später im Profil anpassbar: Ausgangslage, Zielbild, Entwicklungsfelder und Arbeitsrhythmus. Im Mock ohne Speicherung und ohne KI-Anfrage."
      />

      <div className="grid gap-2 sm:grid-cols-3">
        {["Profil", "Zielbild", "Trainingsrhythmus"].map((step, index) => (
          <div
            key={step}
            className="rounded-xl border border-border bg-surface/70 px-4 py-3"
          >
            <p className="text-xs font-medium text-primary">Schritt {index + 1}</p>
            <p className="mt-1 text-sm font-semibold">{step}</p>
          </div>
        ))}
      </div>

      <Alert className="border-primary/25 bg-accent">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Datensparsam vorbereitet</AlertTitle>
        <AlertDescription>
          Freitexte werden hier nicht gespeichert und nicht an eine KI gesendet.
          Später muss jede Speicherung pro Nutzer mit RLS abgesichert werden.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Profilgrundlagen</CardTitle>
              <CardDescription>
                Der Kontext hilft später, Training und Reflexion richtig einzuordnen.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Wie möchtest du angesprochen werden?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alter</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={16}
                        max={100}
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.currentTarget.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aktuelle Rolle</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rolle auswählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branche oder Kontext</FormLabel>
                    <FormControl>
                      <Input placeholder="z. B. Tech, Bildung, Verwaltung" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teamgröße</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.currentTarget.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leadershipExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Führungserfahrung</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Erfahrung auswählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leadershipExperienceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Zielbild und Entwicklungsfelder</CardTitle>
              <CardDescription>
                Die Fragen zielen auf Muster und Einflussbereich, nicht auf
                Rechtfertigung.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="targetRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zielrolle</FormLabel>
                    <FormControl>
                      <Input placeholder="Welche Verantwortung willst du sauberer tragen?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="careerGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Karriereziele</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Was soll sich in den nächsten Monaten entwickeln?"
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentChallenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aktuelle Herausforderungen</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Welche Führungssituationen kosten gerade Klarheit oder Energie?"
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="biggestStrength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Größte Stärke</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="developmentFields"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Größte Entwicklungsfelder</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stressTriggers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typische Stressauslöser</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Coaching-Stil und Trainingsrhythmus</CardTitle>
              <CardDescription>
                Standard ist klar und direkt. Der Plan soll später realistisch
                zu Arbeitstagen und verfügbarer Zeit passen.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="coachingStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gewünschter Coaching-Stil</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid gap-3 lg:grid-cols-3"
                      >
                        {coachingStyles.map((style) => (
                          <Label
                            key={style.value}
                            className="flex min-h-28 cursor-pointer gap-3 rounded-xl border border-border bg-surface/70 p-4 text-sm transition hover:bg-secondary/70"
                          >
                            <RadioGroupItem value={style.value} />
                            <span>
                              <span className="block font-medium text-foreground">
                                {style.title}
                              </span>
                              <span className="mt-1 block leading-5 text-muted-foreground">
                                {style.description}
                              </span>
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="dailyTrainingMinutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trainingszeit pro Tag</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={5}
                          max={90}
                          {...field}
                          onChange={(event) =>
                            field.onChange(event.currentTarget.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arbeitsbeginn</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feierabend</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="workdays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arbeitstage</FormLabel>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                      {workdayOptions.map((day) => {
                        const checked = field.value.includes(day.value);

                        return (
                          <Label
                            key={day.value}
                            className="flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface/70 px-3 text-sm transition hover:bg-secondary/70"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(nextChecked) => {
                                const nextValue = nextChecked
                                  ? [...field.value, day.value]
                                  : field.value.filter((value) => value !== day.value);
                                field.onChange(nextValue);
                              }}
                            />
                            {day.label}
                          </Label>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trainOnDaysOff"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-4 rounded-md border border-border bg-background/50 p-4">
                    <div className="space-y-1">
                      <FormLabel>Training an freien Tagen aktiv?</FormLabel>
                      <p className="text-sm leading-6 text-muted-foreground">
                        Freie Tage bleiben sonst für Regeneration oder optionale
                        Selbstführung reserviert.
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              Der Klick erstellt nur eine lokale Mock-Zusammenfassung. Es wird
              nichts gespeichert und nichts an KI gesendet.
            </p>
            <Button type="submit" size="lg">
              Mock-Profil erstellen
            </Button>
          </div>
        </form>
      </Form>

      {submittedProfile ? (
        <Card className="border-emerald-500/25 bg-emerald-500/10">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-200">
              <CheckCircle2 className="h-5 w-5" aria-hidden />
            </div>
            <CardTitle>Startprofil bereit</CardTitle>
            <CardDescription>
              Diese Zusammenfassung ist die spätere Grundlage für
              Entwicklungsprofil und Trainingsplan.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <p>
              <span className="text-foreground">Rolle:</span>{" "}
              {submittedProfile.currentRole}
            </p>
            <p>
              <span className="text-foreground">Zielrolle:</span>{" "}
              {submittedProfile.targetRole}
            </p>
            <p>
              <span className="text-foreground">Trainingszeit:</span>{" "}
              {submittedProfile.dailyTrainingMinutes} Minuten pro Tag
            </p>
            <p>
              <span className="text-foreground">Coaching-Stil:</span>{" "}
              {coachingStyles.find(
                (style) => style.value === submittedProfile.coachingStyle
              )?.title ?? submittedProfile.coachingStyle}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
