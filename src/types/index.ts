export type ContentBlock = { type: "paragraph"; text: string } | { type: "dialogue"; character: string; avatar: string; text: string };

export interface BlogPostProps {
  id: number;
  title: string;
  date: string;
  tags: string[];
  content: ContentBlock[];
  quest?: Quest;
}

export type Quest = {
  question: string;
  options: string[];
  answerIndex: number;
  xp: number;
};
