"use client";

import React from "react";

interface CardTagsProps {
  tags: string[];
}

const CardTags: React.FC<CardTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-emerald-300/10 text-emerald-300/90 text-xs font-medium px-2 py-1 rounded border border-emerald-300/20 transition-all duration-300 hover:bg-emerald-300/15 hover:text-emerald-300 hover:border-emerald-300/30"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default CardTags;
