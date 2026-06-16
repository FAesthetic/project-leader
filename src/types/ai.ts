export type QuickLogAnalysis = {
  title: string;
  summary: string;
  category: string;
  detected_pattern: string;
  suggested_model: string;
  reflection_questions: string[];
  possible_commitments: Array<{
    title: string;
    type: string;
    due_date: string | null;
  }>;
  next_leadership_impulse: string;
  example_sentence: string;
};

export type JournalAnalysis = {
  reflection_note: string;
  pattern: string;
  next_impulse: string;
  recommended_training: string;
  recommended_model: string;
  example_sentence: string;
  open_follow_ups: string[];
};

export type EmployeePatternAnalysis = {
  recurring_topics: string[];
  open_expectations: string[];
  relationship_notes: string;
  recommended_next_conversation: string;
  recommended_model: string;
};
