"use client";

import React from "react";

interface CardSummaryProps {
  summary: string;
}

const CardSummary: React.FC<CardSummaryProps> = ({ summary }) => {
  return (
    <div className="mb-2 border-l-4 border-emerald-300 pl-3">
      <p className="text-white/80 text-base font-medium leading-relaxed m-0">{summary}</p>
    </div>
  );
};

export default CardSummary;
