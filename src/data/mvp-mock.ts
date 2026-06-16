export const profileSnapshot = {
  name: "Mara",
  role: "Teamlead in Entwicklung",
  level: "Emerging Lead",
  topField: "Klarheit in schwierigen Gesprächen",
  coachingStyle: "klar und direkt",
  streak: 8,
  weekProgress: 64,
  energy: 7,
  stress: 5,
};

export const todayFocus = {
  title: "Erwartung vor Reaktion klären",
  model: "Circle of Influence",
  intention:
    "Vor dem nächsten Gespräch erst trennen: Was liegt in meinem Einflussbereich, was nicht?",
  action: "Eine klare Erwartung formulieren und eine offene Frage stellen.",
  reflection: "Wo habe ich heute Verantwortung übernommen, ohne alles kontrollieren zu wollen?",
};

export const trainingWeek = [
  {
    day: "Mo",
    status: "erledigt",
    focus: "Einflussbereich klären",
    model: "Circle of Influence",
    exercise: "Drei Stressfaktoren sortieren: kontrollierbar, beeinflussbar, zu akzeptieren.",
    duration: "12 Min.",
    reflection: "Welche Energie ging heute in Dinge, die nicht in deinem Einfluss lagen?",
  },
  {
    day: "Di",
    status: "offen",
    focus: "Erwartungen sichtbar machen",
    model: "Feedbackmodell",
    exercise: "Eine unausgesprochene Erwartung in einen klaren Satz übersetzen.",
    duration: "10 Min.",
    reflection: "Welche Erwartung war heute zu vage?",
  },
  {
    day: "Mi",
    status: "offen",
    focus: "Delegation sauber machen",
    model: "Delegationsmatrix",
    exercise: "Eine Aufgabe mit Ergebnis, Rahmen und Entscheidungsspielraum übergeben.",
    duration: "15 Min.",
    reflection: "Wo hast du geholfen, obwohl Verantwortung besser beim Gegenüber geblieben wäre?",
  },
  {
    day: "Do",
    status: "optional",
    focus: "Belastung regulieren",
    model: "Resilienz-Stressampel",
    exercise: "Drei Signale für gelb/rot notieren und eine Gegenmaßnahme wählen.",
    duration: "8 Min.",
    reflection: "Was war heute stärker als dein Vorhaben?",
  },
  {
    day: "Fr",
    status: "frei",
    focus: "Wochenreflexion",
    model: "Growth Mindset",
    exercise: "Ein Muster, ein Lernpunkt, ein nächster Führungsimpuls.",
    duration: "10 Min.",
    reflection: "Was wiederholt sich und was machst du nächste Woche anders?",
  },
];

export const quickLogs = [
  {
    title: "Kurzfristige Prioritätsänderung",
    people: "Projektteam",
    category: "Priorisierung",
    mood: "angespannt, aber handlungsfähig",
    note: "Ich habe zuerst erklärt, was sich ändert, aber zu wenig Raum für Rückfragen gelassen.",
    reflectTonight: true,
  },
  {
    title: "1:1 mit neuer Verantwortung",
    people: "Teammitglied",
    category: "Entwicklung",
    mood: "klar",
    note: "Gute Energie. Nächster Schritt braucht noch einen konkreten Entscheidungsspielraum.",
    reflectTonight: true,
  },
  {
    title: "Stakeholder-Rückfrage",
    people: "Bereichsübergreifend",
    category: "Kommunikation",
    mood: "ruhig",
    note: "Kurz gehalten, klare nächste Rückmeldung zugesagt.",
    reflectTonight: false,
  },
];

