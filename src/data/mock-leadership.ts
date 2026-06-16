import type {
  MvpPillar,
  ProductPrinciple,
  TrainingPreviewDay,
} from "@/types/mvp";

export const mvpPillars: MvpPillar[] = [
  {
    title: "Fokus setzen",
    description:
      "Der Tag startet mit Energie, Stresslevel, Führungsziel und einem konkreten Vorhaben.",
    status: "als nächstes",
  },
  {
    title: "Situationen erfassen",
    description:
      "Quick Logs halten wichtige Führungsmomente fest, bevor sie im Tagesgeschäft verschwinden.",
    status: "als nächstes",
  },
  {
    title: "Abends reflektieren",
    description:
      "Das Journal fragt nicht nach Ausreden, sondern nach Mustern, Einflussbereich und Lernpunkt.",
    status: "als nächstes",
  },
  {
    title: "Werkzeuge anwenden",
    description:
      "Wähle zuerst deine Situation. Die App zeigt dir das passende Werkzeug.",
    status: "als nächstes",
  },
];

export const trainingPreview: TrainingPreviewDay[] = [
  {
    day: "Mo",
    focus: "Einflussbereich klären",
    model: "Circle of Influence",
    duration: "12 Min.",
  },
  {
    day: "Di",
    focus: "Erwartung klar formulieren",
    model: "Erwartungsklärung",
    duration: "10 Min.",
  },
  {
    day: "Mi",
    focus: "Entscheidung vorbereiten",
    model: "Stakeholder-Mapping",
    duration: "15 Min.",
  },
  {
    day: "Do",
    focus: "Früh erkennen, wann du gelb wirst",
    model: "Resilienz-Stressampel",
    duration: "8 Min.",
  },
];

export const productPrinciples: ProductPrinciple[] = [
  {
    title: "Sparringspartner, kein Therapeut",
    description:
      "Die App spiegelt klar, bleibt entwicklungsorientiert und stellt keine Diagnosen.",
  },
  {
    title: "Branchenneutral",
    description:
      "Project Leadership funktioniert für Teamleads, Projektverantwortliche, Manager und Menschen mit Führungsambition.",
  },
  {
    title: "Datensparsam gedacht",
    description:
      "Persönliche Reflexionsdaten werden später nur zweckgebunden verarbeitet und nicht unnötig an KI gesendet.",
  },
];
