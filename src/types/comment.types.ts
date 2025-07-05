export interface Comment {
  id: string;
  post_id: string;
  nickname: string;
  content: string;
  created_at: string;
  ip_hash?: string; // 스팸 방지용 (선택사항)
}

export interface CommentFormData {
  nickname: string;
  content: string;
}

export interface CommentCreateRequest {
  post_id: string;
  nickname: string;
  content: string;
}

export interface CommentResponse {
  success: boolean;
  data?: Comment;
  error?: string;
}

export interface CommentsListResponse {
  success: boolean;
  data?: Comment[];
  error?: string;
}