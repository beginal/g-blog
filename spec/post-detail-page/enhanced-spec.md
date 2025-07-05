# post-detail-page - Claude 강화 기능정의서

## 📝 기본 정보

- **작성자**: Claude AI
- **작성일**: 2025-07-05
- **기반 문서**: user-spec.md

## 🎯 기능 개요

> 블로그 게시물의 상세 내용을 표시하는 페이지로, 사용자가 게시물을 읽고 상호작용할 수 있는 완전한 환경을 제공합니다. 마크다운 콘텐츠를 Toast UI Editor로 렌더링하고, 실시간 목차 네비게이션, 댓글 시스템, 게시물 관리 기능을 통합적으로 제공합니다.

## 💡 핵심 기능

### 📖 콘텐츠 렌더링

- **Toast UI 마크다운 뷰어**: 코드 하이라이팅, 테이블, 수식 등 완전한 마크다운 지원
- **반응형 레이아웃**: 메인 콘텐츠(flex-1)와 사이드바(264px)로 구성
- **다크 테마**: 일관된 다크 모드 디자인

### 🧭 네비게이션 시스템

- **실시간 목차 (TOC)**:
  - 자동 헤더 감지 및 계층 구조 생성
  - 스크롤 위치 기반 현재 섹션 하이라이트
  - 클릭 시 해당 섹션으로 부드러운 스크롤 이동
  - XL 이상 화면에서만 사이드바 표시
- **상단 네비게이션**: 뒤로가기, 수정/삭제 버튼 포함

### 💬 댓글 시스템

- **익명 댓글**: 닉네임과 비밀번호 기반 댓글 작성
- **실시간 댓글 목록**: 최신 댓글부터 정렬
- **댓글 관리**: 작성자 비밀번호 확인 후 삭제 가능

### 🔧 관리 기능

- **게시물 편집**: 수정 페이지로 이동
- **게시물 삭제**: 확인 후 삭제 및 목록 페이지로 리디렉션
- **에러 처리**: 404, 로딩 실패 등 다양한 에러 상황 처리

## 🎨 UI/UX 개선사항

### 📱 반응형 디자인

- **모바일 우선**: 작은 화면에서도 최적화된 읽기 경험
- **사이드바 숨김**: 중간 화면에서는 목차 사이드바 자동 숨김
- **터치 최적화**: 모바일 환경에서의 스크롤 및 터치 상호작용

### ⚡ 성능 최적화

- **스켈레톤 UI**: 콘텐츠 로딩 중 구조적 로딩 표시
- **동적 임포트**: Toast UI Editor 지연 로딩
- **IntersectionObserver**: 효율적인 스크롤 추적

### 🎭 시각적 개선

- **fade-in 애니메이션**: 페이지 로딩 시 부드러운 전환
- **hover 효과**: 버튼 및 링크 상호작용 피드백
- **색상 시스템**: 일관된 색상 팔레트 적용

## 🏗️ 기술 아키텍처

### 🗂️ 파일 구조

```
src/
├── app/posts/[id]/
│   ├── page.tsx                 # 메인 페이지 컴포넌트
│   └── loading.tsx              # 로딩 컴포넌트
├── components/molecules/post/
│   ├── PostHeader.tsx           # 게시물 헤더
│   ├── PostContent.tsx          # 콘텐츠 렌더링
│   ├── PostActions.tsx          # 수정/삭제 버튼
│   └── TableOfContents.tsx      # 목차 네비게이션
├── components/molecules/comment/
│   ├── CommentSection.tsx       # 댓글 섹션
│   ├── CommentForm.tsx          # 댓글 작성 폼
│   └── CommentList.tsx          # 댓글 목록
├── hooks/
│   ├── useComments.ts           # 댓글 상태 관리
│   └── useTableOfContents.ts    # 목차 스크롤 추적
├── app/api/
│   ├── posts/[id]/
│   │   └── route.ts             # 게시물 조회/수정/삭제 API
│   └── comments/
│       ├── route.ts             # 댓글 생성 API
│       └── [postId]/
│           └── route.ts         # 댓글 조회 API
└── lib/api/
    ├── post.ts                  # 게시물 API 함수
    └── comment.ts               # 댓글 API 함수
```

### 🔄 데이터 플로우

1. **서버 컴포넌트**: 초기 게시물 데이터 패칭
2. **클라이언트 컴포넌트**: 사용자 상호작용 처리
3. **API 라우트**: 댓글 CRUD 작업
4. **상태 관리**: React hooks 기반 로컬 상태

## 📊 성능 지표

- **First Contentful Paint**: 목표 < 2초
- **Time to Interactive**: 목표 < 3초
- **Cumulative Layout Shift**: 목표 < 0.1

## 🔒 보안 고려사항

- **XSS 방지**: 댓글 내용 sanitization
- **CSRF 보호**: API 요청 보안
- **입력 검증**: 클라이언트 및 서버 양쪽 validation

