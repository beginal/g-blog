# 홈 Profile 영역 재설계 - 향상된 기술 명세서

## 📋 프로젝트 개요

### 목표
기존 Profile 영역을 위아래로 분할하여 두 개의 박스로 재구성:
- **A박스**: 기존 Profile을 컴팩트하게 개선한 영역
- **B박스**: 패치노트/변경사항을 표시하는 새로운 영역

### 레이아웃 구조
```
┌─────────────────────────┐
│     A박스 (Profile)      │  ← 기존 높이의 약 50%
│   컴팩트한 프로필 정보     │
├─────────────────────────┤
│    B박스 (패치노트)       │  ← 기존 높이의 약 50%
│  스크롤 가능한 업데이트    │
└─────────────────────────┘
```

## 🏗️ 아키텍처 설계

### 컴포넌트 구조 개선

```typescript
// 기존 구조
ProfileCard
├── ProfileBackground
├── ProfileHeader  
└── ProfileContactInfo

// 개선된 구조 (A박스 + B박스)
<div className="profile-section">
  <CompactProfileCard>        // A박스
    ├── ProfileBackground (축소)
    ├── ProfileHeader (컴팩트)
    └── ProfileContactInfo (간소화)
  </CompactProfileCard>
  
  <PatchNotesCard>           // B박스  
    ├── PatchNotesHeader
    ├── PatchNotesList (스크롤)
    └── PatchNotesFooter
  </PatchNotesCard>
</div>
```

### 컴포넌트 상세 설계

#### A박스: CompactProfileCard
```typescript
interface CompactProfileCardProps {
  className?: string;
  variant?: 'default' | 'minimal';
  height?: string; // 기존 높이의 50% 정도
}

// 컴팩트한 디자인을 위한 내부 컴포넌트들
- ProfileBackground: 높이 축소 (기존 h-48 → h-24)
- ProfileHeader: 폰트 크기 축소, 간격 조정
- ProfileContactInfo: 필수 연락처만 표시 (2-3개)
```

#### B박스: PatchNotesCard  
```typescript
interface PatchNote {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'fix' | 'update';
  version?: string;
}

interface PatchNotesCardProps {
  className?: string;
  notes: PatchNote[];
  maxHeight?: string; // 스크롤을 위한 최대 높이
  showViewAll?: boolean;
}
```

#### PatchNotesList (스크롤 영역)
```typescript
interface PatchNotesListProps {
  notes: PatchNote[];
  maxHeight: string;
  itemSpacing?: 'compact' | 'normal';
}

// 스크롤 기능
- max-height 설정으로 고정 높이
- overflow-y: auto로 세로 스크롤
- 커스텀 스크롤바 스타일링
```

## 🎨 디자인 시스템

### 색상 팔레트
```typescript
export const REDESIGN_COLORS = {
  // 기존 Profile 색상 유지
  profileBg: "#3a404d",
  profileText: "#ffffff",
  profileAccent: "#6ee7b7",
  
  // 패치노트 전용 색상
  patchNotesBg: "#3a404d", // Profile과 동일한 배경
  patchNotesHeader: "#4a5568",
  
  // 패치노트 타입별 색상
  feature: "#3b82f6",      // 새 기능 - 파란색
  improvement: "#10b981",   // 개선 - 초록색  
  fix: "#ef4444",          // 수정 - 빨간색
  update: "#8b5cf6",       // 업데이트 - 보라색
} as const;
```

### 레이아웃 디멘션
```typescript
export const LAYOUT_DIMENSIONS = {
  // A박스 (CompactProfile)
  compactHeight: "calc(50vh - 12px)", // 기존 높이의 약 50%
  compactMinHeight: "280px",
  compactMaxHeight: "400px",
  
  // B박스 (PatchNotes)  
  patchNotesHeight: "calc(50vh - 12px)", // 기존 높이의 약 50%
  patchNotesMinHeight: "280px", 
  patchNotesMaxHeight: "400px",
  
  // 스크롤 영역
  scrollMaxHeight: "320px", // 헤더/푸터 제외한 스크롤 영역
  
  // 간격
  sectionGap: "24px", // A박스와 B박스 사이 간격
} as const;
```

## 🔧 기술 구현 상세

### 1. 수직 분할 레이아웃 구조

```scss
// A박스 + B박스 수직 분할 레이아웃
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  
  .compact-profile-card {
    flex: 0 0 auto;
    height: calc(50% - 12px);
    min-height: 280px;
    max-height: 400px;
  }
  
  .patch-notes-card {
    flex: 0 0 auto; 
    height: calc(50% - 12px);
    min-height: 280px;
    max-height: 400px;
  }
}
```

