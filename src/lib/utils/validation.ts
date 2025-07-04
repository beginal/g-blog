// 유효성 검증 유틸리티 함수들

/**
 * 이메일 주소 유효성 검사
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * URL 유효성 검사
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 문자열이 비어있는지 확인 (null, undefined, 빈 문자열, 공백만 있는 문자열)
 */
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

/**
 * 문자열 길이 검증
 */
export function isValidLength(
  value: string,
  minLength: number,
  maxLength?: number
): boolean {
  if (isEmpty(value)) return false;
  
  const length = value.trim().length;
  
  if (length < minLength) return false;
  if (maxLength && length > maxLength) return false;
  
  return true;
}

/**
 * 비밀번호 강도 검사
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('대문자를 포함해야 합니다.');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('소문자를 포함해야 합니다.');
  }
  
  if (!/\d/.test(password)) {
    errors.push('숫자를 포함해야 합니다.');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('특수문자를 포함해야 합니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 한국 전화번호 유효성 검사
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * 파일 타입 검증
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * 파일 크기 검증
 */
export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}

/**
 * 태그 유효성 검사
 */
export function validateTags(tags: string[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (tags.length === 0) {
    errors.push('최소 1개의 태그가 필요합니다.');
  }
  
  if (tags.length > 10) {
    errors.push('태그는 최대 10개까지 허용됩니다.');
  }
  
  const invalidTags = tags.filter(tag => tag.length > 50);
  if (invalidTags.length > 0) {
    errors.push('태그는 50자를 초과할 수 없습니다.');
  }
  
  const duplicateTags = tags.filter((tag, index) => tags.indexOf(tag) !== index);
  if (duplicateTags.length > 0) {
    errors.push('중복된 태그가 있습니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 슬러그 유효성 검사 (URL에 사용 가능한 문자열)
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * 포스트 제목 유효성 검사
 */
export function validatePostTitle(title: string): {
  isValid: boolean;
  error?: string;
} {
  if (isEmpty(title)) {
    return { isValid: false, error: '제목은 필수입니다.' };
  }
  
  if (!isValidLength(title, 1, 200)) {
    return { isValid: false, error: '제목은 1자 이상 200자 이하여야 합니다.' };
  }
  
  return { isValid: true };
}

/**
 * 포스트 내용 유효성 검사
 */
export function validatePostContent(content: string): {
  isValid: boolean;
  error?: string;
} {
  if (isEmpty(content)) {
    return { isValid: false, error: '내용은 필수입니다.' };
  }
  
  if (!isValidLength(content, 10)) {
    return { isValid: false, error: '내용은 최소 10자 이상이어야 합니다.' };
  }
  
  return { isValid: true };
}