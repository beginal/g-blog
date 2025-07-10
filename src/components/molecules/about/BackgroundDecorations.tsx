'use client';

import React from 'react';

const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#ff6b6b]/10 to-[#4ecdc4]/10 rounded-full blur-xl animate-float-slow" />
      <div
        className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-[#45b7d1]/10 to-[#8a2be2]/10 rounded-full blur-xl animate-float-slow"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-full blur-xl animate-float-slow"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
};

export default BackgroundDecorations;