import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditorMetaInputs from '@/components/molecules/editor/EditorMetaInputs';

describe('EditorMetaInputs', () => {
  const mockOnTagsChange = jest.fn();
  const mockOnThumbnailChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    tags: '',
    thumbnail: '',
    onTagsChange: mockOnTagsChange,
    onThumbnailChange: mockOnThumbnailChange
  };

  test('컴포넌트가 정상적으로 렌더링되어야 함', () => {
    render(<EditorMetaInputs {...defaultProps} />);
    
    expect(screen.getByLabelText(/태그/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/썸네일 이미지 URL/i)).toBeInTheDocument();
  });

  test('초기값이 정상적으로 표시되어야 함', () => {
    render(
      <EditorMetaInputs 
        {...defaultProps} 
        tags="React, JavaScript, Web" 
        thumbnail="https://example.com/image.jpg"
      />
    );
    
    expect(screen.getByDisplayValue('React, JavaScript, Web')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com/image.jpg')).toBeInTheDocument();
  });

  test('태그 입력이 정상적으로 동작해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    await user.type(tagsInput, 'React, Next.js');
    
    expect(mockOnTagsChange).toHaveBeenCalledWith('React, Next.js');
  });

  test('썸네일 URL 입력이 정상적으로 동작해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const thumbnailInput = screen.getByLabelText(/썸네일 이미지 URL/i);
    await user.type(thumbnailInput, 'https://example.com/test.jpg');
    
    expect(mockOnThumbnailChange).toHaveBeenCalledWith('https://example.com/test.jpg');
  });

  test('태그 입력 필드에 올바른 placeholder가 표시되어야 함', () => {
    render(<EditorMetaInputs {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/예: React, JavaScript, Web/i)).toBeInTheDocument();
  });

  test('썸네일 입력 필드에 올바른 placeholder가 표시되어야 함', () => {
    render(<EditorMetaInputs {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/https:\/\/example\.com\/image\.jpg/i)).toBeInTheDocument();
  });

  test('disabled 상태에서 모든 입력이 비활성화되어야 함', () => {
    render(<EditorMetaInputs {...defaultProps} disabled={true} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    const thumbnailInput = screen.getByLabelText(/썸네일 이미지 URL/i);
    
    expect(tagsInput).toBeDisabled();
    expect(thumbnailInput).toBeDisabled();
  });

  test('썸네일 입력 필드가 URL 타입이어야 함', () => {
    render(<EditorMetaInputs {...defaultProps} />);
    
    const thumbnailInput = screen.getByLabelText(/썸네일 이미지 URL/i);
    expect(thumbnailInput).toHaveAttribute('type', 'url');
  });

  test('태그 입력 필드가 텍스트 타입이어야 함', () => {
    render(<EditorMetaInputs {...defaultProps} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    expect(tagsInput).toHaveAttribute('type', 'text');
  });

  test('여러 태그를 쉼표로 구분하여 입력할 수 있어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    const tagString = 'React, JavaScript, TypeScript, Next.js';
    
    await user.type(tagsInput, tagString);
    
    expect(mockOnTagsChange).toHaveBeenCalledWith(tagString);
  });

  test('태그 입력에서 공백 처리가 정상적이어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    await user.type(tagsInput, ' React , JavaScript , Web ');
    
    expect(mockOnTagsChange).toHaveBeenCalledWith(' React , JavaScript , Web ');
  });

  test('빈 값을 입력할 수 있어야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} tags="기존 태그" thumbnail="https://old.com/image.jpg" />);
    
    const tagsInput = screen.getByDisplayValue('기존 태그');
    const thumbnailInput = screen.getByDisplayValue('https://old.com/image.jpg');
    
    await user.clear(tagsInput);
    await user.clear(thumbnailInput);
    
    expect(mockOnTagsChange).toHaveBeenCalledWith('');
    expect(mockOnThumbnailChange).toHaveBeenCalledWith('');
  });

  test('유효하지 않은 URL도 입력할 수 있어야 함 (클라이언트 검증)', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const thumbnailInput = screen.getByLabelText(/썸네일 이미지 URL/i);
    await user.type(thumbnailInput, 'invalid-url');
    
    expect(mockOnThumbnailChange).toHaveBeenCalledWith('invalid-url');
  });

  test('한글 태그 입력이 가능해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    await user.type(tagsInput, '리액트, 자바스크립트, 웹개발');
    
    expect(mockOnTagsChange).toHaveBeenCalledWith('리액트, 자바스크립트, 웹개발');
  });

  test('긴 URL 입력이 가능해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const longUrl = 'https://very-long-domain-name-for-testing.com/very/long/path/to/image/file-with-very-long-name.jpg?param1=value1&param2=value2';
    const thumbnailInput = screen.getByLabelText(/썸네일 이미지 URL/i);
    
    await user.type(thumbnailInput, longUrl);
    
    expect(mockOnThumbnailChange).toHaveBeenCalledWith(longUrl);
  });

  test('반응형 그리드 클래스가 적용되어야 함', () => {
    const { container } = render(<EditorMetaInputs {...defaultProps} />);
    
    const gridContainer = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });

  test('포커스 상태가 정상적으로 동작해야 함', async () => {
    const user = userEvent.setup();
    render(<EditorMetaInputs {...defaultProps} />);
    
    const tagsInput = screen.getByLabelText(/태그/i);
    const thumbnailInput = screen.getByLabelText(/썸네일 이미지 URL/i);
    
    await user.click(tagsInput);
    expect(tagsInput).toHaveFocus();
    
    await user.tab();
    expect(thumbnailInput).toHaveFocus();
  });
});