"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CommentFormData } from "@/types/comment.types";
import { validateCommentForm } from "@/utils/validation";

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => Promise<boolean>;
  submitting: boolean;
}

export default function CommentForm({ onSubmit, submitting }: CommentFormProps) {
  const [formData, setFormData] = useState<CommentFormData>({
    nickname: '',
    content: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 클라이언트 사이드 검증
    const validation = validateCommentForm(formData.nickname, formData.content);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);

    const success = await onSubmit(formData);
    if (success) {
      // 폼 초기화
      setFormData({ nickname: '', content: '' });
    }
  };

  const handleChange = (field: keyof CommentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 입력 시 에러 초기화
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
      <div className="space-y-4">
        {/* 에러 메시지 */}
        {errors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {errors.map((error, index) => (
              <p key={index} className="text-red-400 text-sm">{error}</p>
            ))}
          </div>
        )}

        {/* 닉네임 입력 */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-2">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
            placeholder="닉네임을 입력하세요 (2-20글자)"
            className="w-full px-4 py-3 bg-[#1a1f26] border border-[#3a404d] rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-[#6ee7b7] focus:border-transparent transition-colors"
            maxLength={20}
            disabled={submitting}
          />
        </div>

        {/* 댓글 내용 입력 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            댓글
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="댓글을 입력하세요 (5-1000글자)"
            rows={4}
            className="w-full px-4 py-3 bg-[#1a1f26] border border-[#3a404d] rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-[#6ee7b7] focus:border-transparent transition-colors resize-none"
            maxLength={1000}
            disabled={submitting}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {formData.content.length}/1000
            </span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={submitting || !formData.nickname.trim() || !formData.content.trim()}
          className="w-full flex items-center justify-center gap-2 bg-[#6ee7b7] text-black 
                   font-medium py-3 px-4 rounded-lg hover:bg-[#5dd4a8] transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#6ee7b7]"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
              댓글 작성 중...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              댓글 작성
            </>
          )}
        </button>
      </div>
    </form>
  );
}