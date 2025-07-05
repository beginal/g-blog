import { COLORS } from "@/config/constants";

/**
 * 색상 유틸리티 함수들
 */

/**
 * 색상에 opacity를 추가합니다
 * @param color - HEX 색상 코드 (#6ee7b7)
 * @param opacity - 0-1 사이의 투명도 값
 * @returns RGBA 문자열
 */
export function addOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * 색상에 16진수 opacity를 추가합니다 (Tailwind 스타일)
 * @param color - HEX 색상 코드 (#6ee7b7)
 * @param opacity - 16진수 투명도 (00-FF)
 * @returns HEX 색상 + opacity (#6ee7b7CC)
 */
export function addHexOpacity(color: string, opacity: string): string {
  return `${color}${opacity}`;
}

/**
 * 미리 정의된 opacity 레벨들
 */
export const OPACITY_LEVELS = {
  5: '0D',   // 5%
  10: '1A',  // 10%
  20: '33',  // 20%
  30: '4D',  // 30%
  40: '66',  // 40%
  50: '80',  // 50%
  60: '99',  // 60%
  70: 'B3',  // 70%
  80: 'CC',  // 80%
  90: 'E6',  // 90%
} as const;

/**
 * 색상 테마 객체 (CSS-in-JS 스타일)
 */
export const colorStyles = {
  primary: {
    background: COLORS.primary,
    backgroundHover: COLORS.primaryHover,
    text: COLORS.textPrimary,
    border: COLORS.primary,
  },
  secondary: {
    background: COLORS.surfaceLight,
    backgroundHover: COLORS.surfaceLighter,
    text: COLORS.text,
    border: COLORS.border,
  },
  surface: {
    background: COLORS.surface,
    backgroundHover: COLORS.surfaceLight,
    text: COLORS.text,
    border: COLORS.border,
  },
} as const;

/**
 * 자주 사용되는 색상 조합들
 */
export const colorCombinations = {
  primaryWithOpacity: {
    5: addHexOpacity(COLORS.primary, OPACITY_LEVELS[5]),
    10: addHexOpacity(COLORS.primary, OPACITY_LEVELS[10]),
    20: addHexOpacity(COLORS.primary, OPACITY_LEVELS[20]),
  },
  focus: {
    ring: COLORS.primary,
    ringOpacity: addOpacity(COLORS.primary, 0.5),
  },
  hover: {
    primary: COLORS.primaryHover,
    surface: COLORS.surfaceLight,
    text: COLORS.primary,
  },
} as const;