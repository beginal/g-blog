# post-edit-page - Claude 강화 기능정의서

## 📝 기본 정보
- **작성자**: Claude AI  
- **작성일**: 2025-07-05  
- **기반 문서**: user-spec.md

## 🎯 기능 개요
> 블로그 게시물 생성 및 수정을 위한 통합 에디터 시스템으로, 직관적인 사용자 경험과 강력한 마크다운 편집 기능을 제공합니다. 실시간 미리보기, 스마트 폼 검증, 효율적인 메타데이터 관리를 통해 완성도 높은 글쓰기 환경을 구현합니다.

## 💡 핵심 기능

### ✍️ 듀얼 모드 에디터
- **생성 모드**: 새로운 게시물 작성을 위한 깔끔한 빈 에디터
- **수정 모드**: 기존 게시물 데이터를 미리 채워진 상태로 시작
- **자동 감지**: URL 경로 기반 모드 자동 판별 및 UI 변경

### 📝 Toast UI 마크다운 에디터
- **WYSIWYG & 마크다운**: 실시간 전환 가능한 이중 편집 모드
- **코드 하이라이팅**: 다양한 프로그래밍 언어 지원
- **표/수식 지원**: 복잡한 콘텐츠 작성 가능
- **다크 테마**: 일관된 다크 모드 디자인
- **자동 저장**: 주기적 임시 저장 (선택사항)

### 🎨 스마트 메타데이터 관리
- **제목 입력**: 
  - 실시간 글자 수 표시
  - 최적 길이 가이드라인
  - 중복 제목 체크
- **태그 시스템**: 
  - 동적 태그 추가/삭제
  - 태그 자동완성 제안
  - 시각적 태그 배지
- **썸네일 관리**: 
  - URL 유효성 검사
  - 이미지 미리보기
  - 기본 썸네일 제공

### 🔍 실시간 검증 시스템
- **폼 검증**: 
  - 제목 길이 및 필수 입력 체크
  - 태그 개수 제한 및 형식 검증
  - 썸네일 URL 유효성 검사
- **에러 피드백**: 
  - 필드별 세부 에러 메시지
  - 시각적 에러 하이라이팅
  - 사용자 친화적 안내 문구

## 🎨 UI/UX 개선사항

### 📱 반응형 에디터 경험
- **모바일 최적화**: 
  - 터치 친화적 인터페이스
  - 가상 키보드 대응
  - 최적화된 버튼 크기
- **태블릿 지원**: 
  - 사이드바 적응형 레이아웃
  - 펜 입력 지원
- **데스크톱 향상**: 
  - 키보드 단축키 지원
  - 듀얼 모니터 대응

### ⚡ 성능 최적화
- **지연 로딩**: 
  - Toast UI Editor 동적 임포트
  - 대용량 이미지 최적화
- **메모리 관리**: 
  - 컴포넌트 언마운트 시 정리
  - 메모리 누수 방지
- **캐싱 전략**: 
  - 임시 저장 데이터 관리
  - 브라우저 캐싱 활용

### 🎭 시각적 개선
- **로딩 상태**: 
  - 스켈레톤 UI 구현
  - 프로그레스 인디케이터
  - 부드러운 전환 애니메이션
- **인터랙션**: 
  - 버튼 hover/focus 효과
  - 폼 필드 포커스 스타일
  - 성공/실패 상태 피드백

## 🏗️ 기술 아키텍처

### 🗂️ 컴포넌트 구조
```
src/
├── app/
│   ├── posts/new/
│   │   └── page.tsx              # 새 게시물 작성 페이지
│   └── posts/[id]/edit/
│       └── page.tsx              # 게시물 수정 페이지
├── components/molecules/editor/
│   ├── EditorHeader.tsx          # 에디터 헤더 (뒤로가기, 제목)
│   ├── EditorTitleInput.tsx      # 제목 입력 필드
│   ├── EditorContent.tsx         # Toast UI 에디터 래퍼
│   ├── EditorMetaInputs.tsx      # 태그/썸네일 입력
│   ├── EditorActions.tsx         # 취소/저장 버튼
│   └── EditorErrorMessage.tsx    # 에러 메시지 표시
├── hooks/
│   ├── useEditor.ts              # 에디터 상태 관리
│   ├── usePostForm.ts            # 폼 데이터 관리
│   └── useAutoSave.ts            # 자동 저장 (선택사항)
├── utils/
│   ├── validation.ts             # 폼 검증 로직
│   └── sanitization.ts           # 입력 데이터 정리
├── app/api/
│   └── posts/
│       ├── route.ts              # 게시물 생성 API
│       └── [id]/
│           └── route.ts          # 게시물 조회/수정/삭제 API
├── lib/api/
│   └── post.ts                   # 게시물 API 함수
└── types/
    └── editor.types.ts           # 에디터 관련 타입
```

### 🔄 상태 관리 플로우
```typescript
// 에디터 상태 구조
interface EditorState {
  mode: 'create' | 'edit';
  loading: boolean;
  saving: boolean;
  formData: PostFormData;
  errors: Record<string, string>;
  isDirty: boolean;
}

// 폼 데이터 구조
interface PostFormData {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
}
```

## 🔧 고급 기능

### 📊 작성 통계
- **실시간 통계**: 
  - 글자 수, 단어 수, 문단 수
  - 예상 읽기 시간
  - 마크다운 요소 통계
- **작성 진행률**: 
  - 필수 필드 완성도
  - 권장 길이 달성도
  - 메타데이터 완성도

### 🎯 스마트 어시스턴트
- **작성 도움**: 
  - 제목 제안 (선택사항)
  - 태그 자동 추천
  - 문법 및 맞춤법 검사 (선택사항)
