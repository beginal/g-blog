const fs = require('fs');

// ai_blog_post.md 파일 읽기
const content = fs.readFileSync('ai_blog_post.md', 'utf8');

const blogPostData = {
  title: "AI로 나만의 블로그 만들기: Next.js와 Claude Code를 활용한 실전 개발 가이드",
  content: content,
  tags: ["AI개발", "NextJS", "TypeScript", "React", "ClaudeCode", "블로그개발", "웹개발", "프론트엔드", "풀스택개발", "개발생산성"],
  thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&auto=format&q=80"
};

// API 호출
async function createPost() {
  try {
    const response = await fetch('http://localhost:3003/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogPostData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Blog post created successfully!');
    console.log('Full response:', JSON.stringify(result, null, 2));
    
    // API 응답 구조에 따라 데이터 추출
    const postData = result.data || result;
    console.log('Post ID:', postData.id);
    console.log('Title:', postData.title);
    console.log('Created at:', postData.created_at);
    console.log('View at: http://localhost:3003/posts/' + postData.id);
    
    return result;
  } catch (error) {
    console.error('❌ Error creating blog post:', error.message);
    throw error;
  }
}

// 실행
createPost().catch(console.error);