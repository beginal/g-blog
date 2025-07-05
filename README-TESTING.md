# 테스트 가이드

## 📋 테스트 환경 구성

### 1. 유닛 테스트 (Jest + React Testing Library)
- **프레임워크**: Jest + React Testing Library
- **대상**: 컴포넌트, 훅, 유틸리티 함수
- **위치**: `tests/unit/`

### 2. E2E 테스트 (Puppeteer)
- **프레임워크**: Puppeteer + Jest
- **대상**: 사용자 시나리오, 전체 플로우
- **위치**: `tests/e2e/`

## 🚀 테스트 실행 명령어

### 유닛 테스트
```bash
# 전체 유닛 테스트 실행
npm test

# 워치 모드로 실행
npm run test:watch

# 커버리지 포함 실행
npm run test:coverage

# CI 환경용 실행
npm run test:ci
```

### E2E 테스트
```bash
# E2E 테스트 실행 (브라우저 표시)
npm run test:e2e

# E2E 테스트 실행 (헤드리스 모드)
npm run test:e2e:headless

# 모든 테스트 실행
npm run test:all
```

## 📁 테스트 구조

```
tests/
├── unit/                           # 유닛 테스트
│   ├── components/
│   │   └── CommentForm.test.tsx   # 컴포넌트 테스트
│   ├── hooks/
│   │   └── useComments.test.ts    # 커스텀 훅 테스트
│   └── utils/
│       └── validation.test.ts     # 유틸리티 함수 테스트
└── e2e/                           # E2E 테스트
    ├── helpers/
    │   └── browser.ts             # Puppeteer 헬퍼
    ├── screenshots/               # 테스트 스크린샷
    ├── setup.ts                   # E2E 설정
    ├── homepage.e2e.ts           # 홈페이지 테스트
    └── comment-system.e2e.ts     # 댓글 시스템 테스트
```

## 🧪 테스트 작성 가이드

### 유닛 테스트 예시
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  test('컴포넌트가 정상적으로 렌더링되어야 함', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E 테스트 예시
```typescript
import { BrowserHelper } from './helpers/browser';

describe('Feature E2E Tests', () => {
  test('사용자 플로우가 정상 동작해야 함', async () => {
    await BrowserHelper.navigateTo('http://localhost:3000');
    await BrowserHelper.clickElement('button');
    await BrowserHelper.screenshot('result');
  });
});
```

## 📊 테스트 커버리지

Jest 커버리지 리포트는 다음 위치에서 확인할 수 있습니다:
- **HTML 리포트**: `coverage/lcov-report/index.html`
- **텍스트 리포트**: 터미널 출력

## 🛠️ 테스트 설정 파일

### Jest 설정
- `jest.config.js` - 유닛 테스트 설정
- `jest.e2e.config.js` - E2E 테스트 설정

### 환경 변수
E2E 테스트에서 사용되는 환경 변수:
- `BASE_URL`: 테스트할 앱의 기본 URL (기본값: http://localhost:3000)
- `HEADLESS`: 헤드리스 모드 여부 (기본값: true)

## 🔍 데이터 테스트 ID

E2E 테스트에서 사용하는 data-testid 속성:
```html
<!-- 댓글 시스템 -->
<div data-testid="comment-section">
<form data-testid="comment-form">
<div data-testid="comment-list">
<div data-testid="comment-item">
```

## 🐛 디버깅 팁

### 유닛 테스트 디버깅
```bash
# 단일 테스트 파일 실행
npm test -- CommentForm.test.tsx

# 패턴으로 테스트 실행
npm test -- --testNamePattern="유효한 데이터"
```

### E2E 테스트 디버깅
```bash
# 브라우저를 표시하며 실행 (HEADLESS=false)
HEADLESS=false npm run test:e2e

# 특정 테스트만 실행
npm run test:e2e -- --testNamePattern="홈페이지"
```

### 스크린샷 확인
E2E 테스트 실행 후 `tests/e2e/screenshots/` 폴더에서 스크린샷을 확인할 수 있습니다.

## 🚨 주의사항

### E2E 테스트 실행 전
1. 개발 서버가 실행 중이어야 함: `npm run dev`
2. 데이터베이스가 준비되어 있어야 함
3. 테스트용 데이터가 있어야 함

### CI/CD 환경
```bash
# CI 환경에서의 테스트 실행
npm run build
npm run start &
npm run test:e2e:headless
```

## 📝 테스트 작성 체크리스트

### 컴포넌트 테스트
- [ ] 정상 렌더링 확인
- [ ] 사용자 인터랙션 테스트
- [ ] Props 전달 확인
- [ ] 에러 상태 처리
- [ ] 로딩 상태 처리

### 훅 테스트
- [ ] 초기 상태 확인
- [ ] 상태 변경 로직
- [ ] 비동기 처리
- [ ] 에러 핸들링
- [ ] 클린업 함수

### E2E 테스트
- [ ] 주요 사용자 플로우
- [ ] 폼 제출 테스트
- [ ] 네비게이션 테스트
- [ ] 반응형 디자인
- [ ] 에러 시나리오