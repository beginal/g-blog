import React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export interface PatchNote {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'fix' | 'update';
  version?: string;
  isNew?: boolean;
}

interface PatchNotesCardProps {
  className?: string;
  notes?: PatchNote[];
  maxScrollHeight?: string;
  showViewAllButton?: boolean;
  highlightRecent?: boolean;
}

const MOCK_PATCH_NOTES: PatchNote[] = [
  {
    id: "patch-001",
    date: "2024-07-05", 
    title: "홈 Profile 영역 재설계",
    description: "Profile 영역을 A박스(컴팩트 프로필)와 B박스(패치노트)로 분할하여 더 나은 사용자 경험 제공",
    type: "feature",
    version: "v2.1.0",
    isNew: true
  },
  {
    id: "patch-002",
    date: "2024-07-03",
    title: "Prism.js 언어 지원 확장", 
    description: "TypeScript, Python, Java 등 다양한 프로그래밍 언어 하이라이팅 지원 추가",
    type: "improvement",
    version: "v2.0.5"
  },
  {
    id: "patch-003", 
    date: "2024-07-01",
    title: "테스트 환경 구축",
    description: "Jest, Testing Library 기반 자동화 테스트 환경 구축 및 CI/CD 파이프라인 개선",
    type: "update",
    version: "v2.0.0"
  },
  {
    id: "patch-004",
    date: "2024-06-28",
    title: "댓글 시스템 구현",
    description: "문서 구조 개선과 함께 인터랙티브한 댓글 기능 추가",
    type: "feature"
  },
  {
    id: "patch-005",
    date: "2024-06-25",
    title: "성능 최적화",
    description: "이미지 압축 및 코드 분할을 통한 페이지 로딩 속도 개선",
    type: "improvement"
  }
];

const typeStyles = {
  feature: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  improvement: "bg-green-500/20 text-green-300 border-green-500/30", 
  fix: "bg-red-500/20 text-red-300 border-red-500/30",
  update: "bg-purple-500/20 text-purple-300 border-purple-500/30"
};

const typeLabels = {
  feature: "새 기능",
  improvement: "개선",
  fix: "수정",
  update: "업데이트"
};

const PatchNotesCard: React.FC<PatchNotesCardProps> = ({
  className,
  notes = MOCK_PATCH_NOTES,
  maxScrollHeight = "320px",
  // showViewAllButton = true, // 현재 사용하지 않음
  highlightRecent = true
}) => {
  return (
    <div className={cn(
      "bg-[#3a404d] rounded-2xl shadow-lg text-white border border-[#3a404d] overflow-hidden flex flex-col h-full",
      className
    )}>
      {/* 헤더 */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-white/80" />
          패치 노트
        </h3>
        <p className="text-sm text-white/60 mt-1">최근 업데이트 및 변경사항</p>
      </div>
      
      {/* 스크롤 가능한 목록 */}
      <div 
        className="flex-grow overflow-y-auto"
        style={{ maxHeight: maxScrollHeight }}
      >
        <div className="p-4">
          {notes.map((note, index) => (
            <div 
              key={note.id}
              className="p-3"
              style={
                index !== notes.length - 1
                  ? { borderBottom: '1px solid rgba(255,255,255,0.2)' }
                  : {}
              }
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full border font-medium",
                    typeStyles[note.type]
                  )}>
                    {typeLabels[note.type]}
                  </span>
                  <span className="text-xs text-white/50">{note.date}</span>
                  {note.version && (
                    <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                      {note.version}
                    </span>
                  )}
                  {note.isNew && highlightRecent && (
                    <span className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-medium text-white mb-1 line-clamp-1">
                  {note.title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                  {note.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PatchNotesCard;