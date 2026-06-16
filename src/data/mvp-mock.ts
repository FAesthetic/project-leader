export const profileSnapshot = {
  name: "Mara",
  initials: "MB",
  role: "Teamlead in Produktentwicklung",
  level: "Emerging Lead",
  topField: "Erwartungen früher konkret machen",
  coachingStyle: "klar und direkt",
  streak: 8,
  weekProgress: 64,
  energy: 7,
  stress: 5,
};

export const todayFocus = {
  title: "Erwartung klar formulieren",
  model: "Delegationsmatrix / Erwartungsklärung",
  status: "offen",
  intention:
    "Formuliere heute bei einer echten Aufgabe Ergebnis, Zeitpunkt und Entscheidungsspielraum.",
  action:
    "Wähle eine Aufgabe, bei der du innerlich bereits unzufrieden bist. Sag klar, was du bis wann erwartest.",
  concreteSentence:
    "Ich erwarte bis Mittwoch folgendes Ergebnis: eine entscheidungsreife Empfehlung. Du entscheidest den Weg. Bitte melde dich früh, wenn Termin oder Qualität kippen.",
  reflection: "Konnte die andere Person deine Erwartung wiederholen?",
};

export const weeklyPattern = {
  title: "Klarheit kommt oft erst nach Frust",
  text:
    "Du formulierst Erwartungen häufig erst, wenn bereits Spannung entstanden ist.",
  nextMove:
    "Morgen zuerst Ergebnis, Rahmen und Entscheidungsspielraum klären. Danach erst über Gründe sprechen.",
};

export const trainingWeek = [
  {
    id: "influence-monday",
    day: "Mo",
    status: "erledigt",
    focus: "Einflussbereich klären",
    model: "Circle of Influence",
    goal: "Druck sortieren, bevor du Aktionismus startest.",
    exercise:
      "Sortiere eine belastende Situation in Kontrolle, Einfluss und Akzeptanz.",
    application:
      "Notiere drei Punkte: Was entscheide ich? Was kann ich beeinflussen? Was muss ich bewusst loslassen?",
    sentence:
      "Was davon liegt heute wirklich in meinem Einfluss, und was lasse ich bewusst stehen?",
    duration: "12 Min.",
    reflection: "Welche Energie ging heute in Dinge, die nicht in deinem Einfluss lagen?",
  },
  {
    id: "expectation-tuesday",
    day: "Di",
    status: "offen",
    focus: "Sag klar, was du bis wann erwartest.",
    model: "Delegationsmatrix",
    goal: "Eine unausgesprochene Erwartung in einen konkreten Führungsauftrag übersetzen.",
    exercise:
      "Wähle eine Aufgabe, bei der du innerlich bereits unzufrieden bist.",
    application:
      "Formuliere vor dem Gespräch Ergebnis, Zeitpunkt, Entscheidungsspielraum und Eskalationsgrenze.",
    sentence:
      "Ich erwarte bis [Zeitpunkt] folgendes Ergebnis: [Ergebnis]. Du entscheidest [Spielraum]. Bitte melde dich früh, wenn [Risiko].",
    duration: "10 Min.",
    reflection: "Konnte die andere Person deine Erwartung wiederholen?",
  },
  {
    id: "delegation-wednesday",
    day: "Mi",
    status: "offen",
    focus: "Übergib Verantwortung, ohne sie innerlich zurückzunehmen.",
    model: "Delegationsmatrix",
    goal: "Rückdelegation erkennen und den Verantwortungsgrad sauber klären.",
    exercise:
      "Prüfe eine Aufgabe, die wieder bei dir gelandet ist. Entscheide bewusst, was wirklich bei dir bleiben muss.",
    application:
      "Kläre Ergebnis, Kontrollpunkte und Grenzen. Halte dich danach aus dem Weg heraus.",
    sentence:
      "Du entscheidest den Weg. Ich möchte nur bei Budget, Terminrisiko oder Außenwirkung eingebunden werden.",
    duration: "15 Min.",
    reflection: "Wo hast du geholfen, obwohl Verantwortung beim Gegenüber bleiben sollte?",
  },
  {
    id: "stress-thursday",
    day: "Do",
    status: "optional",
    focus: "Erkenne früher, wann du gelb wirst.",
    model: "Resilienz-Stressampel",
    goal: "Belastung früher bemerken, bevor dein Führungsverhalten enger wird.",
    exercise:
      "Definiere drei gelbe Signale und eine konkrete Gegenmaßnahme für jedes Signal.",
    application:
      "Wenn ein gelbes Signal auftaucht, unterbrich kurz und entscheide deinen nächsten Führungszug bewusst.",
    sentence:
      "Ich merke, dass gerade Druck entsteht. Ich sortiere kurz und komme mit einem klaren nächsten Schritt zurück.",
    duration: "8 Min.",
    reflection: "Was war heute stärker als dein Vorhaben?",
  },
  {
    id: "review-friday",
    day: "Fr",
    status: "frei",
    focus: "Ein Muster erkennen, eine Sache ändern.",
    model: "Growth Mindset",
    goal: "Die Woche nicht bewerten, sondern in Training übersetzen.",
    exercise:
      "Wähle ein wiederkehrendes Muster und entscheide eine konkrete Verhaltensänderung für nächste Woche.",
    application:
      "Formuliere: Wenn [Situation], dann [konkreter Führungszug].",
    sentence:
      "Nächste Woche kläre ich Erwartungen früher, nicht erst wenn Reibung sichtbar wird.",
    duration: "10 Min.",
    reflection: "Was wiederholt sich, und was machst du nächste Woche anders?",
  },
];

