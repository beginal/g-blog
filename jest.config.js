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
  
  // 모듈 경로 매핑 (Next.js와 동일하게) - 올바른 속성명
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
  ],
  
  // 테스트 실행 시 무시할 경로
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  
  // 변환 설정
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // 모듈 파일 확장자
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
}

// createJestConfig는 비동기이므로 next/jest가 설정을 로드할 수 있도록 내보냄
module.exports = createJestConfig(customJestConfig)