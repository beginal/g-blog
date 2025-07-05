import { validateComment, sanitizeComment } from '@/utils/validation';

describe('Comment Validation', () => {
  describe('validateComment', () => {
    test('유효한 댓글 데이터는 통과해야 함', () => {
      const validComment = {
        nickname: '테스트유저',
        content: '유효한 댓글 내용입니다.'
      };
      
      const result = validateComment(validComment);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    test('빈 닉네임은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: '',
        content: '댓글 내용'
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.nickname).toBe('닉네임을 입력해주세요.');
    });

    test('빈 내용은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: '테스트유저',
        content: ''
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.content).toBe('댓글 내용을 입력해주세요.');
    });

    test('공백만 있는 닉네임은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: '   ',
        content: '댓글 내용'
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.nickname).toBe('닉네임을 입력해주세요.');
    });

    test('공백만 있는 내용은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: '테스트유저',
        content: '   \n\t   '
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.content).toBe('댓글 내용을 입력해주세요.');
    });

    test('너무 긴 닉네임은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: 'a'.repeat(51), // 50자 초과
        content: '댓글 내용'
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.nickname).toBe('닉네임은 50자를 초과할 수 없습니다.');
    });

    test('너무 긴 내용은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: '테스트유저',
        content: 'a'.repeat(1001) // 1000자 초과
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.content).toBe('댓글은 1000자를 초과할 수 없습니다.');
    });

    test('특수문자가 포함된 닉네임은 에러를 반환해야 함', () => {
      const invalidComment = {
        nickname: 'test<script>',
        content: '댓글 내용'
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.nickname).toBe('닉네임에 특수문자는 사용할 수 없습니다.');
    });

    test('여러 에러가 동시에 발생할 수 있어야 함', () => {
      const invalidComment = {
        nickname: '',
        content: ''
      };
      
      const result = validateComment(invalidComment);
      expect(result.isValid).toBe(false);
      expect(result.errors.nickname).toBeTruthy();
      expect(result.errors.content).toBeTruthy();
    });

    test('경계값 테스트 - 정확히 최대 길이', () => {
      const validComment = {
        nickname: 'a'.repeat(50), // 정확히 50자
        content: 'a'.repeat(1000) // 정확히 1000자
      };
      
      const result = validateComment(validComment);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe('sanitizeComment', () => {
    test('HTML 태그가 제거되어야 함', () => {
      const unsafeComment = {
        nickname: 'test<script>alert("xss")</script>',
        content: '댓글 <b>내용</b>입니다. <script>console.log("hack")</script>'
      };
      
      const sanitized = sanitizeComment(unsafeComment);
      expect(sanitized.nickname).toBe('testalert("xss")');
      expect(sanitized.content).toBe('댓글 내용입니다. console.log("hack")');
    });

    test('앞뒤 공백이 제거되어야 함', () => {
      const comment = {
        nickname: '  테스트유저  ',
        content: '  댓글 내용입니다.  \n\t'
      };
      
      const sanitized = sanitizeComment(comment);
      expect(sanitized.nickname).toBe('테스트유저');
      expect(sanitized.content).toBe('댓글 내용입니다.');
    });

    test('개행 문자가 정규화되어야 함', () => {
      const comment = {
        nickname: '테스트유저',
        content: '첫 번째 줄\r\n두 번째 줄\r세 번째 줄\n네 번째 줄'
      };
      
      const sanitized = sanitizeComment(comment);
      expect(sanitized.content).toBe('첫 번째 줄\n두 번째 줄\n세 번째 줄\n네 번째 줄');
    });

    test('연속된 공백이 단일 공백으로 변환되어야 함', () => {
      const comment = {
        nickname: '테스트    유저',
        content: '댓글      내용    입니다.'
      };
      
      const sanitized = sanitizeComment(comment);
      expect(sanitized.nickname).toBe('테스트 유저');
      expect(sanitized.content).toBe('댓글 내용 입니다.');
    });

    test('이모지는 유지되어야 함', () => {
      const comment = {
        nickname: '테스트유저😀',
        content: '좋은 글이네요! 👍✨'
      };
      
      const sanitized = sanitizeComment(comment);
      expect(sanitized.nickname).toBe('테스트유저😀');
      expect(sanitized.content).toBe('좋은 글이네요! 👍✨');
    });

    test('빈 객체는 그대로 반환되어야 함', () => {
      const comment = {
        nickname: '',
        content: ''
      };
      
      const sanitized = sanitizeComment(comment);
      expect(sanitized).toEqual(comment);
    });
  });
});