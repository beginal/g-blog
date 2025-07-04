import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "오류가 발생했습니다",
  message = "잠시 후 다시 시도해주세요.",
  onRetry,
  className = ''
}) => {
  return (
    <div className={`bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-red-400 mb-2">{title}</h3>
      <p className="text-red-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} />
          <span>다시 시도</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;