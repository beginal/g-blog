# comment-system - 개발 계획서 (Claude 작성)

## 📝 기본 정보
- **기반 문서**: Enhanced 기능정의서
- **계획 작성**: Claude
- **작성일**: 2025-07-05
- **예상 개발 기간**: 3-4일

## 🎯 프로젝트 통합 전략
> 현재 프로젝트 구조에 자연스럽게 녹이는 방법

### 기존 코드베이스 분석
- **관련 기존 파일**: 
  - `src/app/(pages)/posts/[id]/page.tsx` (댓글 섹션 추가 위치)
  - `src/lib/supabase.ts` (DB 연결, 기존 활용)
  - `src/data/posts.ts` (posts 관련 함수들, 참고용)
- **재사용 가능한 컴포넌트**: 
  - 기존 Button, Input 컴포넌트 스타일
  - 기존 로딩 스피너 컴포넌트
  - 기존 에러 처리 패턴
- **기존 스타일 시스템**: 
  - Tailwind CSS 다크 테마 (`bg-[#2c313a]`, `text-white` 등)
  - 기존 카드 스타일 (`rounded-2xl`, `border border-[#3a404d]`)
- **상태 관리 패턴**: 
  - Local useState 위주 (현재 프로젝트와 일치)
  - useEffect로 데이터 fetching

### 통합 포인트
- **수정이 필요한 기존 파일**: 
  - `src/app/(pages)/posts/[id]/page.tsx`: CommentSection 컴포넌트 추가
- **새로 생성할 파일**: 
  - API 라우트 2개, 컴포넌트 5개, 타입 파일, 훅, 유틸리티
- **의존성 추가**: 없음 (기존 Supabase, React, TypeScript 활용)

## 📋 단계별 개발 계획

### Phase 1: 기반 작업 (1일)
- [ ] **Task 1.1**: 데이터 모델 설계 및 타입 정의
  - 파일: `src/types/comment.types.ts`
  - 예상 시간: 1시간
  - 의존성: 없음
  
- [ ] **Task 1.2**: Supabase 테이블 생성 (수동)
  - 테이블: `comments` (id, post_id, nickname, content, created_at)
  - 예상 시간: 30분
  - 의존성: Task 1.1

- [ ] **Task 1.3**: Validation 유틸리티 구현
  - 파일: `src/utils/validation.ts`
  - 예상 시간: 1시간
  - 의존성: Task 1.1

### Phase 2: API 개발 (1일)
- [ ] **Task 2.1**: 댓글 조회 API 구현
  - 파일: `src/app/api/comments/[postId]/route.ts`
  - 예상 시간: 2시간
  - 의존성: Task 1.1, 1.2

- [ ] **Task 2.2**: 댓글 작성 API 구현
  - 파일: `src/app/api/comments/route.ts`
  - 예상 시간: 2시간
  - 의존성: Task 1.1, 1.2, 1.3

- [ ] **Task 2.3**: API 에러 처리 및 테스트
  - API 테스트: Postman 또는 REST Client
  - 예상 시간: 1시간
  - 의존성: Task 2.1, 2.2

### Phase 3: 컴포넌트 개발 (1.5일)
- [ ] **Task 3.1**: useComments 훅 구현
  - 파일: `src/hooks/useComments.ts`
  - 예상 시간: 2시간
  - 의존성: Task 2.1, 2.2

- [ ] **Task 3.2**: 기본 컴포넌트 구현
  - 파일: `CommentItem.tsx`, `CommentEmpty.tsx`
  - 예상 시간: 2시간
  - 의존성: Task 1.1

- [ ] **Task 3.3**: 댓글 목록 컴포넌트 구현
  - 파일: `CommentList.tsx`
  - 예상 시간: 1시간
  - 의존성: Task 3.2

- [ ] **Task 3.4**: 댓글 작성 폼 구현
  - 파일: `CommentForm.tsx`
  - 예상 시간: 3시간
  - 의존성: Task 3.1, 1.3

### Phase 4: 통합 및 최적화 (0.5일)
- [ ] **Task 4.1**: CommentSection 통합 컴포넌트
  - 파일: `CommentSection.tsx`, `index.ts`
  - 예상 시간: 1시간
  - 의존성: Task 3.3, 3.4

- [ ] **Task 4.2**: 게시물 페이지에 댓글 섹션 추가
  - 파일: `src/app/(pages)/posts/[id]/page.tsx`
  - 예상 시간: 30분
  - 의존성: Task 4.1

- [ ] **Task 4.3**: 스타일링 및 반응형 조정
  - 모든 컴포넌트 파일
  - 예상 시간: 2시간
  - 의존성: Task 4.2

## 🚨 예상 버그 및 대응 방안

### 높은 확률 (70% 이상)
1. **버그**: 댓글 작성 후 목록이 즉시 업데이트되지 않음
   - **발생 조건**: 낙관적 업데이트 실패 또는 상태 동기화 문제
   - **영향도**: Medium
   - **사전 대응**: useComments 훅에서 명확한 상태 관리 로직 구현
   - **발생시 해결책**: 댓글 작성 후 강제로 목록 재조회