export const quickLogs = [
  {
    id: "log-prio-change",
    title: "Kurzfristige Prioritätsänderung",
    employeeId: null,
    people: "Projektteam",
    category: "Entscheidung",
    urgency: "Heute reflektieren",
    emotion: "angespannt",
    status: "wartet auf Reflexion",
    mood: "angespannt, aber handlungsfähig",
    note:
      "Ich habe erklärt, was sich ändert, aber zu wenig Raum für Rückfragen gelassen.",
    summary:
      "Die Entscheidung war klar, der Beteiligungsraum war zu eng. Das Team brauchte mehr Einordnung.",
    suggestedModel: "Stakeholder-Mapping",
    nextStep: "Beim nächsten Mal erst Kontext geben, dann Entscheidungsspielraum benennen.",
    reflectTonight: true,
  },
  {
    id: "log-lisa-role",
    title: "1:1 zu neuer Verantwortung",
    employeeId: "employee-lisa",
    people: "Lisa",
    category: "Delegation/Rückdelegation",
    urgency: "Follow-up nötig",
    emotion: "ruhig",
    status: "Follow-up offen",
    mood: "klar",
    note:
      "Gute Energie. Der nächste Schritt braucht noch einen konkreten Entscheidungsspielraum.",
    summary:
      "Lisa übernimmt mehr Verantwortung, braucht aber klare Grenzen für eigene Entscheidungen.",
    suggestedModel: "Delegationsmatrix",
    nextStep: "Entscheidungsspielraum vor dem nächsten Auftrag schriftlich festhalten.",
    reflectTonight: true,
  },
  {
    id: "log-max-feedback",
    title: "Feedback an Max verschoben",
    employeeId: "employee-max",
    people: "Max",
    category: "Feedback",
    urgency: "Heute reflektieren",
    emotion: "unsicher",
    status: "wartet auf Reflexion",
    mood: "unruhig",
    note:
      "Ich habe das Feedback nicht gegeben, weil der Moment hektisch war. Eigentlich war ich nicht klar vorbereitet.",
    summary:
      "Das Feedback wurde verschoben, weil die Erwartung und der Einstieg noch nicht klar waren.",
    suggestedModel: "Feedbackmodell",
    nextStep: "Beobachtung, Wirkung und Erwartung vor dem Gespräch notieren.",
    reflectTonight: true,
  },
];

