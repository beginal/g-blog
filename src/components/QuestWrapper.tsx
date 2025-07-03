"use client";

import React from "react";
import QuestComponent from "@/components/QuestComponent";
import type { Quest } from "@/types";

interface QuestWrapperProps {
  quest: Quest;
}

const QuestWrapper: React.FC<QuestWrapperProps> = ({ quest }) => {
  const handleQuestComplete = (xp: number) => {
    // 실제 앱에서는 이 XP를 사용자 데이터베이스에 저장해야 합니다.
    console.log(`퀘스트 완료! ${xp} XP 획득!`);
    // 여기서는 임시로 콘솔에만 출력합니다.
  };

  return <QuestComponent quest={quest} onComplete={handleQuestComplete} />;
};

export default QuestWrapper;
