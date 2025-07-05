import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditorTitleInput from '@/components/molecules/editor/EditorTitleInput';

describe('EditorTitleInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    mode: 'create' as const,
    value: '',
    onChange: mockOnChange
  };

  test('컴포넌트가 정상적으로 렌더링되어야 함', () => {
    render(<EditorTitleInput {...defaultProps} />);
    
    expect(screen.getByLabelText(/제목/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/게시물 제목을 입력하세요/i)).toBeInTheDocument();
  });

  test('create 모드에서 올바른 placeholder가 표시되어야 함', () => {
    render(<EditorTitleInput {...defaultProps} mode="create" />);
    
    expect(screen.getByPlaceholderText(/게시물 제목을 입력하세요/i)).toBeInTheDocument();
  });

  test('edit 모드에서 올바른 placeholder가 표시되어야 함', () => {
    render(<EditorTitleInput {...defaultProps} mode="edit" />);
    
    expect(screen.getByPlaceholderText(/수정할 제목을 입력하세요/i)).toBeInTheDocument();
  });

  test('입력값이 정상적으로 표시되어야 함', () => {
    render(<EditorTitleInput {...defaultProps} value="테스트 제목" />);
    
    const input = screen.getByDisplayValue('테스트 제목');
    expect(input).toBeInTheDocument();
  });

  test('사용자 입력 시 onChange가 호출되어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorTitleInput {...defaultProps} />);
    
    const input = screen.getByLabelText(/제목/i);
    await user.type(input, '새로운 제목');
    
    expect(mockOnChange).toHaveBeenCalledTimes(6); // '새로운 제목' 각 글자마다
    expect(mockOnChange).toHaveBeenLastCalledWith('새로운 제목');
  });

  test('disabled 상태에서 입력이 비활성화되어야 함', () => {
    render(<EditorTitleInput {...defaultProps} disabled={true} />);
    
    const input = screen.getByLabelText(/제목/i);
    expect(input).toBeDisabled();
  });

  test('required 속성이 설정되어야 함', () => {
    render(<EditorTitleInput {...defaultProps} />);
    
    const input = screen.getByLabelText(/제목/i);
    expect(input).toBeRequired();
  });

  test('빈 값에서 시작하여 텍스트 입력이 가능해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorTitleInput {...defaultProps} value="" />);
    
    const input = screen.getByLabelText(/제목/i);
    await user.clear(input);
    await user.type(input, 'React 테스트 가이드');
    
    expect(mockOnChange).toHaveBeenCalledWith('React 테스트 가이드');
  });

  test('기존 값을 수정할 수 있어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorTitleInput {...defaultProps} value="기존 제목" />);
    
    const input = screen.getByDisplayValue('기존 제목');
    await user.clear(input);
    await user.type(input, '수정된 제목');
    
    expect(mockOnChange).toHaveBeenCalledWith('수정된 제목');
  });

  test('포커스 상태 변경이 가능해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorTitleInput {...defaultProps} />);
    
    const input = screen.getByLabelText(/제목/i);
    
    await user.click(input);
    expect(input).toHaveFocus();
    
    await user.tab();
    expect(input).not.toHaveFocus();
  });

  test('특수문자와 한글 입력이 정상 처리되어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorTitleInput {...defaultProps} />);
    
    const input = screen.getByLabelText(/제목/i);
    const specialText = '한글 제목! @#$% 123';
    
    await user.type(input, specialText);
    
    expect(mockOnChange).toHaveBeenCalledWith(specialText);
  });

  test('긴 제목 입력이 가능해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorTitleInput {...defaultProps} />);
    
    const input = screen.getByLabelText(/제목/i);
    const longTitle = 'a'.repeat(200);
    
    await user.type(input, longTitle);
    
    expect(mockOnChange).toHaveBeenCalledWith(longTitle);
  });

  test('onChange 없이도 에러가 발생하지 않아야 함', () => {
    const { rerender } = render(<EditorTitleInput {...defaultProps} onChange={undefined as any} />);
    
    expect(() => {
      const input = screen.getByLabelText(/제목/i);
      fireEvent.change(input, { target: { value: 'test' } });
    }).not.toThrow();
  });
});