export const journalPrompts = {
  morning: [
    "Energielevel 1–10",
    "Stresslevel 1–10",
    "Tagesziel",
    "Erwartete wichtige Führungssituation",
    "Konkretes Vorhaben",
    "Optionaler Freitext",
  ],
  evening: [
    "Was habe ich heute umgesetzt?",
    "Was habe ich nicht umgesetzt?",
    "Bewertung 1–10",
    "Welche Situation war heute am wichtigsten?",
    "Was hat dazu geführt, dass einzelne Vorhaben nicht umgesetzt wurden?",
    "Was lerne ich daraus für morgen?",
  ],
  systemic: [
    "Was war der sichtbare Anlass?",
    "Was war vermutlich das eigentliche Thema dahinter?",
    "Was war dein Anteil an der Situation?",
    "Was war der Anteil der anderen Person?",
    "Welche Erwartung war klar?",
    "Welche Erwartung war unausgesprochen?",
    "Welche Dynamik könnte sich wiederholen?",
    "Was lag in deinem Einflussbereich?",
    "Was lag außerhalb deines Einflussbereichs?",
    "Welche Rahmenbedingung musst du akzeptieren?",
    "Welche konkrete Führungsintervention wäre jetzt sinnvoll?",
    "Was wäre der nächste saubere Führungsimpuls?",
  ],
};

export const leadershipModels = [
  {
    title: "Circle of Influence",
    category: "Selbstführung",
    fit: "Wenn Druck entsteht, aber nicht alles kontrollierbar ist.",
    use: "Sortiere Themen in Kontrolle, Einfluss und Akzeptanz. Handle dort, wo Wirkung möglich ist.",
  },
  {
    title: "Situatives Führen",
    category: "Teamführung",
    fit: "Wenn Menschen unterschiedlich viel Anleitung oder Freiraum brauchen.",
    use: "Passe Führungsstil an Kompetenz, Motivation und Reifegrad der Aufgabe an.",
  },
  {
    title: "Gewaltfreie Kommunikation",
    category: "Kommunikation",
    fit: "Wenn Konflikte emotional werden oder Erwartungen unklar bleiben.",
    use: "Trenne Beobachtung, Gefühl, Bedürfnis und Bitte.",
  },
  {
    title: "Delegationsmatrix",
    category: "Verantwortung",
    fit: "Wenn du zu viel selbst entscheidest oder Aufgaben zurückspringen.",
    use: "Kläre Ergebnis, Entscheidungsspielraum, Kontrollpunkte und Eskalationsgrenzen.",
  },
  {
    title: "Stakeholder-Mapping",
    category: "Wirkung",
    fit: "Wenn Veränderung nicht an der Sache, sondern an Interessen hängt.",
    use: "Ordne Einfluss, Haltung und Informationsbedarf der beteiligten Personen.",
  },
  {
    title: "Resilienz-Stressampel",
    category: "Resilienz",
    fit: "Wenn Belastung früh erkannt statt spät repariert werden soll.",
    use: "Definiere grüne, gelbe und rote Signale mit passenden Gegenmaßnahmen.",
  },
];

export const progressSignals = [
  { label: "Trainingstage", value: "11", change: "+3 diese Woche" },
  { label: "Reflektierte Situationen", value: "7", change: "4 mit Quick Log" },
  { label: "Ø Tagesbewertung", value: "7,4", change: "+0,6 zum Start" },
  { label: "Stärkstes Muster", value: "Klärung", change: "häufig vor Gesprächen" },
];

export const plannedEvents = [
  {
    day: "Dienstag",
    time: "10:30",
    type: "1:1",
    title: "Entwicklungsgespräch vorbereiten",
    focus: "Erwartung und nächster Verantwortungsgrad",
  },
  {
    day: "Mittwoch",
    time: "14:00",
    type: "Teamrunde",
    title: "Prioritäten für Sprint klären",
    focus: "Kontext geben, Entscheidung sichtbar machen",
  },
  {
    day: "Donnerstag",
    time: "09:00",
    type: "Stakeholder-Gespräch",
    title: "Rahmenbedingungen für Projekt abstimmen",
    focus: "Einflussbereich und Risiken sauber trennen",
  },
];

export const aiMockFeedback = {
  headline: "Muster im Mock: Du klärst viel über Leistung, aber noch zu wenig über Erwartung.",
  body:
    "Der nächste saubere Führungsimpuls wäre, vor dem Gespräch eine konkrete Erwartung und eine offene Frage zu formulieren. Das ist keine KI-Analyse, sondern ein statischer MVP-Text.",
};