export const commitments = [
  {
    id: "commit-lisa-plan",
    title: "Rückmeldung zum Verantwortungsrahmen an Lisa geben",
    description: "Entscheidungsspielraum für das neue Aufgabenpaket konkretisieren.",
    type: "Zusage an Mitarbeiter",
    employeeId: "employee-lisa",
    dueDate: "Mi",
    status: "offen",
    priority: "hoch",
  },
  {
    id: "commit-team-decision",
    title: "Entscheidung zu Aufgabe X bis Mittwoch kommunizieren",
    description: "Team braucht Klarheit, was diese Woche wirklich Vorrang hat.",
    type: "Entscheidung offen",
    employeeId: null,
    dueDate: "Mi",
    status: "offen",
    priority: "mittel",
  },
  {
    id: "commit-max-feedback",
    title: "Feedback an Max nachreichen",
    description: "Konkrete Beobachtung und Erwartung vorbereiten.",
    type: "Feedback nachreichen",
    employeeId: "employee-max",
    dueDate: "Heute",
    status: "überfällig",
    priority: "hoch",
  },
];

export const journalPrompts = {
  evening: [
    "Welche Situation war heute am wichtigsten?",
    "Was hast du gut geführt?",
    "Was war unklar, vermieden oder nicht konsequent genug?",
    "Was machst du morgen konkret anders?",
  ],
  behaviorChecks: [
    "Ich war klar.",
    "Ich blieb ruhig.",
    "Ich habe Verantwortung nicht unnötig übernommen.",
    "Ich habe eine Erwartung konkret formuliert.",
    "Ich habe eine Zusage nachgehalten.",
  ],
  systemic: [
    "Was war der sichtbare Anlass?",
    "Was war vermutlich das eigentliche Thema dahinter?",
    "Was war dein Anteil an der Situation?",
    "Welche Erwartung war unausgesprochen?",
    "Was lag in deinem Einflussbereich?",
    "Was wäre der nächste klare Führungszug?",
  ],
};

