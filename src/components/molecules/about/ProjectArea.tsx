'use client';

import React, { useState, useEffect } from 'react';
import {
  Code,
  Monitor,
  ShoppingCart,
  Users,
  Cloud,
  CheckSquare,
  PenTool,
  Music,
  MessageCircle,
  Gamepad2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { renderItem } from '@/utils/renderItem';
import { useModalStore } from '@/stores/useModalStore';

// ============================================================================
// Types
// ============================================================================
interface LegacyCardProps {
  icon: React.ReactNode;
  title: string;
  summary?: string;
  link?: {
    url: string;
    text: string;
  };
  description: (string | string[])[];
  tags?: string[];
  status?: string;
  duration?: string;
  projectType?: string;
  className?: string;
  readmeContent?: string;
}

interface CompoundCardProps {
  children: React.ReactNode;
  projectType?: string | undefined;
  status?: string | undefined;
  className?: string | undefined;
}

// ============================================================================
// Sub Components
// ============================================================================

// 상태 뱃지
const StatusBadge = ({
  status,
  className = '',
}: {
  status: string;
  className?: string;
}) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case '완료':
        return 'text-green-500 bg-green-500/15 border-green-500/30 group-hover:bg-green-500/25 group-hover:border-green-500/50';
      case '개발 중':
        return 'text-orange-500 bg-orange-500/15 border-orange-500/30 group-hover:bg-orange-500/25 group-hover:border-orange-500/50';
      case '기획 중':
        return 'text-purple-500 bg-purple-500/15 border-purple-500/30 group-hover:bg-purple-500/25 group-hover:border-purple-500/50';
      default:
        return 'text-gray-400 bg-gray-400/15 border-gray-400/30 group-hover:bg-gray-400/25 group-hover:border-gray-400/50';
    }
  };

  return (
    <div className={`absolute right-4 ${className}`}>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-md border inline-block transition-all duration-300 backdrop-blur-sm ${getStatusClasses(status)}`}
      >
        {status}
      </span>
    </div>
  );
};

// 모달 버튼
const ModalButton = ({
  title,
  readmeContent,
}: {
  title: string;
  readmeContent: string;
}) => {
  const { openModal } = useModalStore();

  const handleReadmeClick = () => {
    (openModal as any)({
      title: `${title} - README`,
      content: readmeContent,
      size: 'large',
    });
  };

  return (
    <button
      onClick={handleReadmeClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
    >
      <BookOpen size={16} />
      <span className="text-sm font-medium">README</span>
    </button>
  );
};

// 카드 헤더
const Header = ({
  icon,
  title,
  duration,
}: {
  icon: React.ReactNode;
  title: string;
  duration?: string;
}) => (
  <div className="flex items-start gap-4 mb-4">
    <div className="flex-shrink-0 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/30">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold text-white mb-1 leading-tight">
        {title}
      </h3>
      {duration && (
        <span className="text-sm text-emerald-300 font-medium">{duration}</span>
      )}
    </div>
  </div>
);

// 카드 요약
const Summary = ({ summary }: { summary: string }) => (
  <div className="mb-4 pl-4 border-l-2 border-emerald-300/50">
    <p className="text-white/80 text-sm leading-relaxed">{summary}</p>
  </div>
);

// 카드 설명
const Description = ({
  description,
}: {
  description: (string | string[])[];
}) => (
  <div className="mb-6 flex-1">
    <div className="text-white/70 leading-relaxed prose prose-invert max-w-none">
      <div className="space-y-1">
        {description.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  </div>
);

// 카드 태그들
const Tags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 text-xs rounded-full text-white/90 border border-emerald-300/30 bg-emerald-300/10 transition-all duration-300 group-hover:border-emerald-300/50 group-hover:bg-emerald-300/20"
      >
        {tag}
      </span>
    ))}
  </div>
);

// 카드 버튼
const Button = ({
  link,
  title,
  readmeContent,
}: {
  link: { url: string; text: string };
  title: string;
  readmeContent?: string;
}) => (
  <div className="flex gap-3 mt-auto">
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
    >
      <ExternalLink size={16} />
      <span className="text-sm font-medium">{link.text}</span>
    </a>
    {readmeContent && (
      <ModalButton title={title} readmeContent={readmeContent} />
    )}
  </div>
);

// ============================================================================
// Layout Components
// ============================================================================

// 프로젝트 영역
const ProjectArea = ({
  title,
  icon,
  projects,
  cols = { sm: 1, md: 1, lg: 1, xl: 1 },
  gap = 6,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  projects: any[];
  cols?: { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
  className?: string;
}) => {
  const [readmeContents, setReadmeContents] = useState<Record<number, string>>(
    {}
  );

  // iconMap 내부에서 정의
  const iconMap = {
    Monitor: <Monitor className="w-6 h-6 text-white" />,
    ShoppingCart: <ShoppingCart className="w-6 h-6 text-white" />,
    Users: <Users className="w-6 h-6 text-white" />,
    Cloud: <Cloud className="w-6 h-6 text-white" />,
    CheckSquare: <CheckSquare className="w-6 h-6 text-white" />,
    PenTool: <PenTool className="w-6 h-6 text-white" />,
    Music: <Music className="w-6 h-6 text-white" />,
    MessageCircle: <MessageCircle className="w-6 h-6 text-white" />,
    Gamepad2: <Gamepad2 className="w-6 h-6 text-white" />,
    Code: <Code className="w-6 h-6 text-white" />,
  } as const;

  // README 컨텐츠 로드
  useEffect(() => {
    const loadReadmeContents = async () => {
      const contents: Record<number, string> = {};

      for (const card of projects) {
        if (card.readmeFile) {
          try {
            const response = await fetch(`/readmes/${card.readmeFile}`);
            if (response.ok) {
              contents[card.id] = await response.text();
            }
          } catch (error) {
            console.error(`Failed to load README for card ${card.id}:`, error);
          }
        }
      }

      setReadmeContents(contents);
    };

    loadReadmeContents();
  }, [projects]);
  const getGridCols = () => {
    const colClasses = [];

    if (cols.sm) colClasses.push(`grid-cols-${cols.sm}`);
    if (cols.md) colClasses.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) colClasses.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) colClasses.push(`xl:grid-cols-${cols.xl}`);

    return colClasses.join(' ');
  };

  const getGapClass = () => {
    switch (gap) {
      case 2:
        return 'gap-2';
      case 3:
        return 'gap-3';
      case 4:
        return 'gap-4';
      case 5:
        return 'gap-5';
      case 6:
        return 'gap-6';
      case 7:
        return 'gap-7';
      case 8:
        return 'gap-8';
      default:
        return 'gap-6';
    }
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || iconMap['Code'];
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className={`grid ${getGridCols()} ${getGapClass()} ${className}`}>
        {projects.map(project => (
          <Card
            key={project.id}
            icon={getIcon(project.icon)}
            title={project.title}
            summary={project.summary || ''}
            description={project.description}
            tags={project.tags || []}
            link={project.link || { url: '', text: '' }}
            duration={project.duration || ''}
            status={project.status || ''}
            projectType={project.projectType || ''}
            readmeContent={readmeContents[project.id] || ''}
          />
        ))}
      </div>
    </section>
  );
};

// 카드 컨테이너
const Container = ({
  children,
  projectType,
  status,
  className = '',
}: CompoundCardProps) => (
  <div
    className={`group relative h-full flex flex-col p-6 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-2xl transition-all duration-500 ease-out before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-300/5 before:to-purple-600/5 before:opacity-0 before:transition-opacity before:duration-500 before:z-[-1] hover:before:opacity-100 hover:border-emerald-300/30 ${className}`}
  >
    {/* Project Type Badge - 우상단 위쪽 */}
    {projectType && (
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            projectType === '개발'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
          }`}
        >
          {projectType}
        </span>
      </div>
    )}

    {/* Status Badge - 우상단 아래쪽 */}
    {status && (
      <StatusBadge
        status={status}
        className={projectType ? 'top-12' : 'top-4'}
      />
    )}

    {children}
  </div>
);

