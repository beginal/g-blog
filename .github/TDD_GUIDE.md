# 🧪 TDD (Test-Driven Development) 가이드

## 📋 TDD란?

**Test-Driven Development**는 다음 사이클을 반복하는 개발 방법론입니다:

```
🔴 Red → 🟢 Green → 🔵 Refactor
```

1. **🔴 Red**: 실패하는 테스트 작성
2. **🟢 Green**: 테스트를 통과하는 최소한의 코드 작성
3. **🔵 Refactor**: 코드 개선 및 최적화

## 🚀 프로젝트 TDD 환경

### 설치된 도구들
- **Jest**: 테스트 러너 및 어설션 라이브러리
- **React Testing Library**: React 컴포넌트 테스트
- **@testing-library/user-event**: 사용자 상호작용 시뮬레이션
- **@testing-library/jest-dom**: DOM 관련 추가 매처

### 테스트 스크립트
```bash
npm run test              # 테스트 실행
npm run test:watch        # 파일 변경 감지 모드
npm run test:coverage     # 커버리지 리포트
npm run test:ci           # CI 환경용 테스트
```

## 📁 테스트 파일 구조

```
src/
├── components/
│   └── __tests__/          # 컴포넌트 테스트
│       └── Button.test.tsx
├── lib/
│   └── __tests__/          # 유틸리티 함수 테스트
│       └── utils.test.ts
└── app/
    └── __tests__/          # 페이지 테스트
        └── page.test.tsx
```

## 🎯 TDD 실전 예시

### 1️⃣ 유틸리티 함수 TDD

```typescript
// ❌ 먼저 테스트 작성 (Red)
describe('formatDate', () => {
  it('날짜를 YYYY.MM.DD 형식으로 포맷한다', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('2024.01.15')
  })
})

// ✅ 테스트를 통과하는 코드 작성 (Green)
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '.')
}

// 🔄 리팩토링 (Refactor)
export function formatDate(date: Date, separator = '.'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${separator}${month}${separator}${day}`
}
```

### 2️⃣ React 컴포넌트 TDD

```typescript
// ❌ 먼저 테스트 작성 (Red)
describe('Button', () => {
  it('클릭 시 onClick 핸들러가 호출된다', async () => {
    const mockClick = jest.fn()
    render(<Button onClick={mockClick}>클릭</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})

// ✅ 테스트를 통과하는 컴포넌트 작성 (Green)
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

### 3️⃣ API 함수 TDD

```typescript
// ❌ 테스트 먼저 작성 (Red)
describe('fetchUser', () => {
  it('사용자 정보를 올바르게 가져온다', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'John' })
    })

    const user = await fetchUser(1)
    expect(user).toEqual({ id: 1, name: 'John' })
  })
})

// ✅ API 함수 구현 (Green)
export async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

## 🎨 테스트 패턴 및 모범 사례

### AAA 패턴 (Arrange-Act-Assert)

```typescript
it('게시물 삭제 버튼이 올바르게 동작한다', async () => {
  // 🏗️ Arrange: 테스트 환경 설정
  const mockOnDelete = jest.fn()
  const mockDeletePost = jest.fn().mockResolvedValue(undefined)
  
  // 🎬 Act: 실제 동작 수행
  render(<DeleteButton postId="123" onDelete={mockOnDelete} />)
  await userEvent.click(screen.getByRole('button'))
  
  // ✅ Assert: 결과 검증
  expect(mockDeletePost).toHaveBeenCalledWith('123')
  expect(mockOnDelete).toHaveBeenCalledWith('123')
})
```

### 테스트 더블 (Test Doubles)

```typescript
// 🎭 Mock: 호출 여부와 인자를 검증
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
}

// 🏪 Stub: 특정 값을 반환
const mockFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(mockData)
})

// 🎪 Spy: 실제 구현을 감시
const consoleSpy = jest.spyOn(console, 'error')
```

## 📊 테스트 커버리지 목표

### 권장 커버리지
- **라인 커버리지**: 80% 이상
- **함수 커버리지**: 90% 이상
- **브랜치 커버리지**: 75% 이상

### 우선순위별 테스트
1. **🔥 High**: 비즈니스 로직, 사용자 상호작용
2. **🔶 Medium**: 유틸리티 함수, API 호출
3. **🔷 Low**: UI 컴포넌트 스타일링

## 🛠️ 자주 사용하는 테스트 유틸리티

### 컴포넌트 렌더링
```typescript
// 기본 렌더링
render(<MyComponent />)

