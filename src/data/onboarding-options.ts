import type { CoachingStyle, Workday } from "@/types/onboarding";

export const roleOptions = [
  "Angehende Führungskraft",
  "Teamlead",
  "Manager",
  "People Lead",
  "Projektverantwortliche Person",
  "Bereichsverantwortliche Person",
  "Unternehmerisch verantwortlich",
  "Laterale Führung",
  "Andere Rolle",
];

export const leadershipExperienceOptions = [
  "Noch keine formale Führungserfahrung",
  "Unter 1 Jahr",
  "1 bis 3 Jahre",
  "3 bis 7 Jahre",
  "Mehr als 7 Jahre",
];

export const coachingStyles: Array<{
  value: CoachingStyle;
  title: string;
  description: string;
}> = [
  {
    value: "klar-direkt",
    title: "klar und direkt",
    description: "Deutlich spiegeln, ohne zu beschamen.",
  },
  {
    value: "ausgewogen",
    title: "ausgewogen",
    description: "Direkte Impulse mit mehr Kontext und Einordnung.",
  },
  {
    value: "sanft",
    title: "sanft",
    description: "Ruhiger Ton mit kleinen, machbaren Schritten.",
  },
];

export const workdayOptions: Array<{
  value: Workday;
  label: string;
}> = [
  { value: "monday", label: "Mo" },
  { value: "tuesday", label: "Di" },
  { value: "wednesday", label: "Mi" },
  { value: "thursday", label: "Do" },
  { value: "friday", label: "Fr" },
  { value: "saturday", label: "Sa" },
  { value: "sunday", label: "So" },
];
