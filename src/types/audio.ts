export type AudioCaptureMode = "quick-log" | "journal" | "reflection";

export type AudioSummary = {
  title: string;
  cleanedNote: string;
  leadershipSignal: string;
  nextStep: string;
  reflectionQuestion: string;
  tags: string[];
};

export type AudioTranscriptionResponse = {
  transcript: string;
  summary: AudioSummary | null;
  warning?: string;
};
