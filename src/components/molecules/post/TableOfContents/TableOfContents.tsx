"use client";

import { useEffect, useState, useCallback } from "react";
import { TableOfContentsProps, TocItem } from "./TableOfContents.types";
import { extractHeaders } from "./extractHeaders";
import { cn } from "@/lib/utils";

export default function TableOfContents({ content, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headers, setHeaders] = useState<TocItem[]>([]);

  const addHeaderIds = useCallback((extractedHeaders: TocItem[]) => {
    const usedIds = new Set<string>();
    
    extractedHeaders.forEach((header) => {
      // 더 포괄적인 셀렉터 사용
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let matchFound = false;
      
      elements.forEach((el) => {
        const text = el.textContent?.trim();
        if (text === header.text && !el.id && !matchFound) {
          let uniqueId = header.id;
          let counter = 1;
          
          // ID 중복 처리
          while (usedIds.has(uniqueId) || document.getElementById(uniqueId)) {
            uniqueId = `${header.id}-${counter}`;
            counter++;
          }
          
          el.id = uniqueId;
          header.id = uniqueId;
          usedIds.add(uniqueId);
          matchFound = true;
          
          console.log(`Header ID assigned: ${uniqueId} for text: "${text}"`);
        }
      });
      
      if (!matchFound) {
        console.warn(`No element found for header: "${header.text}"`);
      }
    });
  }, []);

  useEffect(() => {
    const extractedHeaders = extractHeaders(content);
    setHeaders(extractedHeaders);

    // DOM이 렌더링된 후 헤더 엘리먼트에 ID 추가 (더 적극적인 재시도)
    const timeouts = [100, 300, 500, 1000, 2000];
    const cleanup: NodeJS.Timeout[] = [];
    
    timeouts.forEach((delay) => {
      const timeout = setTimeout(() => {
        console.log(`Attempting to add header IDs (delay: ${delay}ms)`);
        addHeaderIds(extractedHeaders);
      }, delay);
      cleanup.push(timeout);
    });

    // MutationObserver로 DOM 변화 감지
    const observer = new MutationObserver((mutations) => {
      const hasNewHeaders = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && 
          (node as Element).matches('h1, h2, h3, h4, h5, h6')
        )
      );
      
      if (hasNewHeaders) {
        console.log('New headers detected via MutationObserver');
        setTimeout(() => addHeaderIds(extractedHeaders), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      cleanup.forEach(timeout => clearTimeout(timeout));
      observer.disconnect();
    };
  }, [content, addHeaderIds]);

  useEffect(() => {
    if (headers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 보이는 헤더들을 찾아서 가장 상단에 있는 것을 활성화
        const visibleHeaders = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top
          }))
          .sort((a, b) => a.top - b.top);

        if (visibleHeaders.length > 0) {
          setActiveId(visibleHeaders[0].id);
        }
      },
      {
        rootMargin: '-10% 0% -80% 0%',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observer 등록 시 재시도 로직
    const observeHeaders = () => {
      headers.forEach((header) => {
        const element = document.getElementById(header.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    observeHeaders();
    
    // 일정 시간 후 재시도
    const retryTimeout = setTimeout(observeHeaders, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(retryTimeout);
    };
  }, [headers]);

  const handleClick = (id: string) => {
    console.log(`Attempting to scroll to: ${id}`);
    const element = document.getElementById(id);
    
    if (element) {
      console.log(`Element found:`, element);
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      console.log(`Scrolling to position: ${y}`);
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      console.error(`Element not found for ID: ${id}`);
      // 모든 헤더 요소 확인
      const allHeaders = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      console.log('All headers:', Array.from(allHeaders).map(h => ({ 
        id: h.id, 
        text: h.textContent?.trim(),
        tagName: h.tagName
      })));
    }
  };

  if (headers.length === 0) return null;

  return (
    <nav className={cn("sticky top-24", className)}>
      <div className="border-l-2 border-gray-700 pl-4">
        <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wide">목차</h3>
        <ul className="space-y-2">
          {headers.map((header) => (
            <li key={header.id}>
              <button
                onClick={() => handleClick(header.id)}
                className={cn(
                  "text-left w-full text-sm py-1 transition-all duration-200 border-l-2 pl-3 -ml-3",
                  "hover:border-[#6ee7b7] hover:text-white",
                  activeId === header.id
                    ? "text-[#6ee7b7] border-[#6ee7b7] bg-[#6ee7b7]/5"
                    : "text-gray-400 border-transparent",
                  // 헤더 레벨에 따른 들여쓰기 및 크기 조정
                  header.level === 1 && "font-medium",
                  header.level === 2 && "ml-2 text-xs",
                  header.level === 3 && "ml-4 text-xs",
                  header.level >= 4 && "ml-6 text-xs opacity-75"
                )}
                style={{
                  paddingLeft: `${Math.max(0, (header.level - 1) * 8)}px`
                }}
              >
                {header.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}