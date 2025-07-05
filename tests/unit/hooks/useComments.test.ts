import { renderHook, act, waitFor } from '@testing-library/react';
import { useComments } from '@/hooks/useComments';

// API 모킹
jest.mock('@/lib/api/post', () => ({
  fetchPost: jest.fn(),
}));

// 댓글 API 모킹 (실제 파일 경로에 맞게 수정)
const mockFetchComments = jest.fn();
const mockCreateComment = jest.fn();

jest.mock('@/lib/api/comment', () => ({
  fetchComments: mockFetchComments,
  createComment: mockCreateComment,
}));

describe('useComments Hook', () => {
  const mockPostId = 'test-post-id';
  const mockComments = [
    {
      id: '1',
      post_id: mockPostId,
      nickname: '테스트유저1',
      content: '첫 번째 댓글',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2', 
      post_id: mockPostId,
      nickname: '테스트유저2',
      content: '두 번째 댓글',
      created_at: '2024-01-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 상태가 올바르게 설정되어야 함', () => {
    mockFetchComments.mockResolvedValue([]);
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    expect(result.current.comments).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.commentCount).toBe(0);
  });

  test('댓글 목록이 성공적으로 로드되어야 함', async () => {
    mockFetchComments.mockResolvedValue(mockComments);
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.comments).toEqual(mockComments);
    expect(result.current.commentCount).toBe(2);
    expect(result.current.error).toBe(null);
  });

  test('댓글 로딩 실패 시 에러가 설정되어야 함', async () => {
    const errorMessage = '댓글을 불러오는데 실패했습니다';
    mockFetchComments.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.comments).toEqual([]);
  });

  test('새 댓글 추가가 성공해야 함', async () => {
    const newComment = {
      id: '3',
      post_id: mockPostId,
      nickname: '새유저',
      content: '새로운 댓글',
      created_at: '2024-01-03T00:00:00Z'
    };
    
    mockFetchComments.mockResolvedValue(mockComments);
    mockCreateComment.mockResolvedValue(newComment);
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    // 초기 로딩 완료 대기
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // 새 댓글 추가
    await act(async () => {
      await result.current.addComment({
        nickname: '새유저',
        content: '새로운 댓글'
      });
    });
    
    expect(result.current.comments).toHaveLength(3);
    expect(result.current.comments[0]).toEqual(newComment); // 최신 댓글이 맨 앞에
    expect(result.current.commentCount).toBe(3);
  });

  test('댓글 추가 실패 시 에러가 설정되어야 함', async () => {
    const errorMessage = '댓글 작성에 실패했습니다';
    
    mockFetchComments.mockResolvedValue(mockComments);
    mockCreateComment.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      await result.current.addComment({
        nickname: '테스트',
        content: '테스트 댓글'
      });
    });
    
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.comments).toHaveLength(2); // 원래 댓글 수 유지
  });

  test('댓글 새로고침이 동작해야 함', async () => {
    const updatedComments = [...mockComments, {
      id: '3',
      post_id: mockPostId,
      nickname: '새유저',
      content: '새로운 댓글',
      created_at: '2024-01-03T00:00:00Z'
    }];
    
    mockFetchComments
      .mockResolvedValueOnce(mockComments)
      .mockResolvedValueOnce(updatedComments);
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.comments).toHaveLength(2);
    
    // 새로고침 실행
    await act(async () => {
      await result.current.refreshComments();
    });
    
    expect(result.current.comments).toHaveLength(3);
    expect(mockFetchComments).toHaveBeenCalledTimes(2);
  });

  test('로딩 상태가 올바르게 관리되어야 함', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    mockFetchComments.mockReturnValue(promise);
    
    const { result } = renderHook(() => useComments(mockPostId));
    
    expect(result.current.loading).toBe(true);
    
    act(() => {
      resolvePromise!(mockComments);
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});