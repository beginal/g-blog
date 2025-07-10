/**
 * 환경 변수 검증 및 타입 안전성 보장
 */

// 필수 환경 변수 목록
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

// 선택적 환경 변수 목록
const optionalEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_STORAGE_BUCKET',
  'POSTGRES_URL',
  'POSTGRES_USER',
  'POSTGRES_HOST',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
] as const;

type RequiredEnvVar = (typeof requiredEnvVars)[number];
type OptionalEnvVar = (typeof optionalEnvVars)[number];

// 환경 변수 검증 함수
export function validateEnv(): Record<RequiredEnvVar, string> & Partial<Record<OptionalEnvVar, string>> {
  const env: any = {};
  const missingVars: string[] = [];

  // 필수 환경 변수 검증
  for (const key of requiredEnvVars) {
    const value = process.env[key];
    if (!value) {
      missingVars.push(key);
    } else {
      env[key] = value;
    }
  }

  // 선택적 환경 변수 추가
  for (const key of optionalEnvVars) {
    const value = process.env[key];
    if (value) {
      env[key] = value;
    }
  }

  // 필수 환경 변수가 누락된 경우 오류 발생
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  return env;
}

// 환경 변수 안전성 검증 (개발 중에만 실행)
export function validateEnvSecurity(): void {
  if (process.env.NODE_ENV === 'development') {
    // 프로덕션 환경 변수가 개발 환경에 노출되지 않도록 검증
    const productionOnlyVars = [
      'SUPABASE_SERVICE_ROLE_KEY',
      'POSTGRES_PASSWORD',
    ];

    for (const key of productionOnlyVars) {
      const value = process.env[key];
      if (value && value.length > 0) {
        console.warn(
          `⚠️  Warning: Production environment variable ${key} is set in development.`
        );
      }
    }
  }

  // 환경 변수 값의 기본 검증
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url.startsWith('https://')) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL must use HTTPS');
    }
  }
}

// 검증된 환경 변수 내보내기
export const env = validateEnv();

// 개발 환경에서 보안 검증 실행
if (process.env.NODE_ENV === 'development') {
  validateEnvSecurity();
}