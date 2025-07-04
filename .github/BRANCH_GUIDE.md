# 🌿 브랜치 사용 가이드

## 📋 현재 활성 브랜치들

### 🏠 메인 브랜치
- **`main`** - 프로덕션 배포용 (보호됨)
  - 항상 배포 가능한 상태 유지
  - 직접 커밋 금지, PR을 통해서만 병합

### 🚀 기능 개발 브랜치들

#### **`feature/ui-improvements`**
- **목적**: UI/UX 개선 작업
- **담당**: UI 디자인, 반응형 웹, 스타일링
- **예시 작업**:
  - 다크 모드 구현
  - 모바일 반응형 개선
  - 애니메이션 효과 추가
  - 컴포넌트 스타일 업데이트

#### **`feature/blog-features`**
- **목적**: 블로그 기능 확장
- **담당**: 블로그 관련 새로운 기능
- **예시 작업**:
  - 댓글 시스템 구현
  - 태그 필터링 기능
  - 검색 기능 추가
  - 게시물 분류 시스템

#### **`feature/performance-optimization`**
- **목적**: 성능 최적화 작업
- **담당**: 속도 개선, 번들 크기 최적화
- **예시 작업**:
  - 이미지 최적화
  - 코드 스플리팅
  - 캐싱 전략 개선
  - 번들 사이즈 축소

### 🚨 긴급 수정 브랜치

#### **`hotfix/critical-fixes`**
- **목적**: 프로덕션 긴급 버그 수정
- **담당**: 치명적 버그, 보안 이슈
- **우선순위**: 최고 (즉시 처리)

## 🔄 브랜치 사용 워크플로우

### 1️⃣ 작업 시작
```bash
# 원하는 브랜치로 이동
git checkout feature/ui-improvements

# 최신 코드 동기화
git pull origin feature/ui-improvements

# 또는 main에서 최신 코드 가져오기
git checkout main
git pull origin main
git checkout feature/ui-improvements
git merge main
```

### 2️⃣ 개발 진행
```bash
# 작업 후 커밋
git add .
git commit -m "feat: 다크 모드 토글 버튼 추가"

# 정기적으로 푸시
git push origin feature/ui-improvements
```

### 3️⃣ PR 생성
```bash
# GitHub에서 PR 생성
# Base: main ← Compare: feature/ui-improvements
```

### 4️⃣ 완료 후 정리
```bash
# 브랜치 삭제 (선택사항)
git branch -d feature/old-branch
git push origin --delete feature/old-branch
```

## 🎯 브랜치별 작업 가이드라인

### 🎨 UI 개선 브랜치 (`feature/ui-improvements`)
**적합한 작업:**
- CSS/SCSS 스타일 변경
- 컴포넌트 디자인 개선
- 반응형 웹 구현
- 애니메이션/트랜지션 추가
- 다크모드/테마 구현

**커밋 예시:**
```bash
git commit -m "style: 헤더 네비게이션 반응형 디자인 개선"
git commit -m "feat: 다크 모드 테마 전환 기능 추가"
```

### 📝 블로그 기능 브랜치 (`feature/blog-features`)
**적합한 작업:**
- 새로운 블로그 기능 추가
- 에디터 기능 확장
- 게시물 관리 기능
- 사용자 인터랙션 기능

**커밋 예시:**
```bash
git commit -m "feat: 게시물 태그 필터링 기능 구현"
git commit -m "feat: 댓글 시스템 백엔드 API 연동"
```

### ⚡ 성능 최적화 브랜치 (`feature/performance-optimization`)
**적합한 작업:**
- 번들 사이즈 최적화
- 이미지 최적화
- 코드 스플리팅
- 캐싱 전략 개선
- 렌더링 성능 개선

**커밋 예시:**
```bash
git commit -m "perf: 이미지 lazy loading 구현으로 초기 로딩 속도 개선"
git commit -m "perf: 동적 import를 통한 코드 스플리팅 적용"
```

### 🚨 긴급 수정 브랜치 (`hotfix/critical-fixes`)
**적합한 작업:**
- 프로덕션 버그 수정
- 보안 취약점 패치
- 치명적 오류 해결
- 긴급 기능 비활성화

**커밋 예시:**
```bash
git commit -m "hotfix: 로그인 세션 만료 오류 수정"
git commit -m "security: XSS 취약점 패치 적용"
```

## 🔒 브랜치 보호 규칙

### Main 브랜치 보호
- ✅ PR 필수
- ✅ 리뷰 승인 1명 이상
- ✅ CI/CD 통과 필수
- ✅ 최신 상태 유지 필수

### 기능 브랜치 권장사항
- 🔄 정기적으로 main과 동기화
- 📝 의미있는 커밋 메시지
- 🧪 로컬 테스트 완료 후 푸시
- 📋 PR 시 상세한 설명 작성

## 🚀 새 브랜치 생성 가이드

### 새로운 기능 브랜치 생성
```bash
# main에서 최신 코드 가져오기
git checkout main
git pull origin main

# 새 브랜치 생성
git checkout -b feature/새기능명

# 예시들
git checkout -b feature/user-authentication
git checkout -b feature/admin-dashboard
git checkout -b feature/mobile-app
git checkout -b fix/navbar-responsive
git checkout -b hotfix/login-security
```

### 브랜치 네이밍 컨벤션
- `feature/기능명` - 새로운 기능
- `fix/버그명` - 버그 수정
- `hotfix/긴급수정명` - 긴급 수정
- `docs/문서명` - 문서 작업
- `refactor/리팩토링명` - 코드 리팩토링
- `test/테스트명` - 테스트 추가

## 📞 도움이 필요한 경우

1. **브랜치 충돌**: GitHub Flow 가이드 참조
2. **작업 분담**: 팀과 상의 후 적절한 브랜치 선택
3. **긴급 상황**: `hotfix/critical-fixes` 브랜치 사용
4. **질문사항**: GitHub Issues 또는 팀 채널 활용

---

💡 **팁**: 작은 단위로 자주 커밋하고, 브랜치별 목적에 맞는 작업을 수행하세요!