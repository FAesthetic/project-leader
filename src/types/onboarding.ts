export type CoachingStyle = "klar-direkt" | "ausgewogen" | "sanft";

export type Workday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OnboardingFormValues = {
  name: string;
  age: number;
  currentRole: string;
  industry: string;
  teamSize: number;
  leadershipExperience: string;
  targetRole: string;
  careerGoals: string;
  currentChallenges: string;
  biggestStrength: string;
  developmentFields: string;
  stressTriggers: string;
  coachingStyle: CoachingStyle;
  dailyTrainingMinutes: number;
  workdays: Workday[];
  workStart: string;
  workEnd: string;
  trainOnDaysOff: boolean;
};

export type StartProfileValues = {
  name: string;
  age: number;
  role: string;
  teamSize: number;
  leadershipExperience: string;
  industryContext: string;
  currentTopic: string;
  goal: string;
  coachingStyle: CoachingStyle;
  trainingMinutes: number;
  trainingDays: Workday[];
  reminderTime: string;
};
