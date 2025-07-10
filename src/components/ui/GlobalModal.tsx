"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useModalStore } from "@/stores/useModalStore";
import Portal from "./Portal";

const GlobalModal: React.FC = () => {
  const { isOpen, title, content, type, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" onClick={closeModal} />
        
        <div className="relative w-full max-w-4xl max-h-[90vh] mx-4 border border-[#2c313a] rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden bg-[#3a404d]">
          <div className="flex items-center justify-between p-4 border-b border-emerald-300/20 bg-[#2c313a]">
            <h2 className="text-xl font-bold text-white truncate ml-4">
              {title}{type === 'readme' && ' - README'}
            </h2>
            <button
              onClick={closeModal}
              className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            {type === 'readme' ? (
              <div className="prose prose-invert prose-emerald max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-4 border-b border-emerald-300/30 pb-2">{children}</h1>
                    ),
                    h2: ({ children }) => <h2 className="text-2xl font-semibold text-white mb-3 mt-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-medium text-white mb-2 mt-4">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-300">{children}</li>,
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-gray-800/80 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                      ) : (
                        <code className="block bg-slate-900/90 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-emerald-300/20 whitespace-pre-wrap">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-slate-900/90 p-4 rounded-lg overflow-x-auto mb-4 border border-emerald-300/20 whitespace-pre-wrap">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-emerald-300/50 pl-4 py-2 my-4 bg-gray-800/30 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 underline transition-colors duration-200"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-gray-300">
                {content}
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default GlobalModal;