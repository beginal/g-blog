# UI/UX 측면 개선 제안서 - 개인 기술 블로그 & 취업용 포트폴리오

> 작성일: 2025-07-10  
> 작성자: UI/UX 디자이너

## 📋 개요

본 제안서는 개인 기술 블로그 및 취업용 포트폴리오의 UI/UX 개선 방향을 제시합니다. 2024년 최신 포트폴리오 트렌드와 성공적인 레퍼런스를 분석하여, 시각적으로 매력적이면서도 사용성이 뛰어난 디자인 개선안을 제안합니다.

---

## 1. /about 페이지 UI/UX 개선

### 1.1 비주얼 히어라키 재정립

#### 현재 문제점
- 정보의 우선순위가 시각적으로 명확하지 않음
- 단조로운 카드 레이아웃의 반복
- 기술 스택 아이콘이 너무 작고 인터랙션 부족
- "작업 진행중" 배너가 첫인상을 해침

#### 개선 방향

**1) 히어로 섹션 리디자인**
```
┌─────────────────────────────────────────────┐
│                                             │
│     [애니메이션 배경 / 그라디언트]            │
│                                             │
│         ● 프로필 이미지 (크게)               │
│                                             │
│        함준호 | Product Manager             │
│     개발자의 시각으로 비즈니스를 설계하다      │
│                                             │
│    [LinkedIn] [GitHub] [Resume] [Contact]   │
│                                             │
└─────────────────────────────────────────────┘
```

**2) 인터랙티브 요소 강화**
- 마우스 호버 시 부드러운 스케일 애니메이션
- 스킬 아이콘 클릭 시 관련 프로젝트 하이라이트
- 스크롤 트리거 애니메이션으로 몰입감 증대

### 1.2 레이아웃 개선

**Bento Grid 레이아웃 도입**
```
┌───────────────┬───────────────┐
│               │   Quick Stats │
│  About Me     ├───────────────┤
│               │  Tech Stack   │
├───────────────┴───────────────┤
│        Career Timeline        │
├───────────────┬───────────────┤
│  Education    │   Projects    │
└───────────────┴───────────────┘
```

### 1.3 색상 시스템 개선

**현재**: 단조로운 그린-블루 그라디언트

**개선안**: 
```scss
// 메인 컬러 팔레트
$primary: #6366F1;      // Indigo (신뢰감)
$secondary: #8B5CF6;    // Purple (창의성)
$accent: #EC4899;       // Pink (포인트)

// 다크 모드 최적화
$dark-bg: #0F0F10;      // 순수 검정보다 부드러운 느낌
$dark-surface: #1A1A1C;
$dark-border: #2A2A2D;

// 그라디언트
$gradient-primary: linear-gradient(135deg, $primary 0%, $secondary 100%);
$gradient-mesh: radial-gradient(at 40% 20%, $primary 0%, transparent 50%),
                radial-gradient(at 80% 0%, $secondary 0%, transparent 50%),
                radial-gradient(at 0% 50%, $accent 0%, transparent 50%);
```

---

## 2. 전체 디자인 시스템 구축

### 2.1 타이포그래피 시스템

```scss
// 폰트 스케일 (1.25 비율)
$font-sizes: (
  'xs': 0.75rem,    // 12px
  'sm': 0.875rem,   // 14px
  'base': 1rem,     // 16px
  'lg': 1.25rem,    // 20px
  'xl': 1.5625rem,  // 25px
  '2xl': 1.953rem,  // 31px
  '3xl': 2.441rem,  // 39px
  '4xl': 3.052rem,  // 49px
);

// 폰트 웨이트
$font-weights: (
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
);

// 라인 하이트
$line-heights: (
  'tight': 1.25,
  'normal': 1.5,
  'relaxed': 1.75,
);
```

### 2.2 스페이싱 시스템

```scss
// 8px 기반 스페이싱
$spacing: (
  0: 0,
  1: 0.25rem,   // 4px
  2: 0.5rem,    // 8px
  3: 0.75rem,   // 12px
  4: 1rem,      // 16px
  5: 1.25rem,   // 20px
  6: 1.5rem,    // 24px
  8: 2rem,      // 32px
  10: 2.5rem,   // 40px
  12: 3rem,     // 48px
  16: 4rem,     // 64px
);
```

### 2.3 컴포넌트 스타일 가이드

