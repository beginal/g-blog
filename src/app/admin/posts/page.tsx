import Link from 'next/link';
import { fetchPosts } from '@/data/posts';
import { Trash2, Edit } from 'lucide-react';

export default async function AdminPostsPage() {
  const posts = await fetchPosts();

  const handleDelete = async (id: string) => {
    if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      // 페이지를 새로고침하여 변경 사항 반영
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#2c313a] p-8 sm:p-12 rounded-2xl shadow-lg border border-[#3a404d] text-white animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">게시물 관리</h1>
      <Link href="/admin/posts/new" className="bg-[#6ee7b7] text-black py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors mb-8 inline-block">
        새 게시물 작성
      </Link>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#3a404d] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#4a505c] text-left">
              <th className="py-3 px-4">제목</th>
              <th className="py-3 px-4">날짜</th>
              <th className="py-3 px-4">액션</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-[#2c313a] last:border-b-0 hover:bg-[#4a505c]">
                <td className="py-3 px-4">{post.title}</td>
                <td className="py-3 px-4">{post.date}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-400 hover:text-blue-300">
                    <Edit size={20} />
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
