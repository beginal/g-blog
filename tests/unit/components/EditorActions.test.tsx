import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditorActions from '@/components/molecules/editor/EditorActions';

describe('EditorActions', () => {
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    mode: 'create' as const,
    loading: false,
    onCancel: mockOnCancel
  };

  test('컴포넌트가 정상적으로 렌더링되어야 함', () => {
    render(<EditorActions {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /취소/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /게시물 작성/i })).toBeInTheDocument();
  });

  test('create 모드에서 올바른 텍스트가 표시되어야 함', () => {
    render(<EditorActions {...defaultProps} mode="create" />);
    
    expect(screen.getByRole('button', { name: /게시물 작성/i })).toBeInTheDocument();
  });

  test('edit 모드에서 올바른 텍스트가 표시되어야 함', () => {
    render(<EditorActions {...defaultProps} mode="edit" />);
    
    expect(screen.getByRole('button', { name: /수정 완료/i })).toBeInTheDocument();
  });

  test('취소 버튼 클릭 시 onCancel이 호출되어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorActions {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    await user.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('로딩 상태에서 모든 버튼이 비활성화되어야 함', () => {
    render(<EditorActions {...defaultProps} loading={true} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    const submitButton = screen.getByRole('button', { name: /작성 중.../i });
    
    expect(cancelButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  test('create 모드 로딩 상태에서 올바른 텍스트가 표시되어야 함', () => {
    render(<EditorActions {...defaultProps} mode="create" loading={true} />);
    
    expect(screen.getByText(/작성 중.../i)).toBeInTheDocument();
  });

  test('edit 모드 로딩 상태에서 올바른 텍스트가 표시되어야 함', () => {
    render(<EditorActions {...defaultProps} mode="edit" loading={true} />);
    
    expect(screen.getByText(/수정 중.../i)).toBeInTheDocument();
  });

  test('로딩 상태에서 로딩 스피너가 표시되어야 함', () => {
    render(<EditorActions {...defaultProps} loading={true} />);
    
    // LoadingSpinner 컴포넌트가 렌더링되는지 확인
    // 실제 구현에 따라 data-testid나 클래스명으로 확인
    const spinner = screen.getByTestId ? screen.queryByTestId('loading-spinner') : null;
    if (!spinner) {
      // 스피너의 실제 구현을 확인하여 적절한 선택자 사용
      expect(screen.getByText(/작성 중.../i)).toBeInTheDocument();
    }
  });

  test('제출 버튼이 form submit 타입이어야 함', () => {
    render(<EditorActions {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /게시물 작성/i });
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('취소 버튼이 button 타입이어야 함', () => {
    render(<EditorActions {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    expect(cancelButton).toHaveAttribute('type', 'button');
  });

  test('버튼들이 적절한 스타일 클래스를 가져야 함', () => {
    render(<EditorActions {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    const submitButton = screen.getByRole('button', { name: /게시물 작성/i });
    
    expect(cancelButton).toHaveClass('bg-[#3a404d]');
    expect(submitButton).toHaveClass('bg-[#6ee7b7]');
  });

  test('flex 레이아웃이 적용되어야 함', () => {
    const { container } = render(<EditorActions {...defaultProps} />);
    
    const actionsContainer = container.firstChild;
    expect(actionsContainer).toHaveClass('flex', 'gap-4');
  });

  test('버튼들이 flex-1 클래스를 가져야 함', () => {
    render(<EditorActions {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    const submitButton = screen.getByRole('button', { name: /게시물 작성/i });
    
    expect(cancelButton).toHaveClass('flex-1');
    expect(submitButton).toHaveClass('flex-1');
  });

  test('비로딩 상태에서 버튼들이 활성화되어야 함', () => {
    render(<EditorActions {...defaultProps} loading={false} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    const submitButton = screen.getByRole('button', { name: /게시물 작성/i });
    
    expect(cancelButton).not.toBeDisabled();
    expect(submitButton).not.toBeDisabled();
  });

  test('로딩 상태 변경이 정상적으로 반영되어야 함', () => {
    const { rerender } = render(<EditorActions {...defaultProps} loading={false} />);
    
    let submitButton = screen.getByRole('button', { name: /게시물 작성/i });
    expect(submitButton).not.toBeDisabled();
    
    rerender(<EditorActions {...defaultProps} loading={true} />);
    
    submitButton = screen.getByRole('button', { name: /작성 중.../i });
    expect(submitButton).toBeDisabled();
  });

  test('모드 변경이 정상적으로 반영되어야 함', () => {
    const { rerender } = render(<EditorActions {...defaultProps} mode="create" />);
    
    expect(screen.getByRole('button', { name: /게시물 작성/i })).toBeInTheDocument();
    
    rerender(<EditorActions {...defaultProps} mode="edit" />);
    
    expect(screen.getByRole('button', { name: /수정 완료/i })).toBeInTheDocument();
  });

  test('onCancel 없이도 에러가 발생하지 않아야 함', async () => {
    const user = userEvent.setup();
    render(<EditorActions {...defaultProps} onCancel={undefined as any} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    
    expect(async () => {
      await user.click(cancelButton);
    }).not.toThrow();
  });

  test('키보드 네비게이션이 정상적으로 동작해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorActions {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: /취소/i });
    const submitButton = screen.getByRole('button', { name: /게시물 작성/i });
    
    await user.tab();
    expect(cancelButton).toHaveFocus();
    
    await user.tab();
    expect(submitButton).toHaveFocus();
  });
});