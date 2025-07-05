# Spec 폴더

이 폴더는 새로운 기능을 개발하기 전에 상세한 기능명세서와 구현 계획을 작성하는 공간입니다.

## 목적

- 구현 전 충분한 사고와 계획
- 엣지 케이스 사전 파악
- 기술적 접근 방법 문서화
- 구현 중 참고할 수 있는 가이드

## 폴더 구조

```
spec/
├── README.md
├── template-user.md
├── template-enhanced.md
├── template-development-report.md
├── create-feature.sh
└── [기능명]/
    ├── user-spec.md           # 사용자가 작성하는 기능정의서
    ├── enhanced-spec.md       # Claude가 enhance한 정의서 (개발 계획 포함)
    ├── development-report.md  # 개발 완료 후 작성하는 보고서
    └── assets/               # 관련 이미지, 와이어프레임 등

실제 구현 구조:
src/
├── app/
│   ├── [기능 페이지들]/
│   └── api/                  # ⚠️ API 라우트 (중요!)
│       └── [엔드포인트들]/
├── components/
├── hooks/
├── lib/api/                  # ⚠️ API 함수들 (중요!)
└── types/
```

## 📁 현재 구현된 기능들

### ✅ comment-system
- **상태**: 개발 완료
- **파일**: 
  - `user-spec.md` - 사용자 기능정의서
  - `enhanced-spec.md` - Claude 강화 기능정의서 (개발 계획 포함)
  - `development-report.md` - 개발 완료 보고서

### ✅ post-detail-page
- **상태**: 기존 구현 역추적 문서화 완료
- **파일**: 
  - `user-spec.md` - 사용자 기능정의서 (역추적 분석)
  - `enhanced-spec.md` - Claude 강화 기능정의서 (개발 계획 포함)
  - `development-report.md` - 개발 완료 보고서

### ✅ post-edit-page
- **상태**: 기존 구현 역추적 문서화 완료
- **파일**: 
  - `user-spec.md` - 사용자 기능정의서 (역추적 분석)
  - `enhanced-spec.md` - Claude 강화 기능정의서 (개발 계획 포함)
  - `development-report.md` - 개발 완료 보고서

## 🔄 새로운 작업 프로세스

### 1단계: 폴더 생성 및 초기 설정
```bash
# npm 스크립트로 실행
npm run create-feature [기능명]

# 또는 직접 실행
./spec/create-feature.sh [기능명]
```

### 2단계: 사용자 기능정의서 작성
- `spec/[기능명]/user-spec.md` 파일 편집
- 원하는 기능을 자유롭게 작성

### 3단계: Claude Enhancement
- Claude에게 "enhance 해줘" 요청
- `enhanced-spec.md` 파일 자동 생성 (단계별 개발 계획 포함)

### 4단계: 검토 및 승인
- enhanced-spec.md 내용 검토
- 수정 요청 또는 승인

### 5단계: 개발 시작
- enhanced-spec.md의 단계별 계획에 따라 개발 진행

### 6단계: 개발 완료 보고서 작성
- 개발 완료 후 `development-report.md` 작성
- 마주한 버그와 해결 방법 문서화
- 성능 개선 결과 및 향후 개선 방안 포함

## 📋 워크플로우 요약

```
사용자 작성 → Claude Enhance → 사용자 검토 → 개발 시작 → 개발 완료 보고서
    ↓              ↓              ↓            ↓           ↓
user-spec.md → enhanced-spec.md → 검토/수정 → 실제 개발 → development-report.md
                (계획 포함)
```

## 파일 명명 규칙

- `user-spec.md` - 사용자가 작성하는 기능정의서
- `enhanced-spec.md` - Claude가 enhance한 정의서 (개발 계획 포함)
- `development-report.md` - 개발 완료 후 작성하는 보고서
- `assets/` - 관련 이미지, 와이어프레임 등

## 작성 가이드

각 명세서에는 다음 내용을 포함해야 합니다:

### user-spec.md
1. **기능 개요** - 목적과 배경
2. **구현하고 싶은 내용** - 구체적인 기능 요구사항
3. **UI/UX 요구사항** - 사용자 인터페이스 요구사항
4. **참고 자료** - 레퍼런스 사이트나 자료
5. **우선순위** - 필수/중요/선택/향후 구분

### enhanced-spec.md
1. **기능 개요** - 강화된 기능 설명
2. **핵심 기능** - 상세한 기능 분석
3. **UI/UX 개선사항** - 사용자 경험 개선 방안
4. **기술 아키텍처** - 구현 방법 및 기술 스택 (⚠️ **API 라우트 구조 필수 포함**)
5. **단계별 개발 계획** - Phase별 구현 계획
6. **주요 리스크 및 대응방안** - 예상 버그 및 해결책
7. **테스트 계획** - 테스트 시나리오
8. **개발 환경 설정** - 필요한 패키지 및 설정

### development-report.md
1. **구현 완료 항목** - 완성된 기능 목록
2. **발견된 버그** - 개발 중 마주한 버그와 해결 방법
3. **성능 개선 결과** - 최적화 성과
4. **향후 개선 방안** - 추가 개선 계획

## 와이어프레임 지원

Claude는 다음과 같은 방식으로 와이어프레임을 활용할 수 있습니다:

- **이미지 업로드**: 와이어프레임 이미지를 직접 분석
- **상세 구현**: 와이어프레임에 맞는 컴포넌트 구조 설계
- **반응형 고려**: 다양한 화면 크기에 대한 레이아웃 제안
- **기술 스택 추천**: 와이어프레임 요구사항에 맞는 기술 선택

### 와이어프레임 제공 시 포함할 정보
- 화면별 상세 기능 설명
- 사용자 인터랙션 플로우
- 데이터 표시 방식
- 상태 변화 시나리오