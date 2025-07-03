"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { Quest } from "@/types";

const QuestComponent: React.FC<{ quest: Quest; onComplete: (xp: number) => void }> = ({ quest, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    const correct = selectedAnswer === quest.answerIndex;
    setIsCorrect(correct);
    if (correct) {
      onComplete(quest.xp);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t-2 border-[#4a505c]">
      <h2 className="text-2xl font-bold text-center mb-6">이해 확인 퀘스트</h2>
      <div className="bg-[#2c313a] p-6 rounded-lg">
        <p className="text-lg text-white/90 mb-4">{quest.question}</p>
        <div className="space-y-3 mb-6">
          {quest.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            let buttonClass = "w-full text-left p-3 rounded-lg border transition-colors ";
            if (isSubmitted) {
              if (index === quest.answerIndex) {
                buttonClass += "bg-green-500/20 border-green-500";
              } else if (isSelected) {
                buttonClass += "bg-red-500/20 border-red-500";
              } else {
                buttonClass += "border-[#4a505c]";
              }
            } else {
              buttonClass += isSelected ? "bg-white/20 border-white" : "border-[#4a505c] hover:bg-white/10";
            }

            return (
              <button key={index} onClick={() => !isSubmitted && setSelectedAnswer(index)} disabled={isSubmitted} className={buttonClass}>
                {option}
              </button>
            );
          })}
        </div>
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full bg-[#6ee7b7] text-black font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            정답 확인
          </button>
        ) : isCorrect ? (
          <div className="text-center text-green-400 flex items-center justify-center gap-2">
            <CheckCircle /> 정답입니다! (+{quest.xp}XP)
          </div>
        ) : (
          <div className="text-center text-red-400 flex items-center justify-center gap-2">
            <XCircle /> 다시 한번 생각해 보세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestComponent;