// ============================================================================
// Main Component
// ============================================================================
const Card: React.FC<LegacyCardProps> & {
  ProjectArea: typeof ProjectArea;
  Container: typeof Container;
  Header: typeof Header;
  Summary: typeof Summary;
  Description: typeof Description;
  Tags: typeof Tags;
  Button: typeof Button;
  StatusBadge: typeof StatusBadge;
  ModalButton: typeof ModalButton;
} = props => {
  // Legacy mode: render as complete card
  return (
    <Container
      projectType={props.projectType}
      status={props.status}
      className={props.className}
    >
      <Header
        icon={props.icon}
        title={props.title}
        {...(props.duration && { duration: props.duration })}
      />
      {props.summary && <Summary summary={props.summary} />}
      <Description description={props.description} />
      {props.tags && props.tags.length > 0 && <Tags tags={props.tags} />}
      {props.link && (
        <Button
          link={props.link}
          title={props.title}
          readmeContent={props.readmeContent || ''}
        />
      )}
    </Container>
  );
};

// Compound Components 할당
Card.ProjectArea = ProjectArea;
Card.Container = Container;
Card.Header = Header;
Card.Summary = Summary;
Card.Description = Description;
Card.Tags = Tags;
Card.Button = Button;
Card.StatusBadge = StatusBadge;
Card.ModalButton = ModalButton;

export default ProjectArea;

// Legacy exports for backward compatibility
export { Card, ProjectArea };
