'use client';

import React from 'react';
import { renderItem } from '@/utils/renderItem';

// ============================================================================
// Types
// ============================================================================
interface TimelineItem {
  title: string;
  organization?: string;  // Experience용
  company?: string;       // Experience용
  institution?: string;   // Education용
  period: string;
  description: (string | string[])[];
  skills: string[];
}

interface TimelineProps {
  title: string;
  icon: React.ReactNode;
  data: TimelineItem[];
}

// ============================================================================
// Sub Components
// ============================================================================

// 타임라인 마커 (동그라미)
const Marker = ({ isFirst = false }: { isFirst?: boolean }) => (
  <div className="relative flex items-center flex-shrink-0">
    <div
      className={`
        w-8 h-8 rounded-full border-4 border-[#1a1f2e] z-10 -mt-2
        ${isFirst ? 'bg-[#6ee7b7]' : 'bg-[#3a404d]'}
        transition-all duration-300 hover:scale-110
      `}
    />
  </div>
);

// 기간 뱃지
const PeriodBadge = ({ period }: { period: string }) => (
  <span className="absolute -top-3 left-4 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-[#1a1f2e] px-3 py-1 text-sm font-bold rounded">
    {period}
  </span>
);

// 조직명 (회사/학교)
const Organization = ({ name }: { name: string }) => (
  <h3 className="mt-2 mb-2 text-xl font-bold text-white">{name}</h3>
);

// 직책/과정명
const Title = ({ title }: { title: string }) => (
  <p className="mb-3 font-medium text-[#6ee7b7]">{title}</p>
);

// 설명
const Description = ({ items }: { items: (string | string[])[] }) => (
  <div className="mb-4 leading-relaxed text-white/70 prose prose-invert max-w-none">
    <div className="space-y-1">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  </div>
);

// 기술 태그들
const SkillTags = ({
  skills,
  delay = 0,
}: {
  skills: string[];
  delay?: number;
}) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill, index) => (
      <span
        key={skill}
        className="px-3 py-1 text-xs rounded-full text-white/90 border border-[#6ee7b7]/30 bg-[#6ee7b7]/10 dennis-hover opacity-0 animate-card-reveal"
        style={{ animationDelay: `${delay + index * 0.1}s` }}
      >
        {skill}
      </span>
    ))}
  </div>
);

// ============================================================================
// Layout Components (Compound Components Pattern을 위한)
// ============================================================================

// 섹션 래퍼
const Section = ({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="relative" role="list" aria-label={`${title} 타임라인`}>
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#6ee7b7] via-[#3a404d] to-[#3a404d] rounded-full" />
      {children}
    </div>
  </section>
);

// 타임라인 아이템 래퍼
const Item = ({
  children,
  index,
  period,
  title,
}: {
  children: React.ReactNode;
  index: number;
  period: string;
  title: string;
}) => (
  <div
    className="relative flex gap-8 pb-8 last:pb-0 opacity-0 animate-timeline-appear"
    style={{ animationDelay: `${index * 0.3}s` }}
    role="listitem"
    aria-label={`${period} ${title}`}
  >
    {children}
  </div>
);

// 컨텐츠 래퍼
const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1">
    <div className="relative bg-[#2c313a] rounded-lg p-6 sm:p-8 border border-[#3a404d] mb-4">
      {children}
    </div>
  </div>
);

// ============================================================================
// Main Component
// ============================================================================
const Timeline: React.FC<TimelineProps> & {
  Section: typeof Section;
  Item: typeof Item;
  Content: typeof Content;
  Marker: typeof Marker;
  PeriodBadge: typeof PeriodBadge;
  Organization: typeof Organization;
  Title: typeof Title;
  Description: typeof Description;
  SkillTags: typeof SkillTags;
} = ({ title, icon, data }) => {
  return (
    <Section title={title} icon={icon}>
      {data.map((item, index) => {
        // 조직명 결정 (Experience면 company, Education이면 institution)
        const organizationName = item.company || item.institution || item.organization || '';
        
        return (
          <Item key={index} index={index} period={item.period} title={item.title}>
            <Marker isFirst={index === 0} />
            <Content>
              <PeriodBadge period={item.period} />
              <Organization name={organizationName} />
              <Title title={item.title} />
              <Description items={item.description} />
              <SkillTags skills={item.skills} delay={index * 0.3} />
            </Content>
          </Item>
        );
      })}
    </Section>
  );
};

// Compound Components 할당
Timeline.Section = Section;
Timeline.Item = Item;
Timeline.Content = Content;
Timeline.Marker = Marker;
Timeline.PeriodBadge = PeriodBadge;
Timeline.Organization = Organization;
Timeline.Title = Title;
Timeline.Description = Description;
Timeline.SkillTags = SkillTags;

export default Timeline;
