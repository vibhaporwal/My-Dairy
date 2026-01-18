
export interface HabitEntry {
  id: string;
  date: string;
  happyReason: string;
  angerReason: string;
  thingsToImprove: string;
  screenTime: number; // in hours
  newLearnings: string;
  moodScore: number; // 1-10
  createdAt: number;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  JOURNAL = 'JOURNAL',
  NEW_ENTRY = 'NEW_ENTRY',
  INSIGHTS = 'INSIGHTS'
}

export interface AIInsight {
  summary: string;
  suggestions: string[];
  affirmation: string;
}
