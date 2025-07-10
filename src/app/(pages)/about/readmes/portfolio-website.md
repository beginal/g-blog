# 개인 포트폴리오 웹사이트

React와 Next.js로 구축된 모던 포트폴리오 웹사이트입니다.

## 🚀 주요 기능

- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **다크 모드**: 우아한 다크 테마 인터페이스
- **애니메이션**: Framer Motion을 활용한 부드러운 애니메이션
- **SEO 최적화**: 검색 엔진 최적화 구현
- **성능 최적화**: Next.js의 최신 기능 활용

## 🛠️ 기술 스택

### Frontend
- **React 18**: 최신 React 기능 활용
- **Next.js 14**: App Router 및 서버 컴포넌트
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크

### 애니메이션 & UI
- **Framer Motion**: 고급 애니메이션 라이브러리
- **Lucide React**: 모던 아이콘 세트
- **React Hook Form**: 폼 상태 관리

### 배포 & 호스팅
- **Vercel**: 자동 배포 및 호스팅
- **GitHub**: 버전 관리 및 협업

## 📁 프로젝트 구조

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # 페이지 그룹
│   ├── components/        # 페이지별 컴포넌트
│   └── globals.css        # 전역 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── features/         # 기능별 컴포넌트
└── lib/                  # 유틸리티 함수
\`\`\`

## 🎨 디자인 특징

### 글래스모피즘 효과
- 반투명 배경과 블러 효과
- 부드러운 그라데이션
- 미묘한 그림자와 테두리

### 색상 팔레트
- **Primary**: Emerald Green (#6ee7b7)
- **Secondary**: Purple (#7c3aed)
- **Background**: Dark Gray (#1a1a1a)
- **Text**: Various white opacities

## 🔧 설치 및 실행

### 사전 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치
\`\`\`bash
# 저장소 클론
git clone [repository-url]

# 디렉토리 이동
cd portfolio-website

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
\`\`\`

### 빌드
\`\`\`bash
# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm start
\`\`\`

## 📱 반응형 브레이크포인트

| 디바이스 | 크기 | 설명 |
|---------|------|------|
| Mobile | < 640px | 스마트폰 |
| Tablet | 640px - 1024px | 태블릿 |
| Desktop | > 1024px | 데스크톱 |

## ⚡ 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트
- **코드 스플리팅**: 동적 import 활용
- **lazy Loading**: 지연 로딩 구현
- **SEO**: 메타 태그 및 sitemap

## 🌟 주요 페이지

### 홈페이지
- 히어로 섹션
- 프로젝트 프리뷰
- 연락처 정보

### 프로젝트 페이지
- 프로젝트 상세 정보
- 기술 스택 소개
- 라이브 데모 링크

### 블로그 (예정)
- 개발 관련 포스팅
- 기술 튜토리얼
- 프로젝트 회고

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📞 연락처

- **이메일**: [your-email@example.com]
- **GitHub**: [github-username]
- **LinkedIn**: [linkedin-profile]

---

> 이 프로젝트는 지속적으로 개선되고 있습니다. 피드백과 제안은 언제나 환영합니다! 🚀