"use client";

import React from "react";

interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  duration?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ icon, title, duration }) => {
  return (
    <div className="flex items-start gap-4 mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-300/20 to-purple-600/20 border border-emerald-300/30 rounded-xl flex items-center justify-center transition-all duration-500 ease-out relative flex-shrink-0 before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-300/10 before:to-purple-600/10 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 ">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white/95 font-semibold text-xl mt-0.5 mb-0.5 transition-all duration-500 ease-out tracking-tight leading-tight">
          {title}
        </h3>
        {duration && (
          <div className="mb-0">
            <span className="text-white/50 text-xs font-normal italic leading-tight">{duration}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
