"use client";

import React from "react";

interface CardDescriptionProps {
  description: string[];
}

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => {
  return (
    <div className="text-white/70 text-sm leading-relaxed transition-all duration-500 ease-out tracking-wide mb-3 group-hover:text-white/90">
      <ul className="list-none p-0 m-0">
        {description.map((item, index) => (
          <li key={index} className="relative pl-4 before:content-['•'] before:text-emerald-300/80 before:absolute before:left-0 before:font-bold last:mb-0 group-hover:before:text-emerald-300">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardDescription;