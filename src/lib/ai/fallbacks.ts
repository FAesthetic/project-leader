import type {
  EmployeePatternAnalysis,
  JournalAnalysis,
  QuickLogAnalysis,
} from "@/types/ai";

export const quickLogAnalysisFallback: QuickLogAnalysis = {
  title: "Führungssituation",
  summary: "Die Situation wurde gespeichert und kann später reflektiert werden.",
  category: "Kommunikation",
  detected_pattern:
    "Für eine Musteranalyse braucht die App mehrere gespeicherte Logs.",
  suggested_model: "Erwartungsklärung",
  reflection_questions: [
    "Was war in dieser Situation wirklich unklar?",
    "Was lag in deinem Einflussbereich?",
  ],
  possible_commitments: [],
  next_leadership_impulse:
    "Formuliere den nächsten Führungszug als konkrete Handlung.",
  example_sentence:
    "Ich möchte zuerst das erwartete Ergebnis klären. Danach sprechen wir über Hindernisse.",
};

export const journalAnalysisFallback: JournalAnalysis = {
  reflection_note:
    "Die Reflexion ist gespeichert. Ein Muster wird sichtbarer, wenn mehrere Tage zusammenkommen.",
  pattern: "Noch kein belastbares Muster erkannt.",
  next_impulse:
    "Wähle morgen eine Situation und kläre Ergebnis, Rahmen und Entscheidungsspielraum früh.",
  recommended_training: "Erwartung klar formulieren",
  recommended_model: "Erwartungsklärung",
  example_sentence:
    "Gutes Ergebnis heißt hier: [Ergebnis] bis [Zeitpunkt] mit [Qualitätskriterium].",
  open_follow_ups: [],
};

export const employeePatternAnalysisFallback: EmployeePatternAnalysis = {
  recurring_topics: [],
  open_expectations: [],
  relationship_notes:
    "Noch nicht genug Gesprächsnotizen für ein belastbares Muster.",
  recommended_next_conversation:
    "Kläre im nächsten Gespräch Ergebnis, Spielraum und offene Zusagen.",
  recommended_model: "Delegationsmatrix",
};