### 2. 컴팩트 Profile 최적화

```typescript
// 기존 ProfileCard를 컴팩트하게 수정
const CompactProfileCard = () => (
  <div className="compact-profile-card">
    {/* 배경 이미지 높이 축소 */}
    <ProfileBackground 
      height="h-24"  // 기존 h-48에서 축소
      className="flex-shrink-0"
    />
    
    {/* 컨텐츠 영역 패딩 축소 */}
    <div className="p-4 flex-grow"> {/* 기존 p-6에서 축소 */}
      <ProfileHeader compact />
      <ProfileContactInfo 
        maxItems={3}  // 최대 3개만 표시
        layout="compact"
      />
    </div>
  </div>
);
```

### 3. 패치노트 스크롤 구현

```scss
// 스크롤 가능한 패치노트 영역
.patch-notes-scroll {
  max-height: 320px;
  overflow-y: auto;
  
  // 커스텀 스크롤바
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(110, 231, 183, 0.6);
    border-radius: 3px;
    
    &:hover {
      background: rgba(110, 231, 183, 0.8);
    }
  }
}
```

### 4. 애니메이션 및 인터랙션

```typescript
// A박스와 B박스의 애니메이션
export const REDESIGN_ANIMATIONS = {
  // 전체 컨테이너 애니메이션
  profileSection: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // A박스 먼저, B박스 나중에
      },
    },
  },
  
  // A박스 (CompactProfile) 애니메이션  
  compactProfile: {
    hidden: { y: -20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
  },
  
  // B박스 (PatchNotes) 애니메이션
  patchNotes: {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    },
  },
  
  // 패치노트 아이템 호버 효과
  patchNoteItem: {
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      scale: 1.01,
      transition: { duration: 0.2 }
    },
  },
} as const;
```

## 📱 반응형 디자인

### 데스크톱 (1024px+)
```scss
.profile-section {
  // 데스크톱에서는 세로로 쌓인 레이아웃 유지
  flex-direction: column;
  height: 100vh; // 전체 높이 활용
  
  .compact-profile-card {
    height: calc(50vh - 12px);
  }
  
  .patch-notes-card {
    height: calc(50vh - 12px);
  }
}
```

### 태블릿 (768px - 1023px)  
```scss
.profile-section {
  // 태블릿에서도 세로 레이아웃 유지
  flex-direction: column;
  gap: 16px; // 간격 축소
  
  .compact-profile-card {
    height: calc(45vh - 8px); // 약간 축소
    min-height: 240px;
  }
  
  .patch-notes-card {
    height: calc(55vh - 8px); // 패치노트에 더 많은 공간
    min-height: 300px;
  }
}
```

### 모바일 (< 768px)
```scss
.profile-section {
  flex-direction: column;
  gap: 12px;
  
  .compact-profile-card {
    height: auto; // 고정 높이 해제
    min-height: 200px;
  }
  
  .patch-notes-card {
    height: auto;
    min-height: 250px;
    
    .patch-notes-scroll {
      max-height: 200px; // 모바일에서 스크롤 영역 축소
    }
  }
}
```

## 📦 구현 계획

### Phase 1: 기본 구조 구현 (1-2일)
```typescript
// 1. 기존 ProfileCard를 CompactProfileCard로 수정
// 2. PatchNotesCard 컴포넌트 신규 생성  
// 3. ProfileSection 컨테이너 구현
// 4. 기본 수직 분할 레이아웃 적용

구현 우선순위:
- CompactProfileCard 컴포넌트 생성
- PatchNotesCard 기본 구조
- 수직 분할 레이아웃 CSS
- 기본 스크롤 기능
```

### Phase 2: 디자인 최적화 (1일)
```typescript
// 1. 컴팩트 Profile 디자인 개선
// 2. 패치노트 UI/UX 완성
// 3. 반응형 레이아웃 적용
// 4. 스크롤바 커스텀 스타일링

구현 상세:
- ProfileBackground 높이 축소 (h-48 → h-24)
- ProfileHeader/ContactInfo 컴팩트화
- 패치노트 타입별 색상 적용
- 커스텀 스크롤바 디자인
```

### Phase 3: 인터랙션 및 애니메이션 (1일) 
```typescript
// 1. 애니메이션 시스템 구현
// 2. 호버 효과 추가
// 3. 스크롤 인터랙션 개선
// 4. 반응형 최적화 완료

최종 점검 항목:
- A박스/B박스 애니메이션 적용
- 패치노트 아이템 호버 효과
- 모든 브레이크포인트 테스트
- 성능 최적화 검증
```

## 🔧 핵심 컴포넌트 상세 설계

