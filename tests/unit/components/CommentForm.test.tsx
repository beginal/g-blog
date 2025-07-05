import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CommentForm from '@/components/molecules/comment/CommentForm';

// 모킹
const mockOnSubmit = jest.fn();

describe('CommentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    onSubmit: mockOnSubmit,
    loading: false
  };

  test('폼이 정상적으로 렌더링되어야 함', () => {
    render(<CommentForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/닉네임/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/댓글 내용/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /댓글 작성/i })).toBeInTheDocument();
  });

  test('사용자 입력이 정상적으로 처리되어야 함', async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);
    
    const nicknameInput = screen.getByLabelText(/닉네임/i);
    const contentTextarea = screen.getByLabelText(/댓글 내용/i);
    
    await user.type(nicknameInput, '테스트유저');
    await user.type(contentTextarea, '테스트 댓글 내용입니다.');
    
    expect(nicknameInput).toHaveValue('테스트유저');
    expect(contentTextarea).toHaveValue('테스트 댓글 내용입니다.');
  });

  test('유효한 데이터로 폼 제출이 가능해야 함', async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);
    
    const nicknameInput = screen.getByLabelText(/닉네임/i);
    const contentTextarea = screen.getByLabelText(/댓글 내용/i);
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });
    
    await user.type(nicknameInput, '테스트유저');
    await user.type(contentTextarea, '테스트 댓글 내용입니다.');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        nickname: '테스트유저',
        content: '테스트 댓글 내용입니다.'
      });
    });
  });

  test('빈 닉네임으로 제출 시 에러가 표시되어야 함', async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);
    
    const contentTextarea = screen.getByLabelText(/댓글 내용/i);
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });
    
    await user.type(contentTextarea, '댓글 내용만 입력');
    await user.click(submitButton);
    
    expect(screen.getByText(/닉네임을 입력해주세요/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('빈 내용으로 제출 시 에러가 표시되어야 함', async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);
    
    const nicknameInput = screen.getByLabelText(/닉네임/i);
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });
    
    await user.type(nicknameInput, '테스트유저');
    await user.click(submitButton);
    
    expect(screen.getByText(/댓글 내용을 입력해주세요/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('로딩 상태에서 버튼이 비활성화되어야 함', () => {
    render(<CommentForm {...defaultProps} loading={true} />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/작성 중.../i)).toBeInTheDocument();
  });

  test('성공 후 폼이 초기화되어야 함', async () => {
    const user = userEvent.setup();
    
    // onSubmit이 성공적으로 완료되었다고 가정
    mockOnSubmit.mockResolvedValue(undefined);
    
    render(<CommentForm {...defaultProps} />);
    
    const nicknameInput = screen.getByLabelText(/닉네임/i);
    const contentTextarea = screen.getByLabelText(/댓글 내용/i);
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });
    
    await user.type(nicknameInput, '테스트유저');
    await user.type(contentTextarea, '테스트 댓글');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(nicknameInput).toHaveValue('');
      expect(contentTextarea).toHaveValue('');
    });
  });

  test('최대 글자 수 제한이 적용되어야 함', async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);
    
    const contentTextarea = screen.getByLabelText(/댓글 내용/i);
    const longText = 'a'.repeat(1001); // 1000자 초과
    
    await user.type(contentTextarea, longText);
    
    const submitButton = screen.getByRole('button', { name: /댓글 작성/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/댓글은 1000자를 초과할 수 없습니다/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});