"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import CardHeader from "./Card/CardHeader";
import CardSummary from "./Card/CardSummary";
import CardDescription from "./Card/CardDescription";
import CardTags from "./Card/CardTags";
import CardButton from "./Card/CardButton";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  summary?: string;
  link?: {
    url: string;
    text: string;
  };
  description: string[];
  tags?: string[];
  status?: string;
  duration?: string;
  className?: string;
  readmeContent?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, summary, link, description, tags, status, duration, className = "", readmeContent }) => {
  return (
    <div
      className={`group relative h-full flex flex-col p-6 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-2xl transition-all duration-500 ease-out before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-300/5 before:to-purple-600/5 before:opacity-0 before:transition-opacity before:duration-500 before:z-[-1] hover:before:opacity-100 hover:border-emerald-300/30 ${className}`}
    >
      {/* Header with Icon and Title */}
      <CardHeader icon={icon} title={title} duration={duration} />

      {/* Summary */}
      {summary && <CardSummary summary={summary} />}

      {/* Status */}
      {status && <StatusBadge status={status} />}

      {/* Description */}
      <CardDescription description={description} />

      {/* Tags */}
      {tags && tags.length > 0 && <CardTags tags={tags} />}

      {/* Button Area */}
      {link && <CardButton link={link} title={title} readmeContent={readmeContent} />}
    </div>
  );
};

export default Card;
