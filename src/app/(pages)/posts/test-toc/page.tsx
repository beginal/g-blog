"use client";

import { TableOfContents } from "@/components/molecules/post/TableOfContents";

const testContent = `
# 첫 번째 제목

이것은 첫 번째 섹션입니다.

## 두 번째 제목 

이것은 두 번째 섹션입니다.

### 세 번째 제목

이것은 세 번째 섹션입니다.

## 대-전제1

한글과 특수문자가 포함된 제목입니다.

### 소제목 테스트

더 많은 내용...
`;

export default function TestTOCPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 id="heading-0">첫 번째 제목</h1>
          <p>이것은 첫 번째 섹션입니다.</p>
          
          <h2 id="heading-1">두 번째 제목</h2>
          <p>이것은 두 번째 섹션입니다.</p>
          
          <h3 id="heading-2">세 번째 제목</h3>
          <p>이것은 세 번째 섹션입니다.</p>
          
          <h2 id="heading-3">대-전제1</h2>
          <p>한글과 특수문자가 포함된 제목입니다.</p>
          
          <h3 id="heading-4">소제목 테스트</h3>
          <p>더 많은 내용...</p>
          
          <div style={{ height: '200vh' }}></div>
        </div>
        
        <aside className="w-64">
          <TableOfContents content={testContent} title="테스트 목차" />
        </aside>
      </div>
    </div>
  );
}