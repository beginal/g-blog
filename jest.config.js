const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 제공하여 next.config.js와 .env 파일을 로드
  dir: './',
})

// Jest에 전달될 사용자 정의 설정 추가
const customJestConfig = {
  // 각 테스트 실행 전에 실행될 설정 파일
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 테스트 환경
  testEnvironment: 'jest-environment-jsdom',
  
  // 모듈 경로 매핑 (Next.js와 동일하게)
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/__mocks__/fileMock.js'
  },
  
  // 테스트 파일 패턴
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  
  // 커버리지 수집 설정
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/globals.css',
    '!src/app/**/layout.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/not-found.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/page.tsx', // 페이지 컴포넌트는 E2E 테스트에서 다룸
    '!src/app/api/**', // API 라우트는 별도 통합 테스트에서 다룸
    '!src/middleware.ts', // 미들웨어는 별도 테스트에서 다룸
  ],
  
  // 커버리지 임계값 설정
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // 커버리지 리포트 설정
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // 테스트 실행 시 무시할 경로
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',
    '<rootDir>/out/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
  ],
  
  // 변환 설정
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // 모듈 파일 확장자
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  
  // 테스트 실행 최적화
  maxWorkers: '50%',
  
  // 테스트 결과 포맷팅
  verbose: true,
  
  // 테스트 실행 시 콘솔 출력 제한
  silent: false,
  
  // 느린 테스트 경고 설정 (5초 이상)
  slowTestThreshold: 5,
  
  // 테스트 실행 전 캐시 클리어
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
}

// createJestConfig는 비동기이므로 next/jest가 설정을 로드할 수 있도록 내보냄
module.exports = createJestConfig(customJestConfig)