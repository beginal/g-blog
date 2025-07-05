import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';
import { fetchPosts } from '@/data/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // 블로그 포스트들
  let postPages: MetadataRoute.Sitemap = [];
  
  try {
    const posts = await fetchPosts();
    postPages = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.id}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

  return [...staticPages, ...postPages];
}