import '@testing-library/jest-dom'

// Jest DOM 환경에서 사용할 수 없는 브라우저 API 모의
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // 더 이상 사용되지 않음
    removeListener: jest.fn(), // 더 이상 사용되지 않음
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// ResizeObserver 모의 (일부 컴포넌트에서 사용)
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// IntersectionObserver 모의 (lazy loading 등에서 사용)
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// fetch API 모의 (API 테스트용)
global.fetch = jest.fn()

// 환경 변수 설정
process.env.NODE_ENV = 'test'

// Next.js 라우터 모의
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Toast UI Editor 모의 (다이나믹 임포트로 인한 테스트 이슈 방지)
jest.mock('@toast-ui/react-editor', () => ({
  Editor: jest.fn(({ initialValue, ...props }) => {
    return (
      <div data-testid="toast-ui-editor" {...props}>
        <textarea 
          data-testid="editor-textarea" 
          defaultValue={initialValue}
          onChange={() => {}}
        />
      </div>
    )
  }),
  Viewer: jest.fn(({ initialValue }) => (
    <div data-testid="toast-ui-viewer">{initialValue}</div>
  )),
}))

// 콘솔 에러/경고 정리 (테스트 결과를 더 깔끔하게)
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('componentWillReceiveProps')
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})