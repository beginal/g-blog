// 애플리케이션 상수

// 페이지네이션
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 8,
  MAX_PAGE_SIZE: 50,
  MIN_PAGE_SIZE: 1,
} as const;

// 포스트 관련
export const POST = {
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_CONTENT_LENGTH: 10,
  MAX_TAGS: 10,
  MAX_TAG_LENGTH: 50,
} as const;

// 이미지 관련
export const IMAGE = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  THUMBNAIL_SIZES: {
    sm: { width: 96, height: 96 },
    md: { width: 192, height: 192 },
    lg: { width: 384, height: 384 },
  },
} as const;

// API 관련
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
  TIMEOUT: 10000, // 10초
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1초
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  THEME: "portfolio-theme",
  USER_PREFERENCES: "portfolio-user-prefs",
  DRAFT_POSTS: "portfolio-draft-posts",
  RECENT_SEARCHES: "portfolio-recent-searches",
} as const;

// 애니메이션 지속시간
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// 색상 시스템
export const COLORS = {
  primary: "#6ee7b7",
  primaryHover: "#5ad1a0",
  background: "#262b33",
  surface: "#2c313a",
  surfaceLight: "#3a404d",
  surfaceLighter: "#4a505c",
  surfaceDark: "#1e2228",
  surfaceExtraDark: "#1a1f26",
  surfaceCard: "#2e333c",
  text: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.8)",
  textMuted: "rgba(255, 255, 255, 0.6)",
  textDisabled: "rgba(255, 255, 255, 0.4)",
  textPrimary: "#000000",
  border: "#3a404d",
  borderLight: "#4a505c",
  error: "#ef4444",
  warning: "#f59e0b",
  success: "#10b981",
  info: "#3b82f6",
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Z-index 레이어
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
  toast: 60,
} as const;

// 폰트 설정
export const FONTS = {
  sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
} as const;

// 프로필 정보
export const PROFILE_CONFIG = {
  name: "Ham Jun Ho",
  title: "Frontend Developer",
  location: "Seoul, Korea",
  status: "Available",
  email: "beginal01@gmail.com",
  phone: "010-9215-9984",
  github: "https://github.com/beginal",
  website: "https://g-blog.life",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop&auto=format",
} as const;

// 개발 환경 체크
export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_CLIENT = typeof window !== "undefined";
