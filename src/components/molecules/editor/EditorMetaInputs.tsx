"use client";

import React from "react";
import { Tag, Image as ImageIcon } from "lucide-react";

interface EditorMetaInputsProps {
  tags: string;
  thumbnail: string;
  onTagsChange: (value: string) => void;
  onThumbnailChange: (value: string) => void;
  disabled?: boolean;
}

export default function EditorMetaInputs({
  tags,
  thumbnail,
  onTagsChange,
  onThumbnailChange,
  disabled = false,
}: EditorMetaInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
          <Tag size={16} />
          태그 (쉼표로 구분)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
          placeholder="예: React, JavaScript, Web"
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="thumbnail" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
          <ImageIcon size={16} />
          썸네일 이미지 URL
        </label>
        <input
          type="url"
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => onThumbnailChange(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#3a404d] border border-[#4a505c] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] transition-colors"
          placeholder="https://example.com/image.jpg"
          disabled={disabled}
        />
      </div>
    </div>
  );
}