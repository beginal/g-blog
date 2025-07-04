import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingCardProps {
  title?: string;
  message?: string;
  className?: string;
}

const LoadingCard: React.FC<LoadingCardProps> = ({
  title = "로딩 중...",
  message = "잠시만 기다려주세요.",
  className = ''
}) => {
  return (
    <div className={`bg-[#3a404d] p-8 rounded-2xl shadow-lg border border-[#3a404d] text-white text-center ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <LoadingSpinner size="lg" color="primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{message}</p>
    </div>
  );
};

export default LoadingCard;