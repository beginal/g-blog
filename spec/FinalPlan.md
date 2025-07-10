# 포트폴리오 프로젝트 최종 개선 제안서

> 작성일: 2025-07-10  
> 작성자: 기획자, 개발자, UI/UX 디자이너 팀

## 📋 개요

본 제안서는 개인 기술 블로그 및 취업용 포트폴리오의 최종 개선 방향을 제시합니다. 사용자 피드백을 반영하여 Dennis 스타일을 기반으로 한 플레이풀한 애니메이션과 함께 프론트엔드 개발자로서의 역량을 효과적으로 어필할 수 있는 전략을 수립했습니다.

---

## 1. 기획 측면 개선 방향

### 1.1 /about 페이지 구조 개선

#### 현재 문제점

- "작업 진행중" 안내 문구가 신뢰도 저하
- 직책이 Product Manager로 잘못 표기
- 이력서 다운로드 버튼 부재

#### 개선 방향

**1) 핵심 정보 수정**

- 직책: Product Manager → Frontend Developer
- "작업 진행중" 안내 문구 완전 제거 // 완전 없애지 말고 주석처리 해둘 것

**2) 콘텐츠 계층 구조 최적화**

```
1. 간단한 자기소개 (Elevator Pitch) // 이부분 적용하지 말고 기존 자기소개 놔둘 것,

   └─ "3년차 프론트엔드 개발자로, 탑코에서 TopToon 글로벌 서비스 구축에 참여했습니다.
       JavaScript에서 TypeScript로의 마이그레이션을 주도하며, React 기반 웹툰 플랫폼의
       핵심 기능(SNS 로그인, 결제, 웹툰 뷰어)을 개발했습니다."

2. 이력서 다운로드 버튼
   └─ 연락처 정보 바로 아래 위치
   └─ "이력서 다운로드" CTA 버튼

3. 기술 스택 // 각 기술 스택을 아이콘으로 표시하는 부분은 유지하고 싶음
   ├─ 프론트엔드 전문 기술 (React, TypeScript, Next.js)
   ├─ 웹 서비스 개발 경험 (결제, 인증, 뷰어 시스템)
   └─ 레거시 코드 개선 (JS→TS 마이그레이션, 성능 최적화)

4. 경력 하이라이트 // 단순히 해당 텍스트 하이라이트만 거는것이라면 적용
   └─ 탑코 3년: 글로벌 웹툰 서비스 구축 및 운영
   └─ Rencar 인턴: SSR 기반 모바일 웹 개발

5. 학력 정보
   └─ 부트캠프 및 고등학교 정보 유지

6. 프로젝트 포트폴리오
   └─ 개인 블로그 프로젝트 (Next.js 15, Supabase)
   └─ 날씨 앱 (PWA, OpenWeatherMap API) // 제거 할 것

7. 연락처 정보 // 이 부분은 자기소개 바로 밑에 위치했으면 좋겠음
   └─ 이메일, 전화번호, GitHub, 주소
```

### 1.2 사용자 경험 최적화

**개발자 포트폴리오 중심 네비게이션**

- About (개발자 이력서)
- 경력
- Projects (기술 프로젝트)

**개발자 직군에 특화된 기능**

- GitHub 저장소 연동 및 빠른 접근
- 이력서 PDF 다운로드 버튼

### 1.3 성과 측정 지표

**정량적 지표**

- 페이지 체류 시간 (About 페이지 3분 이상 목표)
- GitHub 링크 클릭률 (15% 이상)
- 이력서 다운로드 수 (25% 이상)

**정성적 지표**

- 채용 담당자 피드백 (기술 역량 인정)
- 개발자 커뮤니티 노출 증가
- 기술 면접 요청 증가

---

## 2. 개발 측면 개선 방향

### 2.1 아키텍처 개선

