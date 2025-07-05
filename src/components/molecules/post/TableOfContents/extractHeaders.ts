import { TocItem } from "./TableOfContents.types";

export function extractHeaders(content: string): TocItem[] {
  const headers: TocItem[] = [];
  const lines = content.split('\n');
  const idCounter: { [key: string]: number } = {};
  
  lines.forEach((line, index) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      
      // 심플한 ID 생성: heading-index 형식 사용
      const baseId = `heading-${index}`;
      
      // 중복 방지를 위한 카운터
      if (idCounter[baseId]) {
        idCounter[baseId]++;
        const id = `${baseId}-${idCounter[baseId]}`;
        headers.push({ id, text, level });
      } else {
        idCounter[baseId] = 1;
        headers.push({ id: baseId, text, level });
      }
    }
  });
  
  return headers;
}