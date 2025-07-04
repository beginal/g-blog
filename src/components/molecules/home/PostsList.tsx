import type { BlogPostProps } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PostItem from "./PostItem";
import EmptyPosts from "./EmptyPosts";

interface PostsListProps {
  posts: BlogPostProps[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function PostsList({ posts, loading, error, onRetry }: PostsListProps) {
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" color="primary" />
        </div>
      ) : error ? (
        <ErrorMessage
          title="포스트 로딩 실패"
          message={error}
          onRetry={onRetry}
          className="bg-red-500/10 border-red-500/30"
        />
      ) : posts.length > 0 ? (
        posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))
      ) : (
        <EmptyPosts />
      )}
    </div>
  );
}