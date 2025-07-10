"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Code,
  Award,
  BookOpen,
  ArrowLeft,
  Monitor,
  ShoppingCart,
  Users,
  Cloud,
  CheckSquare,
  PenTool,
  Music,
  MessageCircle,
  Gamepad2,
} from "lucide-react";
import { FaReact, FaJs, FaPython, FaHtml5, FaCss3Alt, FaSass, FaGithub, FaAws, FaFigma, FaSlack } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiFirebase,
  SiVercel,
  SiNotion,
  SiSupabase,
  SiAdobephotoshop,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbBrandReactNative } from "react-icons/tb";
import Link from "next/link";
import { Card, CardGrid } from "@/components/molecules/Cards";
import cardData from "./cardData.json";

interface TechStack {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }> | "text";
  category: "frontend" | "stateManagement" | "backend" | "devops" | "design";
  color?: string;
  text?: string;
}

// 텍스트 아이콘 컴포넌트들
const ZIcon = ({ size = 24, className = "", color = "#000" }: { size?: number; className?: string; color?: string }) => (
  <div
    className={`flex items-center justify-center font-bold ${className}`}
    style={{ color, fontSize: `${size - 8}px`, width: size, height: size }}
  >
    Z
  </div>
);

const MobXIcon = ({ size = 24, className = "", color = "#000" }: { size?: number; className?: string; color?: string }) => (
  <div
    className={`flex items-center justify-center font-bold ${className}`}
    style={{ color, fontSize: `${size - 12}px`, width: size, height: size }}
  >
    MX
  </div>
);

const RecoilIcon = ({ size = 24, className = "", color = "#000" }: { size?: number; className?: string; color?: string }) => (
  <div
    className={`flex items-center justify-center font-bold ${className}`}
    style={{ color, fontSize: `${size - 10}px`, width: size, height: size }}
  >
    RC
  </div>
);

const ReactQueryIcon = ({ size = 24, className = "", color = "#000" }: { size?: number; className?: string; color?: string }) => (
  <div
    className={`flex items-center justify-center font-bold ${className}`}
    style={{ color, fontSize: `${size - 10}px`, width: size, height: size }}
  >
    RQ
  </div>
);

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

interface CardData {
  id: number;
  icon: string;
  title: string;
  summary?: string;
  link?: {
    url: string;
    text: string;
  };
  status?: string;
  duration?: string;
  description: string[];
  tags?: string[];
  readmeFile?: string;
}

