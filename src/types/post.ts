import { BaseEntity, User } from './common';

export interface Post extends BaseEntity {
  title: string;
  content: string;
  description: string;
  excerpt?: string;
  thumbnail?: string;
  tags: string[];
  authorId: string;
  author?: User;
  isPublished: boolean;
  publishedAt?: string;
  views: number;
  slug?: string;
  date?: string; // Legacy field for backward compatibility
}

export interface CreatePostRequest {
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  isPublished?: boolean;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

export interface PostsQuery {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  authorId?: string;
  isPublished?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface PostStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  averageViews: number;
}

// Legacy type for backward compatibility
export interface BlogPostProps extends Omit<Post, 'authorId' | 'isPublished' | 'views'> {
  date: string; // formatted date string
}