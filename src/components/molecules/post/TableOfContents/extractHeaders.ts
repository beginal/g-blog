import { TocItem } from "./TableOfContents.types";

export function extractHeaders(content: string): TocItem[] {
  const headers: TocItem[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s가-힣]/g, '')
        .replace(/\s+/g, '-');
      
      headers.push({ id, text, level });
    }
  });
  
  return headers;
}