## 📱 접근성 (A11y)

- **키보드 네비게이션**: 모든 기능 키보드 접근 가능
- **스크린 리더**: 적절한 ARIA 레이블 및 시맨틱 HTML
- **색상 대비**: WCAG 2.1 AA 기준 준수

## 🚀 고도화 방안

### 📈 단기 개선사항

- **소셜 공유**: 각 SNS 플랫폼 공유 기능
- **읽기 시간 표시**: 예상 읽기 시간 계산
- **북마크 기능**: 사용자 북마크 저장

### 🌟 중기 개선사항

- **관련 게시물**: AI 기반 유사 게시물 추천
- **댓글 답글**: 중첩 댓글 시스템
- **실시간 업데이트**: WebSocket 기반 실시간 댓글

### 🎯 장기 비전

- **개인화**: 사용자 읽기 습관 기반 맞춤 추천
- **다국어**: i18n 지원
- **오프라인**: PWA 기능 및 오프라인 읽기

## 📋 단계별 개발 계획

### Phase 1: 핵심 페이지 구조 구현

- **Task 1.1**: 메인 페이지 컴포넌트 (`src/app/posts/[id]/page.tsx`)
  - 동적 라우팅 파라미터 처리, 서버사이드 데이터 패칭, 메타데이터 설정
- **Task 1.2**: 로딩 UI (`src/app/posts/[id]/loading.tsx`)
  - 스켈레톤 UI 구현

### Phase 2: 게시물 헤더 및 네비게이션

- **Task 2.1**: 게시물 헤더 컴포넌트 (`src/components/molecules/post/PostHeader.tsx`)
  - 제목, 작성일, 태그 표시, 반응형 레이아웃
- **Task 2.2**: 액션 버튼 컴포넌트 (`src/components/molecules/post/PostActions.tsx`)
  - 수정/삭제 버튼, 확인 모달 통합

### Phase 3: 콘텐츠 렌더링 시스템

- **Task 3.1**: Toast UI 마크다운 뷰어 (`src/components/molecules/post/PostContent.tsx`)
  - 동적 Toast UI Editor 임포트, 코드 하이라이팅, 다크 테마 적용
- **Task 3.2**: 목차 네비게이션 (`src/components/molecules/post/TableOfContents.tsx`)
  - 헤더 자동 추출, 스크롤 위치 추적, 클릭 시 섹션 이동

### Phase 4: 댓글 시스템

- **Task 4.1**: 댓글 API 구현
  - `src/app/api/comments/route.ts`, `src/app/api/comments/[postId]/route.ts`
- **Task 4.2**: 댓글 UI 컴포넌트
  - `CommentSection.tsx`, `CommentForm.tsx`, `CommentList.tsx`

### Phase 5: 상태 관리 및 커스텀 훅

- **Task 5.1**: 댓글 상태 관리 (`src/hooks/useComments.ts`)
- **Task 5.2**: 목차 스크롤 훅 (`src/hooks/useTableOfContents.ts`)

### Phase 6: 스타일링 및 반응형

- **Task 6.1**: 반응형 레이아웃 (Tailwind CSS)
- **Task 6.2**: 애니메이션 및 전환 효과

### Phase 7: 에러 처리 및 최적화

- **Task 7.1**: 에러 바운더리 (`src/app/posts/[id]/error.tsx`)
- **Task 7.2**: SEO 최적화 (Next.js 메타데이터 API)

## 🚨 주요 리스크 및 대응방안

### 1. Toast UI Editor SSR 문제

- **위험도**: 높음
- **대응**: 동적 임포트 및 클라이언트 전용 렌더링

### 2. 대용량 콘텐츠 성능

- **위험도**: 중간
- **대응**: 지연 로딩 및 가상화

### 3. 목차 네비게이션 스크롤 이슈

- **위험도**: 중간
- **대응**: IntersectionObserver 최적화 및 오프셋 계산

### 4. 댓글 실시간 업데이트

- **위험도**: 중간
- **대응**: 낙관적 업데이트 및 에러 핸들링

## 🧪 테스트 계획

### 단위 테스트

- 각 컴포넌트 렌더링 테스트
- 커스텀 훅 기능 테스트
- API 함수 테스트

### 통합 테스트

- 게시물 로딩 플로우
- 댓글 작성/삭제 플로우
- 목차 네비게이션 동작

### E2E 테스트

- 사용자 시나리오 기반 전체 플로우
- 다양한 화면 크기에서의 동작

## 🔧 개발 환경 설정

### 필요한 패키지

```bash
npm install @toast-ui/react-editor
npm install @toast-ui/editor-plugin-code-syntax-highlight
npm install prismjs
```

---

**📌 이 문서는 기존 구현을 기반으로 한 역추적 강화 분석입니다.**
