'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Code,
  Award,
  BookOpen,
} from 'lucide-react';
import { TechStack, ProfileHeader, BackgroundDecorations, Timeline, ProjectArea } from '@/components/molecules/about';
import aboutData from '@/data/about';


const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 페이지 로드 애니메이션을 위한 효과
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const personalInfo = aboutData.personal;

  return (
    <div className="min-h-screen bg-[#1a1f2e] overflow-x-hidden pt-15 sm:pt-30">
      {/* about 페이지 전용 스타일 */}
      <style jsx global>{`
        .container {
          background-color: #1a1f2e !important;
        }
        body {
          background-color: #1a1f2e !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        html {
          background-color: #1a1f2e !important;
        }
      `}</style>

      <div className="px-6 pt-4 pb-16 sm:px-8 md:px-4">
        {/* Dennis 스타일 배경 장식 요소들 */}
        <BackgroundDecorations />

        <div
          className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* 작업 진행중 안내 - 주석처리 */}
          {/* <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-center font-medium">해당 페이지는 아직 작업 진행중입니다. 정확한 정보는 이력서를 확인해주세요</p>
        </div> */}

          {/* 헤더 섹션 */}
          <ProfileHeader personalInfo={personalInfo} />

          {/* 스킬 섹션 */}
          <TechStack
            title="기술 스택"
            icon={<Code className="text-[#6ee7b7]" size={24} />}
            data={aboutData.techStack}
          />

          {/* 경력 섹션 */}
          <Timeline
            title="경력"
            icon={<Award className="text-[#6ee7b7]" size={24} />}
            data={aboutData.experiences}
          />

          {/* 교육 섹션 */}
          <Timeline
            title="교육"
            icon={<BookOpen className="text-[#6ee7b7]" size={24} />}
            data={aboutData.education}
          />

          {/* 프로젝트 섹션 */}
          <Suspense fallback={
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-[#6ee7b7] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <ProjectArea
              title="프로젝트"
              icon={<Code className="text-[#6ee7b7]" size={24} />}
              projects={aboutData.projects}
              cols={{ sm: 1, md: 1, lg: 1, xl: 1 }}
              gap={6}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
