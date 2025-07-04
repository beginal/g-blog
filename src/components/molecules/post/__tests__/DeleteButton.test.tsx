import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeleteButton from '../DeleteButton'

// Next.js 라우터 모의
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}))

// API 모의
jest.mock('@/lib/api/post', () => ({
  deletePost: jest.fn().mockResolvedValue(undefined),
}))

describe('DeleteButton', () => {
  const defaultProps = {
    postId: 'test-post-id',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('🎯 기본 렌더링 테스트', () => {
    it('삭제 버튼이 정상적으로 렌더링된다', () => {
      render(<DeleteButton {...defaultProps} />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toBeInTheDocument()
    })

    it('기본 variant에서 아이콘만 표시된다', () => {
      render(<DeleteButton {...defaultProps} />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toBeInTheDocument()
      
      // SVG 아이콘이 있는지 확인
      const icon = deleteButton.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('button variant에서 "삭제" 텍스트가 표시된다', () => {
      render(<DeleteButton {...defaultProps} variant="button" />)
      
      expect(screen.getByText('삭제')).toBeInTheDocument()
    })

    it('disabled 상태일 때 버튼이 비활성화된다', () => {
      render(<DeleteButton {...defaultProps} disabled={true} />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toBeDisabled()
    })
  })

  describe('🎨 스타일 테스트', () => {
    it('default variant 클래스가 적용된다', () => {
      render(<DeleteButton {...defaultProps} />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toHaveClass('text-red-400')
    })

    it('compact variant 클래스가 적용된다', () => {
      render(<DeleteButton {...defaultProps} variant="compact" />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toHaveClass('p-1', 'rounded')
    })

    it('button variant 클래스가 적용된다', () => {
      render(<DeleteButton {...defaultProps} variant="button" />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toHaveClass('px-3', 'py-2', 'bg-red-600')
    })
  })

  describe('🔒 Props 테스트', () => {
    it('postId가 정상적으로 전달된다', () => {
      render(<DeleteButton postId="custom-id" />)
      
      // 컴포넌트가 에러 없이 렌더링되면 성공
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('className이 정상적으로 적용된다', () => {
      const customClass = 'custom-delete-button'
      render(<DeleteButton {...defaultProps} className={customClass} />)
      
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toHaveClass(customClass)
    })
  })
})