export const leadershipTools = [
  {
    title: "Circle of Influence",
    category: "Selbstführung",
    situations: ["Mein Team ist überlastet", "Ich bin genervt und werde unsauber"],
    fit: "Wenn du viel Energie in Dinge steckst, die du nicht kontrollieren kannst.",
    whenNot:
      "Nicht nutzen, um echte Verantwortung wegzuschieben oder notwendige Entscheidungen zu vermeiden.",
    application:
      "Sortiere die Situation in Kontrolle, Einfluss und Akzeptanz. Handle zuerst dort, wo Wirkung möglich ist.",
    mistake:
      "Du analysierst lange, aber triffst keinen nächsten Schritt in deinem Einflussbereich.",
    sentence:
      "Was davon liegt heute wirklich in meinem Einfluss, und was muss ich bewusst loslassen?",
    linkedTraining: "Einflussbereich klären",
  },
  {
    title: "Situatives Führen",
    category: "Teamführung",
    situations: ["Jemand liefert nicht wie vereinbart", "Ich will besser delegieren"],
    fit: "Wenn Menschen unterschiedlich viel Anleitung, Training oder Freiraum brauchen.",
    whenNot:
      "Nicht nutzen, um wechselhafte Führung als Flexibilität zu tarnen.",
    application:
      "Prüfe Kompetenz und Motivation für genau diese Aufgabe. Entscheide dann Anleitung, Coaching, Unterstützung oder Delegation.",
    mistake:
      "Du bewertest die Person pauschal statt den Reifegrad für die konkrete Aufgabe.",
    sentence:
      "Für diese Aufgabe gebe ich dir zuerst mehr Struktur. Beim nächsten Schritt erhöhen wir deinen Spielraum.",
    linkedTraining: "Verantwortung dosieren",
  },
  {
    title: "Gewaltfreie Kommunikation",
    category: "Kommunikation",
    situations: ["Ein Konflikt wird vermieden", "Ich muss ein schwieriges Gespräch führen"],
    fit: "Wenn Gespräche emotional werden oder Erwartungen hinter Vorwürfen verschwinden.",
    whenNot:
      "Nicht nutzen, um Klarheit endlos weich zu formulieren.",
    application:
      "Trenne Beobachtung, Wirkung, Bedürfnis und Bitte. Bleib konkret.",
    mistake:
      "Du machst aus der Methode eine lange Einleitung und kommst nicht zur Bitte.",
    sentence:
      "Mir ist aufgefallen, dass der Termin zweimal gerutscht ist. Ich brauche Verlässlichkeit. Bitte sag mir bis 15 Uhr, was realistisch ist.",
    linkedTraining: "Schwieriges Gespräch vorbereiten",
  },
  {
    title: "Delegationsmatrix",
    category: "Verantwortung",
    situations: ["Ich übernehme zu viel selbst", "Erwartungen sind unklar"],
    fit:
      "Wenn du Aufgaben übergibst, aber Verantwortung innerlich bei dir behältst oder Rückdelegation entsteht.",
    whenNot:
      "Nicht nutzen, wenn eine Aufgabe bewusst bei dir bleiben muss.",
    application:
      "Kläre Ergebnis, Entscheidungsspielraum, Kontrollpunkte und Eskalationsgrenzen.",
    mistake:
      "Du delegierst die Aufgabe, kontrollierst aber jeden Schritt und ziehst Verantwortung wieder zu dir.",
    sentence:
      "Du entscheidest den Weg. Ich möchte nur bei Budget, Terminrisiko oder Außenwirkung eingebunden werden.",
    linkedTraining: "Übergib Verantwortung",
  },
  {
    title: "Stakeholder-Mapping",
    category: "Wirkung",
    situations: ["Veränderung erzeugt Widerstand", "Ich muss priorisieren"],
    fit: "Wenn Widerstand weniger sachlich ist, als er auf den ersten Blick wirkt.",
    whenNot:
      "Nicht nutzen, um Menschen taktisch zu sortieren, statt offen zu klären.",
    application:
      "Ordne Einfluss, Haltung, Informationsbedarf und mögliche Sorge pro Beteiligtem.",
    mistake:
      "Du sammelst Namen, aber leitest keine konkrete Gesprächsstrategie ab.",
    sentence:
      "Welche Sorge hat diese Person vermutlich, und welche Information fehlt ihr gerade?",
    linkedTraining: "Entscheidung vorbereiten",
  },
  {
    title: "Resilienz-Stressampel",
    category: "Selbstführung",
    situations: ["Mein Team ist überlastet", "Ich bin genervt und werde unsauber"],
    fit: "Wenn Belastung früher erkannt statt spät repariert werden soll.",
    whenNot:
      "Nicht nutzen, um strukturelle Überlastung nur privat wegzuatmen.",
    application:
      "Definiere grüne, gelbe und rote Signale mit passenden Gegenmaßnahmen.",
    mistake:
      "Du erkennst rot erst, wenn dein Verhalten bereits eng oder hart geworden ist.",
    sentence:
      "Ich merke, dass ich gelb werde. Ich pausiere kurz und entscheide dann den nächsten Schritt.",
    linkedTraining: "Belastung früher erkennen",
  },
  {
    title: "Eisenhower-Matrix",
    category: "Priorisierung",
    situations: ["Ich muss priorisieren", "Ich übernehme zu viel selbst"],
    fit: "Wenn Dringlichkeit echte Wichtigkeit verdrängt.",
    whenNot:
      "Nicht nutzen, wenn du eigentlich eine harte Entscheidung vermeiden willst.",
    application:
      "Sortiere Aufgaben nach wichtig/dringend und entscheide, was du streichst, delegierst oder terminierst.",
    mistake:
      "Du priorisierst alles und verzichtest auf die eigentliche Entscheidung.",
    sentence:
      "Was ist wichtig genug, dass wir dafür etwas anderes bewusst später machen?",
    linkedTraining: "Priorität sichtbar machen",
  },
  {
    title: "Feedbackmodell",
    category: "Feedback",
    situations: ["Jemand liefert nicht wie vereinbart", "Ich muss ein schwieriges Gespräch führen"],
    fit: "Wenn Verhalten konkret angesprochen werden muss, ohne die Person anzugreifen.",
    whenNot:
      "Nicht nutzen, wenn du nur Dampf ablassen willst.",
    application:
      "Beschreibe Beobachtung, Wirkung, Erwartung und nächsten Schritt.",
    mistake:
      "Du sprichst über Haltung oder Charakter statt über beobachtbares Verhalten.",
    sentence:
      "Mir ist aufgefallen, dass die Zusage zweimal offen blieb. Das erzeugt Unsicherheit im Team. Ich erwarte, dass du Risiken früher meldest.",
    linkedTraining: "Feedback konkret machen",
  },
  {
    title: "Growth Mindset",
    category: "Entwicklung",
    situations: ["Leistung ansprechen", "Entwicklung ermöglichen"],
    fit: "Wenn aus Fehlern Training statt Rechtfertigung werden soll.",
    whenNot:
      "Nicht nutzen, um mangelnde Verbindlichkeit schönzureden.",
    application:
      "Trenne aktuellen Stand, Lernschritt und nächste Wiederholung.",
    mistake:
      "Du bleibst positiv, aber nicht verbindlich.",
    sentence:
      "Das Ergebnis passt noch nicht. Der nächste Lernschritt ist klar: Wir üben zuerst die Vorbereitung.",
    linkedTraining: "Lernen sichtbar machen",
  },
  {
    title: "Erwartungsklärung",
    category: "Klarheit",
    situations: ["Erwartungen sind unklar", "Ich will besser delegieren"],
    fit: "Wenn Frust entsteht, weil Ergebnis, Zeitpunkt oder Spielraum nie klar ausgesprochen wurden.",
    whenNot:
      "Nicht nutzen, um jedes Detail vorzugeben.",
    application:
      "Kläre Ergebnis, Zeitpunkt, Qualität, Spielraum und Meldepunkt.",
    mistake:
      "Du sagst, was du nicht willst, aber nicht, was gutes Ergebnis bedeutet.",
    sentence:
      "Gutes Ergebnis heißt hier: [Ergebnis] bis [Zeitpunkt] mit [Qualitätskriterium].",
    linkedTraining: "Sag klar, was du erwartest",
  },
];

