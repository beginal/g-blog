// 포스트 관련 API 함수들

import { apiClient, apiWithRetry } from './client';
import type { 
  Post, 
  CreatePostRequest, 
  UpdatePostRequest, 
  PostsQuery, 
  PostStats,
  PaginatedResponse,
  ApiResponse 
} from '@/types';

/**
 * 포스트 목록 조회
 */
export async function getPosts(query: PostsQuery = {}): Promise<PaginatedResponse<Post>> {
  const response = await apiWithRetry(() => 
    apiClient.get<Post[]>('/posts', query)
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error,
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }

  // 임시로 클라이언트 사이드 페이지네이션 처리
  const data = response.data || [];
  const page = query.page || 1;
  const limit = query.limit || 8;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    success: true,
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * 포스트 상세 조회
 */
export async function getPost(id: string): Promise<ApiResponse<Post>> {
  return apiWithRetry(() => apiClient.get<Post>(`/posts/${id}`));
}

/**
 * 포스트 생성
 */
export async function createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
  return apiWithRetry(() => apiClient.post<Post>('/posts', data));
}

/**
 * 포스트 수정
 */
export async function updatePost(data: UpdatePostRequest): Promise<ApiResponse<Post>> {
  const { id, ...updateData } = data;
  return apiWithRetry(() => apiClient.put<Post>(`/posts/${id}`, updateData));
}

/**
 * 포스트 삭제
 */
export async function deletePost(id: string): Promise<ApiResponse<void>> {
  return apiWithRetry(() => apiClient.delete<void>(`/posts/${id}`));
}

/**
 * 포스트 검색
 */
export async function searchPosts(
  searchTerm: string,
  options: Omit<PostsQuery, 'search'> = {}
): Promise<PaginatedResponse<Post>> {
  return getPosts({ ...options, search: searchTerm });
}

/**
 * 태그별 포스트 조회
 */
export async function getPostsByTag(
  tag: string,
  options: Omit<PostsQuery, 'tags'> = {}
): Promise<PaginatedResponse<Post>> {
  return getPosts({ ...options, tags: [tag] });
}

/**
 * 작성자별 포스트 조회
 */
export async function getPostsByAuthor(
  authorId: string,
  options: Omit<PostsQuery, 'authorId'> = {}
): Promise<PaginatedResponse<Post>> {
  return getPosts({ ...options, authorId });
}

/**
 * 포스트 통계 조회
 */
export async function getPostStats(): Promise<ApiResponse<PostStats>> {
  return apiWithRetry(() => apiClient.get<PostStats>('/posts/stats'));
}

/**
 * 포스트 조회수 증가
 */
export async function incrementPostViews(id: string): Promise<ApiResponse<void>> {
  return apiClient.post<void>(`/posts/${id}/views`);
}

/**
 * 관련 포스트 조회
 */
export async function getRelatedPosts(
  id: string,
  limit: number = 5
): Promise<ApiResponse<Post[]>> {
  return apiWithRetry(() => 
    apiClient.get<Post[]>(`/posts/${id}/related`, { limit })
  );
}

/**
 * 인기 포스트 조회
 */
export async function getPopularPosts(limit: number = 10): Promise<ApiResponse<Post[]>> {
  return apiWithRetry(() => 
    apiClient.get<Post[]>('/posts/popular', { limit })
  );
}

/**
 * 최신 포스트 조회
 */
export async function getLatestPosts(limit: number = 10): Promise<ApiResponse<Post[]>> {
  return apiWithRetry(() => 
    apiClient.get<Post[]>('/posts/latest', { limit })
  );
}