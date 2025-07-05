/** @type {import('jest').Config} */
const config = {
  displayName: 'E2E Tests',
  testMatch: [
    '<rootDir>/tests/e2e/**/*.test.{js,ts}',
    '<rootDir>/tests/e2e/**/*.e2e.{js,ts}'
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/e2e/setup.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        target: 'ES2020',
        module: 'commonjs',
        moduleResolution: 'node',
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        skipLibCheck: true,
        strict: true
      }
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testTimeout: 30000,
  maxWorkers: 1, // E2E 테스트는 순차 실행
  verbose: true
};

module.exports = config;