### CompactProfileCard 인터페이스
```typescript
interface CompactProfileCardProps {
  className?: string;
  variant?: 'default' | 'minimal';
  // 컴팩트 모드에서 표시할 연락처 수 제한
  maxContactItems?: number;
  // 배경 이미지 표시 여부
  showBackground?: boolean;
}
```

### PatchNotesCard 인터페이스
```typescript
interface PatchNotesCardProps {
  className?: string;
  // 패치노트 데이터
  notes: PatchNote[];
  // 스크롤 영역 최대 높이
  maxScrollHeight?: string;
  // 'View All' 버튼 표시 여부  
  showViewAllButton?: boolean;
  // 새로운 패치노트 강조 표시
  highlightRecent?: boolean;
}

interface PatchNote {
  id: string;
  date: string; // YYYY-MM-DD 형식
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'fix' | 'update';
  version?: string; // 선택적 버전 정보
  isNew?: boolean; // 새로운 패치노트 표시용
}
```

## 📊 데이터 구조

### 패치노트 목데이터
```typescript
export const MOCK_PATCH_NOTES: PatchNote[] = [
  {
    id: "patch-001",
    date: "2024-07-05", 
    title: "홈 Profile 영역 재설계",
    description: "Profile 영역을 A박스(컴팩트 프로필)와 B박스(패치노트)로 분할하여 더 나은 사용자 경험 제공",
    type: "feature",
    version: "v2.1.0",
    isNew: true
  },
  {
    id: "patch-002",
    date: "2024-07-03",
    title: "Prism.js 언어 지원 확장", 
    description: "TypeScript, Python, Java 등 다양한 프로그래밍 언어 하이라이팅 지원 추가",
    type: "improvement",
    version: "v2.0.5"
  },
  {
    id: "patch-003", 
    date: "2024-07-01",
    title: "테스트 환경 구축",
    description: "Jest, Testing Library 기반 자동화 테스트 환경 구축 및 CI/CD 파이프라인 개선",
    type: "update",
    version: "v2.0.0"
  }
];
```

## 🎯 사용자 경험 (UX) 고려사항

### 스크롤 동작 최적화
- 부드러운 스크롤링을 위한 `scroll-behavior: smooth` 적용
- 스크롤 위치 표시를 위한 시각적 인디케이터
- 모바일에서 스크롤 성능 최적화

### 접근성 (A11y)
```typescript
// 패치노트 스크롤 영역 접근성
<div 
  role="log"
  aria-label="패치노트 및 업데이트 내역"
  aria-live="polite"
  className="patch-notes-scroll"
>
  {notes.map(note => (
    <article 
      key={note.id}
      role="article"
      aria-labelledby={`patch-title-${note.id}`}
    >
      <h4 id={`patch-title-${note.id}`}>{note.title}</h4>
      <p>{note.description}</p>
    </article>
  ))}
</div>
```

### 성능 최적화
- 가상화(Virtualization): 패치노트가 많을 경우 성능 개선
- 지연 로딩: 스크롤 시 추가 패치노트 로드
- 메모이제이션: 불필요한 리렌더링 방지

## ⚠️ 예상 버그 및 해결방안

### 1. 레이아웃 버그

#### 🐛 높이 계산 오류
```typescript
// 문제: calc(50vh - 12px)가 다양한 뷰포트에서 예상과 다르게 동작
// 증상: A박스나 B박스가 너무 작거나 큰 상황 발생

// 해결방안
const useAdaptiveHeight = () => {
  const [height, setHeight] = useState('auto');
  
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      const calculatedHeight = Math.max(280, Math.min(400, vh * 0.5 - 12));
      setHeight(`${calculatedHeight}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  
  return height;
};
```

#### 🐛 Flexbox 레이아웃 충돌
```scss
// 문제: flex: 0 0 auto가 일부 브라우저에서 제대로 동작하지 않음
// 해결방안: 명시적 높이 설정과 함께 overflow 처리

.profile-section {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  .compact-profile-card,
  .patch-notes-card {
    flex-shrink: 0; // 축소 방지
    flex-grow: 0;   // 확장 방지
    overflow: hidden; // 내용 넘침 방지
  }
}
```

### 2. 스크롤 관련 버그

#### 🐛 iOS Safari 스크롤 버그
```scss
// 문제: iOS Safari에서 스크롤이 끊기거나 부자연스러운 동작
// 해결방안: -webkit-overflow-scrolling 속성 추가

.patch-notes-scroll {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // iOS 부드러운 스크롤
  overscroll-behavior: contain; // 스크롤 체인 방지
}
```

#### 🐛 스크롤바 스타일 브라우저 호환성
```typescript
// 문제: Firefox에서 webkit 스크롤바 스타일이 적용되지 않음
// 해결방안: 브라우저별 분기 처리