const AboutPage = () => {
  const [readmeContents, setReadmeContents] = useState<Record<number, string>>({});

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
  } as const;

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Code className="w-6 h-6 text-white" />;
  };

  useEffect(() => {
    const loadReadmeContents = async () => {
      const contents: Record<number, string> = {};

      for (const card of cardData) {
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
  }, []);

  const personalInfo = {
    name: "함준호",
    title: "Product Manager",
    location: "서울 관악구 신림동",
    email: "beginal01@gmail.com",
    phone: "010-9215-9984",
    github: "https://github.com/beginal",
    linkedin: undefined,
    bio: "탑코에서 3년간 프론트엔드 개발자로 근무하며 다양한 웹 서비스의 구축과 운영, 성능 개선을 경험했습니다. 실무에서 React, TypeScript 등 다양한 프론트엔드 기술을 활용하여 사용자 경험을 최우선으로 고려한 UI/UX 개발에 집중했습니다. 퇴사 후에는 PM 역량 강화를 목표로 서비스 기획과 프로젝트 관리에 대해 공부하며, 실제로 3차례 사이드 프로젝트를 기획한 경험이 있습니다.",
  };

  const techStacks: TechStack[] = [
    // 프론트엔드
    { name: "React", icon: FaReact, category: "frontend", color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, category: "frontend", color: "#000000" },
    { name: "TypeScript", icon: SiTypescript, category: "frontend", color: "#3178C6" },
    { name: "JavaScript", icon: FaJs, category: "frontend", color: "#F7DF1E" },
    { name: "HTML5", icon: FaHtml5, category: "frontend", color: "#E34C26" },
    { name: "CSS3", icon: FaCss3Alt, category: "frontend", color: "#1572B6" },
    { name: "SCSS", icon: FaSass, category: "frontend", color: "#CC6699" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend", color: "#06B6D4" },

    // 상태 관리
    { name: "Redux", icon: SiRedux, category: "stateManagement", color: "#764ABC" },
    { name: "Recoil", icon: RecoilIcon, category: "stateManagement", color: "#3578E5" },
    { name: "MobX", icon: MobXIcon, category: "stateManagement", color: "#FF6B00" },
    { name: "Zustand", icon: ZIcon, category: "stateManagement", color: "#2D3748" },
    { name: "React Query", icon: ReactQueryIcon, category: "stateManagement", color: "#FF4154" },

    // 백엔드
    { name: "Python", icon: FaPython, category: "backend", color: "#3776AB" },
    { name: "Firebase", icon: SiFirebase, category: "backend", color: "#FFCA28" },
    { name: "Supabase", icon: SiSupabase, category: "backend", color: "#3ECF8E" },

    // 환경 및 배포
    { name: "GitHub", icon: FaGithub, category: "devops", color: "#181717" },
    { name: "AWS", icon: FaAws, category: "devops", color: "#FF9900" },
    { name: "Vercel", icon: SiVercel, category: "devops", color: "#000000" },

    // 디자인 및 협업 도구
    { name: "Figma", icon: FaFigma, category: "design", color: "#F24E1E" },
    { name: "Photoshop", icon: SiAdobephotoshop, category: "design", color: "#31A8FF" },
    { name: "Notion", icon: SiNotion, category: "design", color: "#000000" },
    { name: "Slack", icon: FaSlack, category: "design", color: "#4A154B" },
  ];

  const techCategories = {
    frontend: { name: "프론트엔드", techs: techStacks.filter(t => t.category === "frontend") },
    stateManagement: { name: "상태 관리", techs: techStacks.filter(t => t.category === "stateManagement") },
    backend: { name: "백엔드", techs: techStacks.filter(t => t.category === "backend") },
    devops: { name: "환경 및 배포", techs: techStacks.filter(t => t.category === "devops") },
    design: { name: "디자인 및 협업 도구", techs: techStacks.filter(t => t.category === "design") },
  };

  const experiences: Experience[] = [
    {
      title: "프론트엔드 개발자",
      company: "탑코 (해외서비스 개발팀)",
      period: "2021.04 - 2023.12",
      description:
        "사내 어드민 페이지 총괄 개발 및 유지보수를 담당했습니다. JS로 작업된 코드를 TypeScript + React로 대부분 변경하고, TopToon JP 초기 개발 참여 및 유지보수, TopToon Global 개발 참여 및 유지보수를 진행했습니다. 다수의 중요 페이지 기능 구현(SNS 로그인, 결제, 마이페이지, 웹툰 리스트, 웹툰 뷰어)을 담당했습니다.",
      skills: ["React", "TypeScript", "Next.js", "edgio", "결제 시스템"],
    },
    {
      title: "프론트엔드 개발자 인턴",
      company: "Rencar (개발팀)",
      period: "2020.11 - 2020.12",
      description:
        "Rencar USA 사고 대차 서비스 모바일 페이지를 제작했습니다. Next의 getServerSideProps를 적극 활용해 SSR을 구현하고, MobX 사용으로 Store 전역관리, Atomic Design 패턴을 참고하여 Components 구성, Axios, JWT, react-token을 사용하여 토큰값 유무에 따른 페이지 접근승인을 구현했습니다.",
      skills: ["Next.js", "MobX", "SCSS", "JWT", "Axios"],
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 작업 진행중 안내 */}
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-center font-medium">해당 페이지는 아직 작업 진행중입니다. 정확한 정보는 이력서를 확인해주세요</p>
        </div>

        {/* 헤더 섹션 */}
        <div className="mb-12 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6ee7b7] to-[#3b82f6] p-1">
            <div className="w-full h-full rounded-full bg-[#2c313a] flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {personalInfo.name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </span>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">{personalInfo.name}</h1>
          <p className="text-xl text-[#6ee7b7] mb-4">{personalInfo.title}</p>
          <p className="max-w-2xl mx-auto mb-6 leading-relaxed text-white/70">{personalInfo.bio}</p>

          {/* 연락처 정보 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin size={16} />
              <span className="text-sm">{personalInfo.location}</span>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
            >
              <Mail size={16} />
              <span className="text-sm">{personalInfo.email}</span>
            </a>
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors">
              <span className="text-sm">{personalInfo.phone}</span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
            >
              <Github size={16} />
              <span className="text-sm">GitHub</span>
            </a>
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
              >
                <Linkedin size={16} />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* 스킬 섹션 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-[#6ee7b7]" size={24} />
            <h2 className="text-2xl font-bold text-white">기술 스택</h2>
          </div>

          <div className="space-y-8">
            {Object.entries(techCategories).map(([key, category]) => (
              <div key={key}>
                <h3 className="mb-4 text-lg font-semibold text-white/90">{category.name}</h3>
                <div className="grid grid-cols-8 gap-4 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14">
                  {category.techs.map(tech => (
                    <div key={tech.name} className="relative bg-white rounded group">
                      <div
                        className="relative flex items-center justify-center p-1 transition-transform cursor-pointer aspect-square"
                        title={tech.name}
                      >
                        <tech.icon size={30} className="transition-all duration-300" color={tech.color || "#6ee7b7"} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 경력 섹션 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-[#6ee7b7]" size={24} />
            <h2 className="text-2xl font-bold text-white">경력</h2>
          </div>

          <div className="relative" role="list" aria-label="경력 타임라인">
            {/* 전체 수직선 */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#3a404d]" />

            {experiences.map((exp, index) => (
              <div key={index} className="relative flex gap-8 pb-8 last:pb-0" role="listitem" aria-label={`${exp.period} ${exp.title}`}>
                {/* 타임라인 마커 컨테이너 */}
                <div className="relative flex items-center flex-shrink-0">
                  <div
                    className={`
                    w-8 h-8 rounded-full border-4 border-[#1a1f2e] z-10
                    ${index === 0 ? "bg-[#6ee7b7]" : "bg-[#3a404d]"}
                    transition-all duration-300 hover:scale-110
                  `}
                  />
                </div>

                {/* 컨텐츠 영역 */}
                <div className="flex-1">
                  <div className="relative bg-[#2c313a] rounded-lg p-4 sm:p-6 border border-[#3a404d]">
                    {/* 기간 표시 - 박스 왼쪽 위 */}
                    <span className="absolute -top-3 left-4 bg-[#1a1f2e] px-3 py-1 text-[#6ee7b7] text-sm font-medium rounded">
                      {exp.period}
                    </span>

                    {/* 회사명 */}
                    <h3 className="mt-2 mb-2 text-xl font-bold text-white">{exp.company}</h3>

                    {/* 직군 */}
                    <p className="mb-3 font-medium text-white/80">{exp.title}</p>

                    {/* 설명 */}
                    <p className="mb-4 leading-relaxed text-white/70">{exp.description}</p>

                    {/* 기술 태그 */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full text-white/90 border border-[#6ee7b7]/30 bg-[#6ee7b7]/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 학력 섹션 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-[#6ee7b7]" size={24} />
            <h2 className="text-2xl font-bold text-white">학력</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <div className="flex flex-col mb-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-white">PM 부트캠프</h3>
                <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                  <Calendar size={14} />
                  <span>2024.06 - 2024.12</span>
                </div>
              </div>
              <p className="mb-2 font-medium text-white/80">FastCampus</p>
              <p className="leading-relaxed text-white/70">
                PM 역량 강화를 목표로 서비스 기획과 프로젝트 관리에 대해 체계적으로 학습했습니다. 실제로 3차례 사이드 프로젝트를 기획하며
                요구사항 정의, 일정 관리, 팀원 간 협업 등 실무에 가까운 기획과 커뮤니케이션 역량을 쌓았습니다.
              </p>
            </div>
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <div className="flex flex-col mb-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-white">프론트엔드 개발 부트캠프</h3>
                <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                  <Calendar size={14} />
                  <span>2020.10 - 2020.11</span>
                </div>
              </div>
              <p className="mb-2 font-medium text-white/80">Wecode</p>
              <p className="leading-relaxed text-white/70">프론트엔드 개발에 대한 기초를 다지고 실무 프로젝트를 경험했습니다.</p>
            </div>
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <div className="flex flex-col mb-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-white">전자상거래과</h3>
                <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                  <Calendar size={14} />
                  <span>2011.03 - 2014.02</span>
                </div>
              </div>
              <p className="mb-2 font-medium text-white/80">하남정보산업고등학교</p>
              <p className="leading-relaxed text-white/70">전자상거래 전공으로 졸업했습니다.</p>
            </div>
          </div>
        </section>

        {/* PM 프로젝트 섹션 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-[#6ee7b7]" size={24} />
            <h2 className="text-2xl font-bold text-white">프로젝트</h2>
          </div>
          <CardGrid cols={{ sm: 1, md: 2, lg: 2, xl: 3 }} gap={6}>
            {cardData.map((card: CardData) => (
              <Card
                key={card.id}
                icon={getIcon(card.icon)}
                title={card.title}
                summary={card.summary}
                description={card.description}
                tags={card.tags}
                link={card.link}
                duration={card.duration}
                status={card.status}
                readmeContent={readmeContents[card.id]}
              />
            ))}
          </CardGrid>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
