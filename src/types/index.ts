// Re-export all types for convenience
export * from "./common";
export * from "./post";
export * from "./ui";

// Legacy types for backward compatibility
export interface BlogPostProps {
  id: string;
  title: string;
  tags: string[];
  content: string;
  thumbnail?: string;
  created_at: string;
  updated_at?: string;
  quest?: Quest;
}

export type Quest = {
  question: string;
  options: string[];
  answerIndex: number;
  xp: number;
};
