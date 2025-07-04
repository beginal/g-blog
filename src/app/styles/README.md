# 🎨 스타일 시스템 문서

이 프로젝트의 스타일 시스템은 모듈화되고 재사용 가능한 구조로 설계되었습니다.

## 📁 파일 구조

```
src/app/styles/
├── variables.css        # CSS 변수 시스템
├── components.css       # 재사용 가능한 컴포넌트 스타일
├── animations.css       # 애니메이션 시스템
├── utilities.css        # 유틸리티 클래스
├── editor-optimized.css # Toast UI 에디터 최적화 스타일
└── README.md           # 이 문서
```

## 🎯 핵심 원칙

### 1. **일관성**
- 모든 색상, 간격, 크기는 CSS 변수로 관리
- 일관된 네이밍 컨벤션 사용

### 2. **재사용성**
- 컴포넌트 기반 스타일 시스템
- 조합 가능한 유틸리티 클래스

### 3. **확장성**
- 새로운 컴포넌트 추가 용이
- 테마 변경 지원 준비

### 4. **성능**
- CSS 변수를 통한 런타임 최적화
- 모듈화를 통한 코드 분할

## 🎨 변수 시스템 (variables.css)

### 색상 시스템
```css
/* Primary Colors */
--color-primary: #6ee7b7;
--color-primary-dark: #5ad1a0;
--color-primary-light: #64f0c8;

/* Background Colors */
--color-bg-primary: #1a1a1a;
--color-bg-secondary: #2c313a;
--color-bg-tertiary: #3a404d;
```

### 간격 시스템
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
```

### 반지름 시스템
```css
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
```

## 🧩 컴포넌트 시스템 (components.css)

### 버튼 시스템
```css
/* 기본 사용법 */
.btn-base .btn-md .btn-primary

/* 조합 예시 */
<button class="btn-base btn-lg btn-primary">
  Primary Button
</button>
```

### 카드 시스템
```css
/* 기본 사용법 */
.card-base .card-padding-md .card-hover

/* 조합 예시 */
<div class="card-base card-padding-lg card-hover">
  Card Content
</div>
```

### 입력 필드 시스템
```css
/* 기본 사용법 */
.input-base

/* 에러 상태 */
.input-base .input-error
```

## ✨ 애니메이션 시스템 (animations.css)

### 진입 애니메이션
```css
.animate-fade-in          /* 페이드 인 */
.animate-slide-in-left    /* 왼쪽에서 슬라이드 */
.animate-slide-in-right   /* 오른쪽에서 슬라이드 */
.animate-bounce-in        /* 바운스 인 */
```

### 연속 애니메이션
```css
.animate-pulse-glow       /* 맥동 글로우 */
.animate-float           /* 떠오르는 효과 */
.animate-spin            /* 회전 */
```

### 호버 애니메이션
```css
.hover-lift              /* 들어올리기 */
.hover-scale             /* 크기 변경 */
.hover-glow              /* 글로우 효과 */
```

### 애니메이션 지연
```css
.animate-delay-100       /* 0.1초 지연 */
.animate-delay-200       /* 0.2초 지연 */
.animate-delay-500       /* 0.5초 지연 */
```

## 🛠 유틸리티 시스템 (utilities.css)

### 레이아웃
```css
.flex-center             /* 중앙 정렬 */
.flex-between            /* 양끝 정렬 */
.flex-col-center         /* 세로 중앙 정렬 */
```

### 간격
```css
.gap-sm .gap-md .gap-lg  /* 간격 */
.p-sm .p-md .p-lg        /* 패딩 */
.m-sm .m-md .m-lg        /* 마진 */
```

### 텍스트
```css
.text-primary            /* 기본 텍스트 색상 */
.text-muted              /* 흐린 텍스트 */
.text-gradient           /* 그라데이션 텍스트 */
.text-center             /* 중앙 정렬 */
```

### 배경 및 테두리
```css
.bg-secondary            /* 배경색 */
.border .border-accent   /* 테두리 */
.rounded-md .rounded-lg  /* 모서리 반지름 */
```

## 📝 사용 가이드

### 1. 새 컴포넌트 만들기

```css
/* 변수 사용 */
.my-component {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

/* 유틸리티 조합 */
<div class="bg-secondary p-md rounded-lg hover-lift">
  My Component
</div>
```

### 2. 애니메이션 추가

```jsx
// 컴포넌트에 애니메이션 적용
<div class="animate-fade-in animate-delay-200">
  Animated Content
</div>
```

### 3. 반응형 디자인

```css
@media (max-width: 768px) {
  .my-component {
    padding: var(--spacing-sm);
  }
}

/* 또는 유틸리티 사용 */
<div class="p-lg md:p-sm">
  Responsive Padding
</div>
```

## 🎨 테마 확장

새로운 테마를 추가하려면:

1. `variables.css`에 새 색상 변수 추가
2. 테마별 클래스 생성
3. JavaScript로 테마 전환 구현

```css
/* 다크 테마 (기본) */
:root {
  --color-bg-primary: #1a1a1a;
}

/* 라이트 테마 */
.theme-light {
  --color-bg-primary: #ffffff;
}
```

## 🚀 성능 최적화

- **CSS 변수**: 런타임에서 빠른 테마 변경
- **모듈화**: 필요한 스타일만 로드
- **압축**: 프로덕션에서 CSS 압축
- **캐싱**: 브라우저 캐시 활용

## 📋 체크리스트

새 컴포넌트 추가 시:

- [ ] CSS 변수 사용했는가?
- [ ] 재사용 가능한 클래스 사용했는가?
- [ ] 접근성 고려했는가?
- [ ] 모바일 대응했는가?
- [ ] 애니메이션 성능 확인했는가?

## 🔧 개발 도구

- **CSS 변수 검사**: 브라우저 개발자 도구
- **성능 측정**: Lighthouse
- **접근성 검사**: axe-core

---

이 스타일 시스템을 통해 일관되고 유지보수 가능한 UI를 구축할 수 있습니다.