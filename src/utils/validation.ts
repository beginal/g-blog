export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCommentForm(nickname: string, content: string): ValidationResult {
  const errors: string[] = [];

  // 닉네임 검증
  if (!nickname.trim()) {
    errors.push('닉네임을 입력해주세요.');
  } else if (nickname.trim().length < 2) {
    errors.push('닉네임은 최소 2글자 이상이어야 합니다.');
  } else if (nickname.trim().length > 20) {
    errors.push('닉네임은 최대 20글자까지 가능합니다.');
  }

  // 댓글 내용 검증
  if (!content.trim()) {
    errors.push('댓글 내용을 입력해주세요.');
  } else if (content.trim().length < 5) {
    errors.push('댓글은 최소 5글자 이상이어야 합니다.');
  } else if (content.trim().length > 1000) {
    errors.push('댓글은 최대 1000글자까지 가능합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeInput(input: string): string {
  return input.trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}