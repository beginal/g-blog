import React from 'react';

export const renderItem = (item: string | string[], index: number) => {
  // 배열인 경우 (nested list)
  if (Array.isArray(item)) {
    return React.createElement(
      'ul',
      { key: index, className: "mt-2 space-y-2 list-disc ml-4" },
      item.map((listItem, listIndex) => {
        const processedItem = listItem
          .replace(/\*\*(\d+\.\s.*?):\*\*/g, '<strong class="text-white font-bold">$1:</strong>')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
        
        // 숫자로 시작하는 경우 list-style을 none으로 설정
        const startsWithNumber = /^\d+\./.test(listItem.replace(/\*\*/g, ''));
        
        return React.createElement(
          'li',
          {
            key: listIndex,
            className: startsWithNumber ? "list-none -ml-4" : "",
            dangerouslySetInnerHTML: { __html: processedItem }
          }
        );
      })
    );
  }

  // 문자열인 경우
  const stringItem = item as string;

  // ":" 뒤에 "|"가 있는 경우 섹션 헤더로 처리
  if (stringItem.includes(' : |')) {
    return React.createElement(
      'div',
      {
        key: index,
        className: "font-bold text-white mt-3 mb-1",
        dangerouslySetInnerHTML: {
          __html: stringItem
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\s*:\s*\|/g, ' :')
        }
      }
    );
  }
  
  // 6개 이상의 공백으로 시작하는 들여쓰기 아이템 처리
  if (stringItem.startsWith('      ') && !stringItem.includes('**')) {
    return React.createElement(
      'div',
      {
        key: index,
        className: "ml-4 text-white/60 text-xs",
        dangerouslySetInnerHTML: { __html: stringItem.trim() }
      }
    );
  }
  
  // 더 깊은 들여쓰기 처리
  if (stringItem.startsWith('         ') && !stringItem.includes('**')) {
    return React.createElement(
      'div',
      {
        key: index,
        className: "ml-8 text-white/60 text-xs",
        dangerouslySetInnerHTML: { __html: stringItem.trim() }
      }
    );
  }
  
  // 일반 항목 처리
  return React.createElement(
    'div',
    {
      key: index,
      dangerouslySetInnerHTML: {
        __html: stringItem
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      }
    }
  );
};