**폴더 구조 재정립**

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── common/            # 공통 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   │   ├── about/
│   │   └── projects/
│   └── ui/                # 기본 UI 컴포넌트
├── lib/
│   ├── hooks/            # 커스텀 훅
│   ├── utils/            # 유틸리티 함수
│   └── validations/      # 검증 로직
├── types/                # TypeScript 타입
├── data/                 # 정적 데이터
└── styles/               # 글로벌 스타일
```

### 2.2 타입 시스템 강화

**엄격한 타입 정의**

```typescript
// types/profile.ts
export interface ProfileData {
  personal: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

export interface Skill {
  id: string;
  name: string;
  icon: React.ComponentType;
  category: SkillCategory;
  level: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience: number;
  projects: string[];
  achievements: string[];
}
```

### 2.3 성능 최적화

**번들 크기 최적화**

- 코드 스플리팅 적용
- Tree Shaking 최적화
- 동적 임포트 활용

**런타임 성능 최적화**

- React.memo 활용
- useMemo, useCallback 적절한 사용
- 이미지 최적화 (Next.js Image 컴포넌트)

### 2.4 개발 경험 개선

**개발 도구 설정**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

**테스트 전략**

- 핵심 컴포넌트 단위 테스트
- 통합 테스트 (About 페이지)
- E2E 테스트 (주요 사용자 플로우)

---

## 3. UI/UX 측면 개선 방향 (Dennis 스타일 기반)

### 3.1 전체 디자인 방향

**Dennis 스타일 채택 (수정된 버전)**

- 플레이풀한 애니메이션과 인터랙션
- 현대적이고 생동감 있는 디자인
- 성능과 사용성의 균형

### 3.2 기술 스택 섹션 개선

**현재 문제점 및 개선사항**

- ❌ 스킬 카드 크기가 너무 큼 → ✅ 컴팩트한 카드 크기
- ❌ 3,4,5 숫자 의미 불명확 → ✅ "레벨 4/5" 형태로 명확화
- ❌ 어울리지 않는 아이콘 → ✅ 기존 기술 스택 부분에 있는 아이콘과 맞는걸 사용
- ❌ 과도한 호버 효과 → ✅ 부드럽고 절제된 애니메이션

**개선된 기술 스택 디자인**

```css
.skill-card {
  width: 280px; /* 기존보다 축소 */
  height: 180px; /* 기존보다 축소 */
  padding: 24px; /* 기존 40px에서 축소 */

  /* 절제된 호버 효과 */
  &:hover {
    transform: translateY(-4px); /* 기존 -10px에서 축소 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 기존보다 축소 */
  }
}

.skill-level {
  font-size: 12px;
  color: #666;
  /* "레벨 4/5" 형태로 표시 */
}
```

### 3.3 인터랙션 최적화

**제거할 인터랙션**

- ❌ 마우스 커서 따라다니는 효과
- ❌ 마우스 위치에 따른 배경 그라디언트 변화
- ❌ 랜덤 파티클 생성 (성능 저하 우려)

**유지할 인터랙션**

- ✅ 이름 글자별 호버 애니메이션 (단순화)
- ✅ Experience 타임라인 (매우 좋음)
- ✅ 기본적인 카드 호버 효과 (축소된 버전)

### 3.4 성능 최적화된 애니메이션

**CSS 애니메이션 최적화**

```css
/* GPU 가속 사용 */
.animated-element {
  will-change: transform;
  transform: translateZ(0);
}

/* 60fps 유지를 위한 설정 */
@keyframes optimizedFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -10px, 0);
  }
}
```

### 3.5 연락처 섹션 추가

**누락된 연락처 섹션 구현**

```html
<section class="contact-section">
  <h2 class="section-title">연락처</h2>
  <div class="contact-grid">
    <div class="contact-item">
      <span class="contact-icon">📧</span>
      <span class="contact-text">beginal01@gmail.com</span>
    </div>
    <div class="contact-item">
      <span class="contact-icon">📱</span>
      <span class="contact-text">010-9215-9984</span>
    </div>
    <div class="contact-item">
      <span class="contact-icon">🐙</span>
      <span class="contact-text">github.com/beginal</span>
    </div>
    <div class="contact-item">
      <span class="contact-icon">📍</span>
      <span class="contact-text">서울 관악구 신림동</span>
    </div>
  </div>
</section>
```

### 3.6 반응형 디자인

**모바일 최적화**

- 타이틀 크기 조정 (8rem → 4rem)
- 스킬 카드 1열 배치
- 타임라인 모바일 최적화
- 터치 친화적 인터랙션

---

## 4. 실행 계획

### Phase 1: 즉시 개선 (1주)

1. "작업 진행중" 문구 제거
2. Product Manager → Frontend Developer 수정
3. 이력서 다운로드 버튼 추가 (자기소개 하단)
4. 연락처 섹션 추가

### Phase 2: Dennis 스타일 적용 (2-3주)

1. 기존 내용 유지하며 Dennis 스타일 레이아웃 적용
2. 기술 스택 섹션 개선 (크기 축소, 레벨 표시 명확화)
3. 과도한 인터랙션 제거 및 성능 최적화
4. Experience 타임라인 적용

### Phase 3: 최적화 및 테스트 (1주)

1. 성능 테스트 및 최적화
2. 크로스 브라우저 테스트
3. 모바일 반응형 테스트
4. 접근성 검증

---

## 5. 예상 효과

### 5.1 사용자 경험 개선

- 첫인상 개선으로 체류 시간 증가
- 명확한 정보 전달로 신뢰도 향상
- 플레이풀한 디자인으로 기억에 남는 경험 제공

### 5.2 기술적 완성도

- 성능 최적화로 빠른 로딩 속도
- 반응형 디자인으로 모든 디바이스 지원
- 접근성 고려로 포용적인 웹사이트

### 5.3 취업 활동 지원

- 개발자 역량 명확한 어필
- 이력서 다운로드로 채용 프로세스 원활화
- GitHub 연동으로 포트폴리오 접근성 향상

---

## 결론

본 최종 제안서는 사용자 피드백을 충실히 반영하여 Dennis 스타일의 장점은 살리되 과도한 인터랙션은 제거하고, 성능과 사용성을 균형 있게 고려한 개선 방향을 제시합니다.

기존 콘텐츠의 품질을 유지하면서도 현대적이고 매력적인 사용자 경험을 제공하여, 프론트엔드 개발자로서의 역량을 효과적으로 어필할 수 있는 포트폴리오가 될 것입니다.