// Props와 함께 렌더링
render(<MyComponent prop1="value1" prop2={2} />)

// Context Provider와 함께
render(
  <ThemeProvider theme="dark">
    <MyComponent />
  </ThemeProvider>
)
```

### 엘리먼트 선택
```typescript
// 역할(role)로 선택 (권장)
screen.getByRole('button', { name: /submit/i })

// 텍스트로 선택
screen.getByText('Hello World')

// 라벨로 선택
screen.getByLabelText('Email')

// 테스트 ID로 선택 (최후의 수단)
screen.getByTestId('custom-element')
```

### 사용자 이벤트
```typescript
const user = userEvent.setup()

// 클릭
await user.click(button)

// 타이핑
await user.type(input, 'Hello World')

// 키보드 이벤트
await user.keyboard('{Enter}')

// 파일 업로드
await user.upload(fileInput, file)
```

### 비동기 테스트
```typescript
// 엘리먼트가 나타날 때까지 대기
await screen.findByText('Success message')

// 조건이 만족될 때까지 대기
await waitFor(() => {
  expect(mockFunction).toHaveBeenCalled()
})

// 특정 시간 대기
await act(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
})
```

## 🎯 AI와 함께하는 TDD

### Claude와의 협업 패턴

1. **📝 요구사항 명세**
   ```
   사용자: "게시물 삭제 기능이 필요해"
   Claude: "테스트부터 작성해보겠습니다"
   ```

2. **🔴 Red 단계**
   - Claude가 실패하는 테스트 작성
   - 예상 동작을 명확히 정의

3. **🟢 Green 단계**
   - Claude가 테스트를 통과하는 최소한의 코드 작성
   - 빠른 피드백으로 방향 수정

4. **🔵 Refactor 단계**
   - 함께 코드 개선점 논의
   - 성능과 가독성 최적화

### TDD의 AI 협업 장점

✅ **명확한 스펙 제공**: AI가 정확히 뭘 구현해야 하는지 알 수 있음
✅ **즉각적인 피드백**: 테스트 실패/성공으로 빠른 검증
✅ **안전한 리팩토링**: 기존 기능 보장하며 코드 개선
✅ **회귀 버그 방지**: 이전 기능들이 깨지지 않음을 보장

## 🚀 실제 워크플로우

### 새 기능 개발 시
```bash
# 1. 기능 브랜치 생성
git checkout -b feature/user-profile

# 2. 테스트 먼저 작성 (Red)
# src/components/__tests__/UserProfile.test.tsx

# 3. 테스트 실행 (실패 확인)
npm run test:watch

# 4. 구현 (Green)
# src/components/UserProfile.tsx

# 5. 테스트 통과 확인

# 6. 리팩토링 (Refactor)

# 7. 최종 테스트 실행
npm run test:coverage
```

### 버그 수정 시
```bash
# 1. 버그를 재현하는 테스트 작성
# 2. 테스트 실패 확인 (버그 재현)
# 3. 버그 수정
# 4. 테스트 통과 확인
# 5. 추가 엣지 케이스 테스트 작성
```

## 📚 추가 학습 자료

- [Jest 공식 문서](https://jestjs.io/)
- [React Testing Library 가이드](https://testing-library.com/docs/react-testing-library/intro/)
- [TDD 베스트 프랙티스](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🆘 문제 해결

### 자주 발생하는 이슈들

**문제**: `act()` 경고
```typescript
// ❌ 잘못된 방법
fireEvent.click(button)

// ✅ 올바른 방법
await user.click(button)
```

**문제**: 비동기 상태 업데이트
```typescript
// ❌ 잘못된 방법
expect(element).toBeInTheDocument()

// ✅ 올바른 방법
await waitFor(() => {
  expect(element).toBeInTheDocument()
})
```

**문제**: 모듈 모킹
```typescript
// ❌ 잘못된 위치
it('test', () => {
  jest.mock('@/lib/api')  // 너무 늦음
})

// ✅ 올바른 위치
jest.mock('@/lib/api')   // 파일 최상단

describe('Component', () => {
  // 테스트들...
})
```

---

💡 **기억하세요**: TDD는 단순히 테스트 작성이 아니라, 더 나은 설계와 안전한 개발을 위한 도구입니다!