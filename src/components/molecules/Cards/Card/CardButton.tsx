"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import ModalButton from "./ModalButton";

interface CardButtonProps {
  link: {
    url: string;
    text: string;
  };
  title: string;
  readmeContent?: string;
}

const CardButton: React.FC<CardButtonProps> = ({ link, title, readmeContent }) => {

  return (
    <>
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex gap-3">
          {readmeContent && (
            <ModalButton title={title} readmeContent={readmeContent} />
          )}
          <a 
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 bg-blue-400/10 border border-blue-400/30 text-sm font-medium px-4 py-2 rounded-lg no-underline transition-all duration-300 ease-out hover:text-white hover:bg-blue-400/20 hover:border-blue-400/50 hover:-translate-y-0.5"
          >
            {link.text}
            <ExternalLink className="w-4 h-4 transition-transform duration-300 ease-out hover:translate-x-0.5 hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

    </>
  );
};

export default CardButton;