export const toolSituations = [
  "Ich muss ein schwieriges Gespräch führen",
  "Erwartungen sind unklar",
  "Ich übernehme zu viel selbst",
  "Jemand liefert nicht wie vereinbart",
  "Ein Konflikt wird vermieden",
  "Mein Team ist überlastet",
  "Ich muss priorisieren",
  "Ich bin genervt und werde unsauber",
  "Veränderung erzeugt Widerstand",
  "Ich will besser delegieren",
];

export const progressSignals = [
  { label: "Situationen reflektiert", value: "3", change: "diese Woche" },
  { label: "Erwartungen konkret formuliert", value: "2", change: "seit Montag" },
  { label: "Offene Zusagen", value: "1", change: "heute fällig" },
  { label: "Muster erkannt", value: "1", change: "Klarheit kommt spät" },
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
    title: "Prioritäten klären",
    focus: "Kontext geben, Entscheidungsspielraum sichtbar machen",
  },
  {
    day: "Donnerstag",
    time: "09:00",
    type: "Stakeholder-Gespräch",
    title: "Rahmenbedingungen abstimmen",
    focus: "Einflussbereich und Risiken trennen",
  },
];

export const employees = [
  {
    id: "employee-lisa",
    name: "Lisa",
    initials: "LS",
    role: "Projektverantwortung",
    team: "Produktteam",
    contextNote:
      "Übernimmt gerade mehr Verantwortung und braucht klare Entscheidungsspielräume.",
    lastContact: "Gestern",
    nextFollowUp: "Mittwoch",
    openCommitments: 1,
    pattern: "Fragt spät nach, wenn Grenzen unklar sind.",
    perception: {
      expectationClarity: "mittel",
      trust: "hoch",
      autonomy: "wächst",
      energy: "stabil",
      reliability: "hoch",
      developmentNeed: "Entscheidungsspielraum früher klären",
      communicationNeed: "kurze Vorabklärung vor neuen Aufgaben",
    },
    conversations: [
      {
        date: "Gestern",
        type: "1:1",
        leadershipGoal: "Verantwortung dosiert erweitern",
        summary:
          "Neue Aufgabe besprochen. Lisa wirkt motiviert, braucht aber klaren Rahmen für Entscheidungen.",
        perceivedEffect: "Mehr Sicherheit, sobald Grenzen ausgesprochen wurden.",
        openPoints: "Budgetgrenze und Eskalationspunkt schriftlich festhalten.",
        nextStep: "Verantwortungsrahmen bis Mittwoch schicken.",
      },
    ],
  },
  {
    id: "employee-max",
    name: "Max",
    initials: "MX",
    role: "Fachexperte",
    team: "Produktteam",
    contextNote:
      "Sehr stark fachlich, reagiert aber empfindlich auf unklare Prioritäten.",
    lastContact: "Heute",
    nextFollowUp: "Heute",
    openCommitments: 1,
    pattern: "Feedback wird leicht verschoben, wenn es hektisch ist.",
    perception: {
      expectationClarity: "niedrig",
      trust: "mittel",
      autonomy: "hoch",
      energy: "angespannt",
      reliability: "mittel",
      developmentNeed: "Verbindlichkeit in Zwischenständen",
      communicationNeed: "früher Risiken melden",
    },
    conversations: [
      {
        date: "Montag",
        type: "Feedback",
        leadershipGoal: "Verbindlichkeit ohne Vorwurf klären",
        summary:
          "Zwischenstand kam später als vereinbart. Gespräch wurde verschoben und braucht Vorbereitung.",
        perceivedEffect: "Thema bleibt offen und kostet Energie.",
        openPoints: "Beobachtung und Erwartung konkret vorbereiten.",
        nextStep: "Feedback heute nachreichen.",
      },
    ],
  },
  {
    id: "employee-noah",
    name: "Noah",
    initials: "NH",
    role: "Koordination",
    team: "Projektteam",
    contextNote:
      "Stabiler Umsetzer, braucht bei Veränderungen frühe Einordnung.",
    lastContact: "Freitag",
    nextFollowUp: "Nächste Woche",
    openCommitments: 0,
    pattern: "Fragt aktiv nach Prioritäten, wenn Ziele konkurrieren.",
    perception: {
      expectationClarity: "hoch",
      trust: "hoch",
      autonomy: "hoch",
      energy: "stabil",
      reliability: "hoch",
      developmentNeed: "Stakeholder früher einbinden",
      communicationNeed: "kurze Vorabinfo bei Richtungswechseln",
    },
    conversations: [
      {
        date: "Freitag",
        type: "Entwicklung",
        leadershipGoal: "Mehr Stakeholder-Wirkung aufbauen",
        summary:
          "Nächster Entwicklungsschritt ist nicht Fachlichkeit, sondern frühere Einbindung der richtigen Personen.",
        perceivedEffect: "Hohe Bereitschaft, wenn Erwartung konkret ist.",
        openPoints: "Nächstes Meeting gemeinsam vorbereiten.",
        nextStep: "Stakeholder-Mapping auf echte Situation anwenden.",
      },
    ],
  },
];

