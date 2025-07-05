import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects - 프로젝트 포트폴리오",
  description: "웹 개발, 모바일 앱, AI/ML 프로젝트를 포함한 개발 포트폴리오를 확인하세요. Next.js, React, TypeScript로 구현된 다양한 프로젝트들입니다.",
  path: "/projects",
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}