"use client";

import React from "react";
import { Github, Linkedin, Mail, MapPin, Calendar, Code, Award, BookOpen, ArrowLeft } from "lucide-react";
import { COLORS } from "@/config/constants";
import Link from "next/link";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

const AboutPage = () => {
  const personalInfo = {
    name: "함준호",
    title: "Product Manager",
    location: "서울 관악구 신림동",
    email: "beginal01@gmail.com",
    phone: "+82 010-9215-9984",
    github: "https://github.com/beginal",
    linkedin: undefined,
    bio: "탑코에서 3년간 프론트엔드 개발자로 근무하며 다양한 웹 서비스의 구축과 운영, 성능 개선을 경험했습니다. 실무에서 React, TypeScript 등 다양한 프론트엔드 기술을 활용하여 사용자 경험을 최우선으로 고려한 UI/UX 개발에 집중했습니다. 퇴사 후에는 PM 역량 강화를 목표로 서비스 기획과 프로젝트 관리에 대해 공부하며, 실제로 3차례 사이드 프로젝트를 기획한 경험이 있습니다.",
  };

  const skills: Skill[] = [
    // 개발
    { name: "React", level: 95, category: "개발" },
    { name: "Next.js", level: 90, category: "개발" },
    { name: "TypeScript", level: 90, category: "개발" },
    { name: "Redux", level: 85, category: "개발" },
    { name: "JavaScript", level: 95, category: "개발" },
    { name: "MobX", level: 80, category: "개발" },
    { name: "SCSS", level: 85, category: "개발" },
    
    // PM/디자인
    { name: "Figma", level: 85, category: "PM/디자인" },
    { name: "Webflow", level: 75, category: "PM/디자인" },
    { name: "Notion", level: 90, category: "PM/디자인" },
    { name: "Photoshop", level: 70, category: "PM/디자인" },
    
    // 도구
    { name: "Git", level: 90, category: "도구" },
    { name: "JWT", level: 80, category: "도구" },
    { name: "Axios", level: 85, category: "도구" },
  ];

  const experiences: Experience[] = [
    {
      title: "프론트엔드 개발자",
      company: "탑코 (해외서비스 개발팀)",
      period: "2021.04 - 2023.12",
      description: "사내 어드민 페이지 총괄 개발 및 유지보수를 담당했습니다. JS로 작업된 코드를 TypeScript + React로 대부분 변경하고, TopToon JP 초기 개발 참여 및 유지보수, TopToon Global 개발 참여 및 유지보수를 진행했습니다. 다수의 중요 페이지 기능 구현(SNS 로그인, 결제, 마이페이지, 웹툰 리스트, 웹툰 뷰어)을 담당했습니다.",
      skills: ["React", "TypeScript", "Next.js", "edgio", "결제 시스템"],
    },
    {
      title: "프론트엔드 개발자 인턴",
      company: "Rencar (개발팀)",
      period: "2020.11 - 2020.12",
      description: "Rencar USA 사고 대차 서비스 모바일 페이지를 제작했습니다. Next의 getServerSideProps를 적극 활용해 SSR을 구현하고, MobX 사용으로 Store 전역관리, Atomic Design 패턴을 참고하여 Components 구성, Axios, JWT, react-token을 사용하여 토큰값 유무에 따른 페이지 접근승인을 구현했습니다.",
      skills: ["Next.js", "MobX", "SCSS", "JWT", "Axios"],
    },
  ];

  const skillCategories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 돌아가기 버튼 */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2c313a] hover:bg-[#3a404d] text-white text-sm font-medium rounded-lg transition-colors duration-200 border border-[#3a404d] hover:border-[#6ee7b7]/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{personalInfo.name}</h1>
          <p className="text-xl text-[#6ee7b7] mb-4">{personalInfo.title}</p>
          <p className="text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">{personalInfo.bio}</p>

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
            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
            >
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

          <div className="grid gap-6">
            {skillCategories.map(category => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-white/90 mb-3">{category}</h3>
                <div className="grid gap-3">
                  {skills
                    .filter(skill => skill.category === category)
                    .map(skill => (
                      <div key={skill.name} className="bg-[#2c313a] rounded-lg p-4 border border-[#3a404d]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-[#6ee7b7] text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-[#1a1f2e] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
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

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <p className="text-white/80 font-medium mb-3">{exp.company}</p>
                <p className="text-white/70 mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full text-white/90 border border-[#6ee7b7]/30"
                      style={{ backgroundColor: `${COLORS.primary}20` }}
                    >
                      {skill}
                    </span>
                  ))}
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">PM 부트캠프</h3>
                <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                  <Calendar size={14} />
                  <span>2024.06 - 2024.12</span>
                </div>
              </div>
              <p className="text-white/80 font-medium mb-2">FastCampus</p>
              <p className="text-white/70 leading-relaxed">
                PM 역량 강화를 목표로 서비스 기획과 프로젝트 관리에 대해 체계적으로 학습했습니다. 
                실제로 3차례 사이드 프로젝트를 기획하며 요구사항 정의, 일정 관리, 팀원 간 협업 등 실무에 가까운 기획과 커뮤니케이션 역량을 쌓았습니다.
              </p>
            </div>
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">프론트엔드 개발 부트캠프</h3>
                <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                  <Calendar size={14} />
                  <span>2020.10 - 2020.11</span>
                </div>
              </div>
              <p className="text-white/80 font-medium mb-2">Wecode</p>
              <p className="text-white/70 leading-relaxed">
                프론트엔드 개발에 대한 기초를 다지고 실무 프로젝트를 경험했습니다.
              </p>
            </div>
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">전자상거래과</h3>
                <div className="flex items-center gap-2 text-[#6ee7b7] text-sm">
                  <Calendar size={14} />
                  <span>2011.03 - 2014.02</span>
                </div>
              </div>
              <p className="text-white/80 font-medium mb-2">하남정보산업고등학교</p>
              <p className="text-white/70 leading-relaxed">
                전자상거래 전공으로 졸업했습니다.
              </p>
            </div>
          </div>
        </section>


        {/* PM 프로젝트 섹션 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-[#6ee7b7]" size={24} />
            <h2 className="text-2xl font-bold text-white">PM 프로젝트</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <h3 className="text-xl font-bold text-white mb-2">[PM] 불법 주정차 신고 서비스</h3>
              <p className="text-[#6ee7b7] text-sm mb-3">2024.06 - 2024.08 | PM 4명</p>
              <p className="text-white/70 mb-4 leading-relaxed">
                안전신문고, 서울 스마트 불편신고 등 현재 나와있는 불법 주차 신고 서비스의 불편을 줄이고 신고를 간편하게 하기 위한 서비스를 기획했습니다. 
                조장으로 프로젝트를 진행하며 페인포인트 발견 및 설문을 통한 가설 검증, Figma를 활용한 와이어프레임 설계, webflow를 활용한 랜딩페이지 개발을 주도했습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "Webflow", "Notion", "설문조사", "와이어프레임"].map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full text-white/90 border border-[#6ee7b7]/30"
                    style={{ backgroundColor: `${COLORS.primary}20` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <h3 className="text-xl font-bold text-white mb-2">[PM] 프리랜서 중개 플랫폼 개선</h3>
              <p className="text-[#6ee7b7] text-sm mb-3">2024.09 - 2024.10 | PM 4명</p>
              <p className="text-white/70 mb-4 leading-relaxed">
                프리랜서 채용 중개 플랫폼 원티드 긱스 개선 프로젝트를 진행했습니다. 
                프로젝트 의뢰 플로우를 변경하여 프로젝트의 신뢰성을 높이고, 프리랜서 등록 플로우를 개선하여 개인의 경력을 더 적극적으로 어필할 수 있도록 했습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "사용자 조사", "플로우 개선", "와이어프레임"].map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full text-white/90 border border-[#6ee7b7]/30"
                    style={{ backgroundColor: `${COLORS.primary}20` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-[#2c313a] rounded-xl p-6 border border-[#3a404d]">
              <h3 className="text-xl font-bold text-white mb-2">[PM] 챗봇 서비스 개선</h3>
              <p className="text-[#6ee7b7] text-sm mb-3">2024.10 - 2024.11 | PM 4명 + UI/UX 3명</p>
              <p className="text-white/70 mb-4 leading-relaxed">
                B2B 챗봇 서비스 AI JiHye 개선 프로젝트를 진행했습니다. 
                쇼핑몰 내 사용자가 챗봇을 통해 맞춤형 상품을 추천받을 수 있게 하고, 챗봇 관리자가 챗봇 등록/관리를 더욱 간편하게 할 수 있도록 개선했습니다. 
                클라이언트 인터뷰, 실제 서비스 중인 쇼핑몰 인터뷰, 사용자 설문조사를 통해 가설을 검증하고 프로토타입까지 직접 작업했습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "프로토타입", "유저 테스트", "인터뷰", "설문조사"].map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full text-white/90 border border-[#6ee7b7]/30"
                    style={{ backgroundColor: `${COLORS.primary}20` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