2. **버그**: API 요청 실패 시 무한 로딩 상태
   - **발생 조건**: 네트워크 오류, 서버 에러, Supabase 연결 실패
   - **영향도**: High
   - **사전 대응**: try-catch 블록과 타임아웃 설정
   - **발생시 해결책**: 에러 상태 표시 후 재시도 버튼 제공

3. **버그**: 동일한 댓글 중복 제출
   - **발생 조건**: 사용자가 빠르게 연속 클릭
   - **영향도**: Medium
   - **사전 대응**: 제출 버튼 disabled 상태 관리
   - **발생시 해결책**: 서버 측에서 중복 감지 및 차단

### 중간 확률 (30-70%)
4. **버그**: Supabase RLS 정책으로 인한 접근 거부
   - **발생 조건**: Row Level Security 설정 문제
   - **영향도**: High
   - **사전 대응**: 익명 사용자 접근 허용 정책 미리 설정
   - **발생시 해결책**: Supabase 대시보드에서 정책 수정

5. **버그**: 긴 댓글 내용으로 인한 레이아웃 깨짐
   - **발생 조건**: 매우 긴 텍스트, 줄바꿈 없는 URL
   - **영향도**: Low
   - **사전 대응**: CSS word-break, max-height 설정
   - **발생시 해결책**: 텍스트 말줄임 처리 또는 스크롤 영역

6. **버그**: 특수문자/이모지 입력 시 인코딩 문제
   - **발생 조건**: 유니코드 문자, 이모지 포함 댓글
   - **영향도**: Medium
   - **사전 대응**: UTF-8 인코딩 명시적 설정
   - **발생시 해결책**: 서버와 클라이언트 인코딩 통일

### 낮은 확률 (30% 미만)
7. **버그**: 대량의 댓글로 인한 성능 저하
   - **발생 조건**: 100개 이상의 댓글이 있는 게시물
   - **영향도**: Medium
   - **사전 대응**: 초기 로딩 개수 제한 (50개)
   - **발생시 해결책**: 페이지네이션 또는 가상화 도입

## 🔍 테스트 전략

### 개발 중 테스트
- [ ] **Unit Test**: validation 함수 테스트
- [ ] **API Test**: Postman으로 API 엔드포인트 검증
- [ ] **Component Test**: 각 컴포넌트 렌더링 및 상호작용 테스트
- [ ] **Integration Test**: 댓글 작성부터 표시까지 전체 플로우

### 배포 전 테스트
- [ ] **Performance Test**: 
  - 50개 댓글 로딩 시간 < 2초
  - 댓글 작성 후 화면 반영 < 1초
- [ ] **Cross-browser Test**: Chrome, Safari, Firefox에서 동작 확인
- [ ] **Responsive Test**: 
  - 모바일 (320px~768px): 댓글 폼 세로 배치
  - 태블릿 (768px~1024px): 적절한 여백 유지
  - 데스크톱 (1024px~): 최대 너비 제한
- [ ] **Accessibility Test**: 
  - 키보드 네비게이션으로 모든 기능 접근 가능
  - 스크린 리더 호환성 확인

## 📊 성능 최적화 계획

### 예상 성능 이슈
- **이슈 1**: 댓글 목록 렌더링 시 과도한 리렌더링
  - **최적화 방법**: React.memo로 CommentItem 최적화, key props 적절히 설정
- **이슈 2**: API 요청 중복 호출
  - **최적화 방법**: useEffect dependency 배열 최적화, 요청 중복 방지 로직

### 모니터링 포인트
- **측정 항목**: 
  - 댓글 목록 첫 로딩 시간
  - 댓글 작성 후 반영 시간
  - 컴포넌트 렌더링 횟수
- **목표 수치**: 
  - 첫 로딩 < 2초
  - 댓글 작성 반영 < 1초
  - 불필요한 리렌더링 0회

## 🔄 롤백 계획

### 문제 발생 시 롤백 전략
- **Critical Issue**: 댓글 기능 전체 비활성화 (CommentSection 조건부 렌더링)
- **Performance Issue**: 댓글 개수 제한 (50개로 임시 제한)
- **User Experience Issue**: 기본 폼으로 단순화 (실시간 업데이트 제거)

### 점진적 배포 계획
- **Alpha**: 로컬 개발 환경에서 전체 기능 테스트
- **Beta**: 스테이징 환경에서 실제 데이터로 테스트
- **Production**: 메인 브랜치 머지 후 프로덕션 배포

## 💡 개발 시 주의사항

### 기존 코드와의 일관성
- Tailwind 클래스명 기존 패턴 따르기
- 에러 처리 방식 기존 코드와 동일하게
- 컴포넌트 명명 규칙 준수

### 보안 고려사항
- XSS 방지: 사용자 입력 적절히 이스케이프
- SQL Injection 방지: Supabase parameterized query 사용
- Rate Limiting: 클라이언트 사이드에서 기본적인 제한

### 접근성 준수
- 모든 폼 요소에 적절한 label 또는 aria-label
- 키보드만으로 모든 기능 사용 가능
- 충분한 색상 대비 확보

---
**📌 개발 계획서 완료! 이제 실제 개발을 시작할 준비가 되었습니다.**