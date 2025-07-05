"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Star, GitFork, Calendar, Filter } from "lucide-react";
import { COLORS } from "@/config/constants";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  startDate: string;
  endDate?: string;
  status: "완료" | "진행중" | "중단";
  highlights: string[];
}

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 프로젝트 데이터 (실제 프로젝트로 수정해서 사용하세요)
  const projects: Project[] = [
    {
      id: "1",
      title: "[PM] 불법 주정차 신고 서비스",
      description: "불법 주정차 간편 신고 서비스 신규 기획 프로젝트",
      longDescription: "안전신문고, 서울 스마트 불편신고 등 현재 나와있는 불법 주차 신고 서비스의 불편을 줄이고 신고를 간편하게 하기 위한 서비스입니다. 사용자가 신고 항목을 간편하게 찾을 수 있게 하고, 확실한 가이드라인으로 불수용 사례를 줄이며, 신고 UI/UX를 명확하게 변경하여 헤매는 과정을 줄이는 것에 집중했습니다.",
      image: "/api/placeholder/600/400",
      tags: ["PM", "Figma", "Webflow", "Notion", "설문조사"],
      category: "PM",
      startDate: "2024.06",
      endDate: "2024.08",
      status: "완료",
      highlights: [
        "조장으로 PM 4명 팀 프로젝트 진행",
        "페인포인트 발견 및 설문을 통한 가설 검증",
        "Figma를 활용한 와이어프레임 설계 주도",
        "Webflow를 활용한 랜딩페이지 개발",
        "Notion으로 팀원들과 프로젝트 일정 공유"
      ]
    },
    {
      id: "2",
      title: "[PM] 프리랜서 중개 플랫폼 개선",
      description: "프리랜서 채용 중개 플랫폼 원티드 긱스 개선 프로젝트",
      longDescription: "프리랜서 채용 중개 플랫폼 원티드 긱스의 개선 프로젝트입니다. 프로젝트 의뢰 플로우를 변경하여 프로젝트의 신뢰성을 높이고, 프리랜서 등록 플로우를 변경하여 개인의 경력을 더 적극적으로 어필할 수 있게 하는 것을 목표로 했습니다.",
      image: "/api/placeholder/600/400",
      tags: ["PM", "Figma", "사용자 조사", "플로우 개선"],
      category: "PM",
      startDate: "2024.09",
      endDate: "2024.10",
      status: "완료",
      highlights: [
        "PM 4명 팀 프로젝트 진행",
        "페인포인트 발견 및 설문을 통한 가설 검증",
        "Figma를 활용한 와이어프레임 설계 주도",
        "프로젝트 의뢰 플로우 변경으로 신뢰성 향상",
        "프리랜서 등록 플로우 개선"
      ]
    },
    {
      id: "3",
      title: "[PM] 챗봇 서비스 개선",
      description: "B2B 챗봇 서비스 AI JiHye 개선 프로젝트",
      longDescription: "B2B 챗봇 서비스 AI JiHye의 개선 프로젝트입니다. 쇼핑몰 내 사용자가 챗봇을 통해 맞춤형 상품을 추천받을 수 있게 하고, 챗봇 관리자가 챗봇 등록/관리를 더욱 간편하게 할 수 있도록 개선했습니다.",
      image: "/api/placeholder/600/400",
      tags: ["PM", "Figma", "프로토타입", "유저 테스트", "인터뷰"],
      category: "PM",
      startDate: "2024.10",
      endDate: "2024.11",
      status: "완료",
      highlights: [
        "PM 4명 + UI/UX 3명 협업 프로젝트",
        "클라이언트 인터뷰 + 실제 서비스 중인 쇼핑몰 인터뷰",
        "챗봇 사용 경험이 있는 사용자 대상 설문조사",
        "Figma를 활용한 와이어프레임 설계 주도",
        "프로토타입 제작 및 유저 테스트 진행"
      ]
    },
    {
      id: "4",
      title: "개인 블로그 플랫폼",
      description: "Next.js와 TypeScript로 구축한 현대적인 블로그 플랫폼",
      longDescription: "SEO 최적화와 다크모드를 지원하는 개인 블로그 플랫폼입니다. Toast UI Editor를 활용한 마크다운 에디터와 Prism.js를 통한 코드 하이라이팅을 구현했습니다.",
      image: "/api/placeholder/600/400",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      category: "웹 개발",
      githubUrl: "https://github.com/username/blog",
      liveUrl: "https://blog.example.com",
      stars: 45,
      forks: 12,
      startDate: "2024.01",
      endDate: "2024.03",
      status: "완료",
      highlights: [
        "Toast UI Editor 통합으로 풍부한 텍스트 편집 기능",
        "Prism.js를 활용한 다양한 언어 코드 하이라이팅",
        "목차 자동 생성 및 스크롤 동기화",
        "반응형 디자인과 다크모드 지원"
      ]
    },
    {
      id: "5",
      title: "실시간 채팅 애플리케이션",
      description: "Socket.io를 활용한 실시간 채팅 서비스",
      longDescription: "WebSocket을 기반으로 한 실시간 채팅 애플리케이션입니다. 다중 채팅방, 파일 공유, 온라인 상태 표시 등의 기능을 구현했습니다.",
      image: "/api/placeholder/600/400",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      category: "웹 개발",
      githubUrl: "https://github.com/username/chat-app",
      stars: 78,
      forks: 23,
      startDate: "2023.09",
      endDate: "2023.12",
      status: "완료",
      highlights: [
        "Socket.io를 활용한 실시간 양방향 통신",
        "JWT 기반 사용자 인증 시스템",
        "파일 업로드 및 이미지 미리보기",
        "사용자 온라인 상태 실시간 업데이트"
      ]
    },
    {
      id: "6",
      title: "할일 관리 PWA",
      description: "오프라인 지원하는 프로그레시브 웹 앱",
      longDescription: "서비스 워커를 활용한 오프라인 지원과 푸시 알림을 제공하는 할일 관리 애플리케이션입니다.",
      image: "/api/placeholder/600/400",
      tags: ["PWA", "Service Worker", "IndexedDB", "Push API"],
      category: "모바일",
      githubUrl: "https://github.com/username/todo-pwa",
      liveUrl: "https://todo.example.com",
      stars: 34,
      forks: 8,
      startDate: "2023.06",
      status: "진행중",
      highlights: [
        "오프라인에서도 완전한 기능 사용 가능",
        "웹 푸시 알림으로 할일 리마인더",
        "앱처럼 설치 가능한 PWA",
        "IndexedDB를 활용한 로컬 데이터 저장"
      ]
    },
    {
      id: "7",
      title: "AI 이미지 분석 도구",
      description: "TensorFlow.js를 활용한 클라이언트 사이드 이미지 분석",
      longDescription: "브라우저에서 직접 실행되는 머신러닝 모델을 활용한 이미지 분석 도구입니다.",
      image: "/api/placeholder/600/400",
      tags: ["TensorFlow.js", "Machine Learning", "Computer Vision"],
      category: "AI/ML",
      githubUrl: "https://github.com/username/ai-image-tool",
      stars: 156,
      forks: 42,
      startDate: "2023.03",
      endDate: "2023.08",
      status: "완료",
      highlights: [
        "클라이언트 사이드에서 실행되는 ML 모델",
        "실시간 이미지 객체 탐지",
        "드래그앤드롭 이미지 업로드",
        "결과 데이터 JSON/CSV 내보내기"
      ]
    }
  ];

  const categories = ["전체", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === "전체" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "진행중": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "중단": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            프로젝트
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            개발한 주요 프로젝트들을 소개합니다. 각 프로젝트의 기술 스택과 주요 특징을 확인해보세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 text-white/60 mr-4">
            <Filter size={16} />
            <span className="text-sm">필터:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#6ee7b7] text-black"
                    : "bg-[#2c313a] text-white/70 hover:text-white border border-[#3a404d] hover:border-[#6ee7b7]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="bg-[#2c313a] rounded-xl overflow-hidden border border-[#3a404d] hover:border-[#6ee7b7]/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#6ee7b7] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-[#3a404d] hover:bg-[#4a505c] transition-colors"
                      >
                        <Github size={16} className="text-white/70" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-[#3a404d] hover:bg-[#4a505c] transition-colors"
                      >
                        <ExternalLink size={16} className="text-white/70" />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-white/70 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{project.startDate} - {project.endDate || "진행중"}</span>
                  </div>
                  {project.stars && (
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks && (
                    <div className="flex items-center gap-1">
                      <GitFork size={14} />
                      <span>{project.forks}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full text-white/80 border border-[#6ee7b7]/30"
                      style={{ backgroundColor: `${COLORS.primary}20` }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-white/50">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 프로젝트 상세 모달 */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a1f2e] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                  <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">주요 특징</h3>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-white/70">
                          <div className="w-1.5 h-1.5 bg-[#6ee7b7] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">기술 스택</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-sm rounded-full text-white/90 border border-[#6ee7b7]/30"
                          style={{ backgroundColor: `${COLORS.primary}30` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#2c313a] hover:bg-[#3a404d] rounded-lg transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-white text-sm">GitHub</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#6ee7b7] hover:bg-[#5dd4a3] text-black rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;