import { z } from "zod";

export const onboardingSchema = z
  .object({
    name: z.string().trim().min(2, "Gib bitte einen Namen ein."),
    age: z
      .number()
      .int("Das Alter braucht eine ganze Zahl.")
      .min(16, "Das Alter wirkt zu niedrig für dieses Training.")
      .max(100, "Bitte prüfe den Alterswert."),
    currentRole: z.string().min(1, "Wähle deine aktuelle Rolle aus."),
    industry: z.string().trim().min(2, "Gib bitte einen Kontext oder eine Branche ein."),
    teamSize: z
      .number()
      .int("Die Teamgröße braucht eine ganze Zahl.")
      .min(0, "Teamgröße kann nicht negativ sein.")
      .max(100000, "Bitte prüfe die Teamgröße."),
    leadershipExperience: z
      .string()
      .min(1, "Wähle deine Führungserfahrung aus."),
    targetRole: z.string().trim().min(2, "Beschreibe kurz deine Zielrolle."),
    careerGoals: z.string().trim().min(10, "Beschreibe dein Ziel etwas konkreter."),
    currentChallenges: z
      .string()
      .trim()
      .min(10, "Beschreibe mindestens eine aktuelle Herausforderung."),
    biggestStrength: z.string().trim().min(3, "Nenne eine Stärke."),
    developmentFields: z
      .string()
      .trim()
      .min(10, "Nenne mindestens ein Entwicklungsfeld."),
    stressTriggers: z
      .string()
      .trim()
      .min(5, "Nenne typische Stressauslöser oder Belastungsfaktoren."),
    coachingStyle: z.enum(["klar-direkt", "ausgewogen", "sanft"]),
    dailyTrainingMinutes: z
      .number()
      .int("Die Trainingszeit braucht eine ganze Zahl.")
      .min(5, "Plane mindestens 5 Minuten ein.")
      .max(90, "Für den MVP ist ein realistischer Tagesrahmen bis 90 Minuten vorgesehen."),
    workdays: z
      .array(z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]))
      .min(1, "Wähle mindestens einen Arbeitstag aus."),
    workStart: z.string().regex(/^\d{2}:\d{2}$/, "Gib eine gültige Startzeit ein."),
    workEnd: z.string().regex(/^\d{2}:\d{2}$/, "Gib eine gültige Feierabendzeit ein."),
    trainOnDaysOff: z.boolean(),
  })
  .refine((values) => values.workStart < values.workEnd, {
    message: "Der Feierabend muss nach dem Arbeitsbeginn liegen.",
    path: ["workEnd"],
  });

export type OnboardingSchemaInput = z.input<typeof onboardingSchema>;
export type OnboardingSchemaValues = z.output<typeof onboardingSchema>;
