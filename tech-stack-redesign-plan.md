# 기술 스택 섹션 리디자인 계획

## 1. 현재 상태 분석

### 현재 구조

- **위치**: `src/app/(pages)/about/page.tsx` (223-255번 라인)
- **형태**: 프로그레스 바 형식으로 숙련도 표시
- **카테고리**: 개발, PM/디자인, 도구
- **표시 정보**: 기술명, 숙련도 퍼센트, 프로그레스 바

### 현재 기술 스택

```typescript
const skills: Skill[] = [
  // 개발
  { name: "React", level: 95, category: "개발" },
  { name: "Next.js", level: 90, category: "개발" },
  { name: "TypeScript", level: 90, category: "개발" },
  { name: "Redux", level: 85, category: "개발" },
  { name: "JavaScript", level: 95, category: "개발" },
  { name: "MobX", level: 80, category: "개발" },
  { name: "SCSS", level: 85, category: "개발" },

  // PM/디자인
  { name: "Figma", level: 85, category: "PM/디자인" },
  { name: "Webflow", level: 75, category: "PM/디자인" },
  { name: "Notion", level: 90, category: "PM/디자인" },
  { name: "Photoshop", level: 70, category: "PM/디자인" },

  // 도구
  { name: "Git", level: 90, category: "도구" },
  { name: "JWT", level: 80, category: "도구" },
  { name: "Axios", level: 85, category: "도구" },
];
```

## 2. 새로운 디자인 목표

### 2.1 컴팩트한 아이콘 기반 UI

- 프로그레스 바 제거
- 각 기술의 공식 아이콘/로고 사용
- 호버 시 기술명 툴팁 표시
- 그리드 레이아웃으로 컴팩트하게 배치

### 2.2 새로운 카테고리 분류

1. **프론트엔드**

   - React, Next.js, TypeScript, JavaScript
   - HTML5, CSS3, SCSS, Tailwind CSS, Emotion

2. **상태 관리**

   - Redux, Recoil, MobX, Zustand, Recoil, React-Query

3. **백엔드**

   - Python, Firebase, Supabase

4. **환경 및 배포**

   - GitHub, AWS, Vercel

5. **디자인 및 협업 도구**
   - Figma, Photoshop, Notion, Slack

## 3. 구현 방안

### 3.1 아이콘 소스

1. **React Icons 라이브러리 활용**

   ```bash
   npm install react-icons
   ```

   - 다양한 아이콘 세트 포함 (Simple Icons, Devicons 등)
   - Tree-shaking 지원으로 번들 크기 최적화

2. **지원되는 아이콘**
   ```typescript
   import {
     SiReact,
     SiNextdotjs,
     SiTypescript,
     SiJavascript,
     SiRedux,
     SiMobx,
     SiHtml5,
     SiCss3,
     SiSass,
     SiTailwindcss,
     SiGit,
     SiGithub,
     SiDocker,
     SiAmazonaws,
     SiVercel,
     SiNetlify,
     SiFigma,
     SiAdobephotoshop,
     SiNotion,
     SiSlack,
     SiJira,
   } from "react-icons/si";
   ```

### 3.2 데이터 구조 재설계

```typescript
interface TechStack {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: "frontend" | "backend" | "database" | "devops" | "design" | "library";
  color?: string; // 브랜드 컬러 (선택사항)
}

const techStacks: TechStack[] = [
  // 프론트엔드
  { name: "React", icon: SiReact, category: "frontend", color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, category: "frontend", color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, category: "frontend", color: "#3178C6" },
  // ... 더 많은 기술들
];
```

### 3.3 UI 구조

```tsx
<section>
  <h2>기술 스택</h2>

  {/* 카테고리별 그룹 */}
  <div className="space-y-6">
    {/* 프론트엔드 */}
    <div>
      <h3>프론트엔드</h3>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4">
        {frontendTechs.map(tech => (
          <div className="group relative">
            <tech.icon size={40} className="transition-transform group-hover:scale-110" style={{ color: tech.color }} />
            {/* 툴팁 */}
            <span className="absolute bottom-full mb-2 hidden group-hover:block">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* 다른 카테고리들도 동일한 구조 */}
  </div>
</section>
```

### 3.4 스타일링 계획

1. **아이콘 크기**

   - 데스크톱: 40px
   - 모바일: 32px

2. **간격**

   - 아이콘 간 gap: 16px
   - 카테고리 간 gap: 24px

3. **인터랙션**

   - hover 시 scale(1.1) 애니메이션
   - 툴팁으로 기술명 표시
   - 클릭 시 해당 기술 관련 프로젝트로 스크롤 (선택사항)

4. **색상**
   - 각 기술의 공식 브랜드 컬러 사용
   - 다크 테마에 맞게 밝기 조정

## 4. 구현 단계

### Phase 1: 준비 작업

1. react-icons 라이브러리 설치
2. 기존 skills 데이터를 새로운 구조로 마이그레이션
3. 필요한 아이콘 import

### Phase 2: UI 구현

1. 기존 프로그레스 바 UI 제거
2. 새로운 그리드 기반 아이콘 UI 구현
3. 카테고리별 그룹핑

### Phase 3: 인터랙션 추가

1. 호버 효과 구현
2. 툴팁 기능 추가
3. 반응형 디자인 최적화

### Phase 4: 마무리

1. 접근성 개선 (aria-label 추가)
2. 성능 최적화
3. 크로스 브라우저 테스트

## 5. 예상 결과

### 장점

- 더 컴팩트하고 현대적인 UI
- 시각적으로 기술을 빠르게 인식 가능
- 공간 효율성 증가
- 확장성 있는 구조

### 고려사항

- 아이콘이 없는 기술의 경우 대체 방안 필요
- 색맹 사용자를 위한 접근성 고려
- 모바일에서의 터치 영역 확보

## 6. 추가 개선 사항 (선택)

### 6.1 필터링 기능

- 카테고리별 필터 버튼
- 검색 기능

### 6.2 상세 정보 모달

- 아이콘 클릭 시 해당 기술 상세 정보
- 관련 프로젝트 링크

### 6.3 애니메이션

- 스크롤 시 순차적 등장 애니메이션
- 카테고리 전환 시 트랜지션 효과
