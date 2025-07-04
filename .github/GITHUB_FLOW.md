# 🚀 GitHub Flow 가이드

## 📋 브랜치 전략 개요

이 프로젝트는 **GitHub Flow**를 사용합니다. 간단하고 효과적인 브랜치 전략으로 빠른 배포와 협업을 지원합니다.

## 🌊 GitHub Flow 워크플로우

### 1️⃣ 기능 개발 시작
```bash
# main 브랜치에서 최신 코드 가져오기
git checkout main
git pull origin main

# 새로운 기능 브랜치 생성
git checkout -b feature/기능명

# 예시
git checkout -b feature/user-authentication
git checkout -b feature/blog-editor
git checkout -b hotfix/login-bug
```

### 2️⃣ 개발 및 커밋
```bash
# 변경사항 추가
git add .

# 의미있는 커밋 메시지 작성
git commit -m "feat: 사용자 인증 기능 추가

- 로그인/로그아웃 기능 구현
- JWT 토큰 기반 인증
- 사용자 세션 관리

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 3️⃣ 원격 저장소에 푸시
```bash
# 기능 브랜치를 원격에 푸시
git push origin feature/기능명

# 예시
git push origin feature/user-authentication
```

### 4️⃣ Pull Request 생성
1. GitHub에서 **"Compare & pull request"** 클릭
2. PR 템플릿을 사용해서 상세한 설명 작성
3. 리뷰어 지정 (선택사항)
4. **"Create pull request"** 클릭

### 5️⃣ 코드 리뷰 및 피드백
- 리뷰어가 코드 검토
- 필요시 수정 사항 반영
- CI/CD 파이프라인 통과 확인

### 6️⃣ 메인 브랜치에 병합
```bash
# GitHub에서 "Merge pull request" 클릭
# 또는 로컬에서 병합
git checkout main
git pull origin main
git merge feature/기능명
git push origin main

# 기능 브랜치 정리
git branch -d feature/기능명
git push origin --delete feature/기능명
```

## 📝 브랜치 네이밍 컨벤션

### 기능 개발
- `feature/기능명`
- `feature/user-auth`
- `feature/blog-editor`
- `feature/responsive-design`

### 버그 수정
- `fix/버그명`
- `fix/login-error`
- `fix/mobile-layout`

### 긴급 수정
- `hotfix/긴급수정명`
- `hotfix/security-patch`
- `hotfix/critical-bug`

### 기타
- `docs/문서명` - 문서 수정
- `refactor/리팩토링명` - 코드 리팩토링
- `test/테스트명` - 테스트 추가

## 🔒 브랜치 보호 규칙 (권장)

GitHub 저장소 설정에서 다음 규칙을 설정하세요:

### Main 브랜치 보호
1. **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. 체크할 항목:
   - [x] Require a pull request before merging
   - [x] Require approvals (1명 이상)
   - [x] Require status checks to pass before merging
   - [x] Require branches to be up to date before merging
   - [x] Include administrators

## 🚀 CI/CD 파이프라인

### PR 생성 시 자동 실행
- ✅ ESLint 검사
- ✅ TypeScript 타입 체크
- ✅ 빌드 테스트
- ✅ 보안 취약점 검사
- ✅ Vercel Preview 배포

### Main 브랜치 병합 시
- ✅ 자동 프로덕션 배포

## 📋 커밋 메시지 컨벤션

```
타입: 제목

상세 설명 (선택사항)

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 타입 종류
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 스타일 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드/설정 변경

## 🎯 모범 사례

### ✅ DO
- 작은 단위로 자주 커밋
- 의미있는 커밋 메시지 작성
- PR 전에 로컬에서 빌드 테스트
- 코드 리뷰 요청 시 상세한 설명 제공
- main 브랜치는 항상 배포 가능한 상태 유지

### ❌ DON'T
- main 브랜치에 직접 커밋
- 너무 큰 단위의 PR 생성
- 테스트 없이 배포
- 불완전한 기능을 main에 병합
- 의미없는 커밋 메시지 ("fix", "update" 등)

## 🆘 문제 해결

### 브랜치 충돌 해결
```bash
# main 브랜치 최신화
git checkout main
git pull origin main

# 기능 브랜치로 돌아가서 rebase
git checkout feature/기능명
git rebase main

# 충돌 해결 후
git add .
git rebase --continue
git push --force origin feature/기능명
```

### 실수로 main에 커밋한 경우
```bash
# 마지막 커밋을 새 브랜치로 이동
git branch feature/새브랜치명
git reset --hard HEAD~1
git push --force origin main
git checkout feature/새브랜치명
git push origin feature/새브랜치명
```

## 📞 도움이 필요한 경우

- GitHub Issues를 통해 질문
- 팀 슬랙 채널에서 논의
- 이 문서 업데이트 제안