const ScrollbarStyles = () => (
  <style jsx>{`
    .patch-notes-scroll {
      /* Webkit 브라우저 (Chrome, Safari, Edge) */
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      /* Firefox */
      scrollbar-width: thin;
      scrollbar-color: rgba(110, 231, 183, 0.6) rgba(255, 255, 255, 0.1);
    }
  `}</style>
);
```

### 3. 반응형 버그

#### 🐛 모바일에서 높이 계산 오류
```typescript
// 문제: 모바일 브라우저 주소창 때문에 vh 계산이 부정확
// 해결방안: CSS Custom Properties와 JavaScript 조합

useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  
  return () => {
    window.removeEventListener('resize', setVH);
    window.removeEventListener('orientationchange', setVH);
  };
}, []);

// CSS에서 사용
.profile-section {
  height: calc(var(--vh, 1vh) * 100);
}
```

#### 🐛 태블릿 가로모드 레이아웃 깨짐
```scss
// 문제: 태블릿 가로모드에서 높이가 부족해 스크롤이 제대로 동작하지 않음
// 해결방안: 세밀한 미디어쿼리 적용

@media (min-width: 768px) and (max-width: 1023px) and (orientation: landscape) {
  .profile-section {
    .compact-profile-card {
      height: calc(40vh - 8px); // 가로모드에서 높이 축소
      min-height: 200px;
    }
    
    .patch-notes-card {
      height: calc(60vh - 8px); // 패치노트에 더 많은 공간
      min-height: 240px;
    }
  }
}
```

### 4. 성능 버그

#### 🐛 패치노트 목록 렌더링 지연
```typescript
// 문제: 패치노트가 많을 때 초기 렌더링이 느림
// 해결방안: React.memo와 가상화 적용

const PatchNoteItem = memo(({ note }: { note: PatchNote }) => (
  <div className="patch-note-item">
    {/* 내용 */}
  </div>
));

// 또는 react-window 사용
import { FixedSizeList } from 'react-window';

const VirtualizedPatchNotes = ({ notes }: { notes: PatchNote[] }) => (
  <FixedSizeList
    height={320}
    itemCount={notes.length}
    itemSize={80}
    itemData={notes}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <PatchNoteItem note={data[index]} />
      </div>
    )}
  </FixedSizeList>
);
```

#### 🐛 스크롤 이벤트 성능 이슈
```typescript
// 문제: 스크롤 이벤트가 너무 자주 발생해 성능 저하
// 해결방안: 쓰로틀링 적용

import { throttle } from 'lodash';

const useScrollThrottle = (callback: () => void, delay = 16) => {
  const throttledCallback = useMemo(
    () => throttle(callback, delay),
    [callback, delay]
  );
  
  return throttledCallback;
};
```

### 5. 접근성 버그

#### 🐛 키보드 네비게이션 이슈
```typescript
// 문제: 스크롤 영역에서 키보드 포커스가 제대로 동작하지 않음
// 해결방안: 명시적 tabIndex와 포커스 관리

const PatchNotesScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!scrollRef.current) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        scrollRef.current.scrollTop += 40;
        break;
      case 'ArrowUp':
        e.preventDefault();
        scrollRef.current.scrollTop -= 40;
        break;
      case 'PageDown':
        e.preventDefault();
        scrollRef.current.scrollTop += 200;
        break;
      case 'PageUp':
        e.preventDefault();
        scrollRef.current.scrollTop -= 200;
        break;
    }
  };
  
  return (
    <div
      ref={scrollRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="log"
      aria-label="패치노트 목록"
    >
      {/* 내용 */}
    </div>
  );
};
```

## 🧪 버그 예방 테스트 전략

### 1. 시각적 회귀 테스트
```typescript
// Storybook에서 다양한 뷰포트 테스트
export const MobilePortrait = Template.bind({});
MobilePortrait.parameters = {
  viewport: { defaultViewport: 'mobile1' }
};

export const TabletLandscape = Template.bind({});
TabletLandscape.parameters = {
  viewport: { defaultViewport: 'tablet' }
};
```

### 2. 크로스 브라우저 테스트
```yaml
# .github/workflows/cross-browser-test.yml
- name: Test on multiple browsers
  uses: microsoft/playwright-github-action@v1
  with:
    browsers: 'chromium webkit firefox'
```

### 3. 성능 모니터링
```typescript
// Web Vitals 모니터링
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const vitals = {
  CLS: getCLS(console.log),
  FID: getFID(console.log), 
  FCP: getFCP(console.log),
  LCP: getLCP(console.log),
  TTFB: getTTFB(console.log)
};
```