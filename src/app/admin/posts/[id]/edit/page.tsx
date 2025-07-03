"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ContentBlock, BlogPostProps } from '@/types';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState<ContentBlock[]>([{ type: 'paragraph', text: '' }]);
  const [questQuestion, setQuestQuestion] = useState('');
  const [questOptions, setQuestOptions] = useState<string[]>(['', '', '', '']);
  const [questAnswerIndex, setQuestAnswerIndex] = useState<number | ''>('');
  const [questXp, setQuestXp] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const post: BlogPostProps = await res.json();
        setTitle(post.title);
        setDate(post.date);
        setTags(post.tags.join(', '));
        setContent(post.content);
        if (post.quest) {
          setQuestQuestion(post.quest.question);
          setQuestOptions(post.quest.options);
          setQuestAnswerIndex(post.quest.answerIndex);
          setQuestXp(post.quest.xp);
        }
      } else {
        alert('게시물을 불러오는데 실패했습니다.');
        router.push('/admin/posts');
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, router]);

  const handleContentChange = (index: number, field: string, value: string) => {
    const newContent = [...content];
    // @ts-ignore
    newContent[index][field] = value;
    setContent(newContent);
  };

  const addContentBlock = (type: ContentBlock['type']) => {
    if (type === 'paragraph') {
      setContent([...content, { type: 'paragraph', text: '' }]);
    } else if (type === 'dialogue') {
      setContent([...content, { type: 'dialogue', character: '', avatar: '', text: '' }]);
    }
  };

  const removeContentBlock = (index: number) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const handleQuestOptionChange = (index: number, value: string) => {
    const newOptions = [...questOptions];
    newOptions[index] = value;
    setQuestOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost = {
      title,
      date,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      content,
      quest: questQuestion && questOptions.every(opt => opt.length > 0) && questAnswerIndex !== '' && questXp !== ''
        ? {
            question: questQuestion,
            options: questOptions,
            answerIndex: Number(questAnswerIndex),
            xp: Number(questXp),
          }
        : undefined,
    };

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      router.push('/admin/posts');
    } else {
      alert('게시물 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="text-white text-center text-xl">로딩 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-[#2c313a] p-8 sm:p-12 rounded-2xl shadow-lg border border-[#3a404d] text-white animate-fade-in">
      <Link href="/admin/posts" className="flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors">
        <ArrowLeft size={20} />
        관리 페이지로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-8">게시물 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-lg font-medium mb-2">날짜</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
            required
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-lg font-medium mb-2">태그 (쉼표로 구분)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
            placeholder="예: React, TypeScript, Next.js"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">콘텐츠</h2>
        {content.map((block, index) => (
          <div key={index} className="bg-[#3a404d] p-4 rounded-lg border border-[#4a505c] relative">
            <button
              type="button"
              onClick={() => removeContentBlock(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-300"
            >
              삭제
            </button>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">블록 타입</label>
              <select
                value={block.type}
                onChange={(e) => handleContentChange(index, 'type', e.target.value)}
                className="w-full p-2 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
              >
                <option value="paragraph">단락</option>
                <option value="dialogue">대화</option>
              </select>
            </div>
            {block.type === 'paragraph' && (
              <div>
                <label htmlFor={`content-paragraph-${index}`} className="block text-sm font-medium mb-2">내용</label>
                <textarea
                  id={`content-paragraph-${index}`}
                  value={block.text}
                  onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] h-32"
                  required
                />
              </div>
            )}
            {block.type === 'dialogue' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor={`content-character-${index}`} className="block text-sm font-medium mb-2">캐릭터</label>
                  <input
                    type="text"
                    id={`content-character-${index}`}
                    value={block.character}
                    onChange={(e) => handleContentChange(index, 'character', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`content-avatar-${index}`} className="block text-sm font-medium mb-2">아바타 URL</label>
                  <input
                    type="text"
                    id={`content-avatar-${index}`}
                    value={block.avatar}
                    onChange={(e) => handleContentChange(index, 'avatar', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`content-dialogue-text-${index}`} className="block text-sm font-medium mb-2">대화 내용</label>
                  <textarea
                    id={`content-dialogue-text-${index}`}
                    value={block.text}
                    onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] h-32"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="flex space-x-4 mt-4">
          <button type="button" onClick={() => addContentBlock('paragraph')} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            단락 추가
          </button>
          <button type="button" onClick={() => addContentBlock('dialogue')} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            대화 추가
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">퀘스트 (선택 사항)</h2>
        <div className="bg-[#3a404d] p-6 rounded-lg border border-[#4a505c] space-y-4">
          <div>
            <label htmlFor="questQuestion" className="block text-lg font-medium mb-2">질문</label>
            <input
              type="text"
              id="questQuestion"
              value={questQuestion}
              onChange={(e) => setQuestQuestion(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">옵션 (4개)</label>
            {questOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleQuestOptionChange(index, e.target.value)}
                className="w-full p-3 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] mb-2"
                placeholder={`옵션 ${index + 1}`}
              />
            ))}
          </div>
          <div>
            <label htmlFor="questAnswerIndex" className="block text-lg font-medium mb-2">정답 인덱스 (0-3)</label>
            <input
              type="number"
              id="questAnswerIndex"
              value={questAnswerIndex}
              onChange={(e) => setQuestAnswerIndex(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
              min="0"
              max="3"
            />
          </div>
          <div>
            <label htmlFor="questXp" className="block text-lg font-medium mb-2">XP</label>
            <input
              type="number"
              id="questXp"
              value={questXp}
              onChange={(e) => setQuestXp(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-[#4a505c] border border-[#5a606c] focus:outline-none focus:ring-2 focus:ring-[#6ee7b7]"
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#6ee7b7] text-black py-3 rounded-lg font-bold text-lg hover:bg-opacity-80 transition-colors"
        >
          게시물 수정
        </button>
      </form>
    </div>
  );
}
