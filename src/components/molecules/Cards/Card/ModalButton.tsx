"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { useModalStore } from "@/stores/useModalStore";

interface ModalButtonProps {
  title: string;
  readmeContent: string;
}

const ModalButton: React.FC<ModalButtonProps> = ({ title, readmeContent }) => {
  const { openModal } = useModalStore();

  const handleReadMeClick = () => {
    openModal(title, readmeContent, 'readme');
  };

  return (
    <>
      <button
        onClick={handleReadMeClick}
        className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ease-out hover:text-white hover:bg-emerald-400/20 hover:border-emerald-400/50 hover:-translate-y-0.5 cursor-pointer"
      >
        <BookOpen className="w-4 h-4" />
        README
      </button>

    </>
  );
};

export default ModalButton;