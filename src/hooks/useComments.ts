import { useState, useEffect, useCallback } from 'react';
import { Comment, CommentFormData } from '@/types/comment.types';

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  addComment: (formData: CommentFormData) => Promise<boolean>;
  refreshComments: () => Promise<void>;
}

export function useComments(postId: string): UseCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 댓글 목록 조회
  const fetchComments = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`/api/comments/${postId}`);
      const result = await response.json();

      if (result.success) {
        setComments(result.data || []);
      } else {
        setError(result.error || '댓글을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('Fetch comments error:', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  // 댓글 작성
  const addComment = useCallback(async (formData: CommentFormData): Promise<boolean> => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
          nickname: formData.nickname,
          content: formData.content,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        // 낙관적 업데이트: 새 댓글을 즉시 목록에 추가
        setComments(prev => [...prev, result.data]);
        return true;
      } else {
        setError(result.error || '댓글 작성에 실패했습니다.');
        return false;
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('Add comment error:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [postId]);

  // 댓글 목록 새로고침
  const refreshComments = useCallback(async () => {
    setLoading(true);
    await fetchComments();
  }, [fetchComments]);

  // 초기 로딩
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId, fetchComments]);

  return {
    comments,
    loading,
    error,
    submitting,
    addComment,
    refreshComments,
  };
}