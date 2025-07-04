// ClassNames 유틸리티 (clsx + tailwind-merge)

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스명을 합치고 중복을 제거하는 유틸리티 함수
 * Tailwind CSS 클래스의 충돌을 해결하고 조건부 클래스명을 처리합니다.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 조건부 클래스명 생성 헬퍼
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass: string = ''
): string {
  return condition ? trueClass : falseClass;
}

/**
 * 상태에 따른 클래스명 생성
 */
export function stateClass(state: 'idle' | 'loading' | 'success' | 'error'): string {
  const stateClasses = {
    idle: '',
    loading: 'opacity-50 pointer-events-none',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return stateClasses[state];
}

/**
 * 크기에 따른 클래스명 생성
 */
export function sizeClass(
  size: 'sm' | 'md' | 'lg',
  type: 'padding' | 'text' | 'button' = 'padding'
): string {
  const sizeClasses = {
    padding: {
      sm: 'px-2 py-1',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
    },
    text: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    button: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  };

  return sizeClasses[type][size];
}

/**
 * 변형에 따른 클래스명 생성
 */
export function variantClass(
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
): string {
  const variantClasses = {
    primary: 'bg-[#6ee7b7] text-black hover:bg-[#5ad1a0]',
    secondary: 'bg-[#3a404d] text-white hover:bg-[#4a505c]',
    outline: 'border border-[#3a404d] text-white hover:bg-[#3a404d]',
    ghost: 'text-white hover:bg-white/10',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return variantClasses[variant];
}