export const aiGuidance = {
  quickLog: {
    title: "Feedback an Max verschoben",
    summary:
      "Die Situation zeigt kein Zeitproblem, sondern eine fehlende Gesprächsvorbereitung.",
    category: "Feedback",
    detectedPattern: "Du wartest mit Klarheit, um nicht hart zu wirken.",
    suggestedModel: "Feedbackmodell",
    reflectionQuestions: [
      "Welche konkrete Beobachtung willst du ansprechen?",
      "Welche Erwartung muss danach klar sein?",
    ],
    possibleCommitments: [
      {
        title: "Feedback an Max nachreichen",
        type: "Feedback nachreichen",
        dueDate: "Heute",
      },
    ],
    nextLeadershipImpulse:
      "Bereite Beobachtung, Wirkung und Erwartung vor, bevor du in das Gespräch gehst.",
    exampleSentence:
      "Mir ist aufgefallen, dass der Zwischenstand später kam als vereinbart. Das erschwert Planung. Ich erwarte, dass du Risiken früher meldest.",
  },
  journal: {
    reflectionNote:
      "Du hast heute viel erklärt, aber die Erwartung erst spät konkret gemacht. Dadurch blieb das Gespräch länger in Rechtfertigung als nötig.",
    pattern: "Du wartest mit Klarheit, um nicht hart zu wirken.",
    nextImpulse:
      "Morgen zuerst Ergebnis, Rahmen und Entscheidungsspielraum klären. Danach erst über Gründe sprechen.",
    recommendedTraining: "Sag klar, was du bis wann erwartest.",
    recommendedModel: "Erwartungsklärung",
    exampleSentence:
      "Ich möchte zuerst das erwartete Ergebnis klären. Danach schauen wir gemeinsam auf Hindernisse.",
    openFollowUps: ["Feedback an Max nachreichen"],
  },
};
