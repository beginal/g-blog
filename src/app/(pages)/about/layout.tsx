import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "About - 개발자 소개",
  description: "풀스택 개발자의 경력, 기술 스택, 학력 정보를 확인하세요. React, TypeScript, Node.js 전문가입니다.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}