- **SEO 최적화**: 
  - 메타데이터 최적화 제안
  - 키워드 밀도 분석
  - 구조화된 데이터 가이드

### 🔄 버전 관리
- **초안 저장**: 
  - 로컬 스토리지 기반 임시 저장
  - 작성 중단 시 복구 기능
  - 여러 버전 관리 (선택사항)
- **변경 추적**: 
  - 수정 모드에서 변경 사항 하이라이팅
  - 저장 전 변경 내용 미리보기
  - 되돌리기 기능

## 🔒 보안 및 안정성

### 🛡️ 입력 검증
- **클라이언트 검증**: 
  - 실시간 폼 유효성 검사
  - XSS 방지 입력 필터링
  - 파일 크기 및 형식 제한
- **서버 검증**: 
  - 이중 검증 시스템
  - SQL 인젝션 방지
  - 입력 길이 제한

### 🔐 권한 관리
- **수정 권한**: 
  - 게시물 소유자 확인
  - 세션 기반 권한 체크
  - 만료 시간 관리
- **데이터 보호**: 
  - 민감 정보 마스킹
  - 안전한 데이터 전송
  - 로그 기록 관리

## 📊 성능 지표

### 🎯 목표 성능
- **에디터 로딩**: < 1초
- **자동 저장**: < 500ms
- **폼 제출**: < 2초
- **이미지 업로드**: < 3초

### 📈 최적화 전략
- **번들 크기**: 코드 스플리팅으로 최소화
- **메모리 사용**: 메모리 누수 방지
- **네트워크**: 요청 최적화 및 캐싱

## 📋 단계별 개발 계획

### Phase 1: 기본 페이지 구조
- **Task 1.1**: 라우팅 설정 (`src/app/posts/new/page.tsx`, `src/app/posts/[id]/edit/page.tsx`)
- **Task 1.2**: 에디터 레이아웃 (`src/components/organisms/PostEditor.tsx`)

### Phase 2: 에디터 헤더 구현
- **Task 2.1**: 에디터 헤더 컴포넌트 (`src/components/molecules/editor/EditorHeader.tsx`)
- **Task 2.2**: 네비게이션 로직 (뒤로가기, 저장 확인)

### Phase 3: 폼 입력 필드 구현
- **Task 3.1**: 제목 입력 컴포넌트 (`src/components/molecules/editor/EditorTitleInput.tsx`)
- **Task 3.2**: 메타데이터 입력 컴포넌트 (`src/components/molecules/editor/EditorMetaInputs.tsx`)

### Phase 4: Toast UI 에디터 통합
- **Task 4.1**: 에디터 컴포넌트 (`src/components/molecules/editor/EditorContent.tsx`)
- **Task 4.2**: 에디터 설정 및 플러그인 (코드 하이라이팅, 다크 테마)

### Phase 5: 폼 검증 시스템
- **Task 5.1**: 실시간 검증 로직 (`src/utils/validation.ts`)
- **Task 5.2**: 에러 표시 컴포넌트 (`src/components/molecules/editor/EditorErrorMessage.tsx`)

### Phase 6: 액션 버튼 구현
- **Task 6.1**: 액션 버튼 컴포넌트 (`src/components/molecules/editor/EditorActions.tsx`)
- **Task 6.2**: 저장 로직 (API 호출 및 에러 처리)

### Phase 7: 상태 관리 구현
- **Task 7.1**: 에디터 상태 훅 (`src/hooks/useEditor.ts`)
- **Task 7.2**: 폼 데이터 훅 (`src/hooks/usePostForm.ts`)

### Phase 8: API 통합
- **Task 8.1**: 게시물 API 함수 (`src/lib/api/post.ts`)
- **Task 8.2**: 데이터 변환 로직

### Phase 9: 고급 기능 구현
- **Task 9.1**: 자동 저장 기능 (`src/hooks/useAutoSave.ts`) - 선택사항
- **Task 9.2**: 이미지 업로드 - 선택사항

### Phase 10: 스타일링 및 반응형
- **Task 10.1**: Tailwind CSS 스타일링
- **Task 10.2**: 접근성 개선

## 🚨 주요 리스크 및 대응방안

### 1. Toast UI Editor SSR 문제
- **위험도**: 높음
- **대응**: 동적 임포트 및 클라이언트 전용 렌더링

### 2. 대용량 콘텐츠 성능
- **위험도**: 중간
- **대응**: 지연 로딩 및 가상화

### 3. 브라우저 호환성
- **위험도**: 중간
- **대응**: 폴리필 및 피처 디텍션

### 4. 데이터 손실 방지
- **위험도**: 높음
- **대응**: 자동 저장 및 확인 모달

## 🧪 테스트 계획

### 단위 테스트
- 각 컴포넌트 렌더링 테스트
- 폼 검증 로직 테스트
- 커스텀 훅 기능 테스트

### 통합 테스트
- 에디터 전체 플로우 테스트
- API 통신 테스트
- 상태 관리 통합 테스트

### E2E 테스트
- 게시물 생성 시나리오
- 게시물 수정 시나리오
- 에러 처리 시나리오

## 🔧 개발 환경 설정
### 필요한 패키지
```bash
# Toast UI Editor 관련
npm install @toast-ui/react-editor
npm install @toast-ui/editor-plugin-code-syntax-highlight

# 유틸리티
npm install lodash-es
npm install @types/lodash-es

# 폼 검증
npm install zod
```

### 환경 변수 설정
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 📊 성능 목표
- **에디터 초기 로딩**: < 1초
- **폼 검증 응답**: < 100ms
- **자동 저장**: < 500ms
- **게시물 저장**: < 2초

---

**📌 이 문서는 기존 구현을 기반으로 한 역추적 강화 분석입니다.**