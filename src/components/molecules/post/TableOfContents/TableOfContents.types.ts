export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  content: string;
  title?: string;
  className?: string;
  containerSelector?: string;
}