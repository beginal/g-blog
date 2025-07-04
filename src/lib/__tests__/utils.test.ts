import { cn } from '@/lib/utils'

describe('유틸리티 함수 테스트', () => {
  describe('cn (클래스 네임 병합)', () => {
    it('여러 클래스명을 올바르게 병합한다', () => {
      const result = cn('bg-red-500', 'text-white', 'p-4')
      expect(result).toBe('bg-red-500 text-white p-4')
    })

    it('중복된 클래스를 제거한다', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })

    it('falsy 값을 필터링한다', () => {
      const result = cn('bg-red-500', null, undefined, false, 'text-white')
      expect(result).toBe('bg-red-500 text-white')
    })

    it('조건부 클래스를 처리한다', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })
  })
})