**버튼 스타일**
```scss
.button {
  // 베이스 스타일
  @apply px-6 py-3 rounded-lg font-medium transition-all duration-200;
  
  // 호버 효과
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  // 변형
  &--primary {
    background: $gradient-primary;
    color: white;
  }
  
  &--ghost {
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
}
```

---

## 3. 레퍼런스 기반 개선 아이디어

### 3.1 Bruno Simon 스타일 - 인터랙티브 경험

**적용 아이디어**: 스킬 섹션을 인터랙티브 스킬 트리로 구현
```javascript
// Three.js를 활용한 3D 스킬 트리
const SkillTree = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <SkillNode position={[0, 0, 0]} skill="React" level={4} />
      <SkillNode position={[2, 1, 0]} skill="TypeScript" level={3} />
      {/* 연결선과 애니메이션 추가 */}
    </Canvas>
  );
};
```

### 3.2 Brittany Chiang 스타일 - 미니멀리즘

**적용 아이디어**: 
- 좌측 고정 네비게이션
- 우측 스크롤 콘텐츠
- 모노스페이스 폰트로 개발자 감성

```scss
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  
  .sidebar {
    position: fixed;
    height: 100vh;
    padding: 4rem 2rem;
    
    .nav-item {
      font-family: 'JetBrains Mono', monospace;
      opacity: 0.6;
      transition: opacity 0.3s;
      
      &.active {
        opacity: 1;
        &::before {
          content: '> ';
          color: $accent;
        }
      }
    }
  }
}
```

### 3.3 Dennis 스타일 - 플레이풀 애니메이션

**적용 아이디어**: 마우스 인터랙션
```javascript
// 마우스 추적 효과
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return position;
};

// 이름에 적용
const AnimatedName = () => {
  const { x, y } = useMousePosition();
  
  return (
    <h1 
      style={{
        transform: `translate(${x * 0.01}px, ${y * 0.01}px)`,
      }}
    >
      함준호
    </h1>
  );
};
```

---

## 4. 모바일 최적화

### 4.1 반응형 디자인 전략

```scss
// 브레이크포인트
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
);

// 모바일 우선 접근
.hero {
  padding: 2rem;
  text-align: center;
  
  @media (min-width: map-get($breakpoints, 'md')) {
    padding: 4rem;
    text-align: left;
  }
}
```

### 4.2 터치 최적화

```scss
// 터치 타겟 최소 크기
.touch-target {
  min-width: 44px;
  min-height: 44px;
  
  // 터치 피드백
  &:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
```

---

## 5. 마이크로 인터랙션

### 5.1 스크롤 트리거 애니메이션

```javascript
// Framer Motion 활용
const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
```

### 5.2 호버 효과

```scss
// 프로젝트 카드 호버
.project-card {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
}
```

---

## 6. 접근성 개선

### 6.1 색상 대비

```scss
// WCAG AA 기준 충족
.text-primary {
  color: #E0E7FF; // 어두운 배경에서 7:1 이상 대비
}

.text-secondary {
  color: #A5B4FC; // 4.5:1 이상 대비
}
```

### 6.2 키보드 네비게이션

```scss
// 포커스 스타일
:focus-visible {
  outline: 2px solid $primary;
  outline-offset: 2px;
}

// Skip to content
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: $primary;
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
}
```

---

## 7. 실행 우선순위

### Phase 1: 즉시 개선 가능 (1주)
1. "작업 진행중" 배너 제거
2. 색상 시스템 업데이트
3. 타이포그래피 개선
4. 기본 호버 효과 추가

### Phase 2: 중기 개선 (2-3주)
1. 히어로 섹션 리디자인
2. Bento Grid 레이아웃 적용
3. 스크롤 애니메이션 구현
4. 모바일 최적화

### Phase 3: 장기 개선 (4주+)
1. 인터랙티브 스킬 트리
2. 고급 애니메이션 효과
3. 다크/라이트 모드 토글
4. 커스텀 커서 효과

---

## 결론

성공적인 포트폴리오는 단순히 예쁜 디자인이 아닌, 개발자/PM의 역량을 효과적으로 전달하는 도구입니다. 2024년 트렌드를 반영한 현대적인 디자인과 뛰어난 사용성을 통해 방문자에게 강한 인상을 남기고, 궁극적으로 취업 기회로 연결될 수 있도록 해야 합니다.

특히 /about 페이지는 이력서의 디지털 버전으로서, 시각적 히어라키와 정보 구조가 명확해야 하며, 개성있는 인터랙션으로 기억에 남는 경험을 제공해야 합니다.