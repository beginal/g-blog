'use client';

import React from 'react';
import { Github, Mail, MapPin, Download } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================
interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin?: string | null;
  bio: string;
}

interface ProfileHeaderProps {
  personalInfo: PersonalInfo;
}

// ============================================================================
// Sub Components
// ============================================================================

// 프로필 아바타
const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6ee7b7] to-[#3b82f6] p-1">
      <div className="w-full h-full rounded-full bg-[#2c313a] flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{initials}</span>
      </div>
    </div>
  );
};

// 애니메이션 이름
const AnimatedName = ({ name }: { name: string }) => (
  <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
    {name.split('').map((letter, index) => (
      <span
        key={index}
        className="letter-interactive"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {letter}
      </span>
    ))}
  </h1>
);

// 직책
const Title = ({ title }: { title: string }) => (
  <p className="text-xl text-[#6ee7b7] mb-4">{title}</p>
);

// 자기소개
const Bio = ({ bio }: { bio: string }) => (
  <p className="max-w-2xl mx-auto mb-6 leading-relaxed text-white/70">{bio}</p>
);

// 연락처 정보
const ContactInfo = ({
  location,
  email,
  phone,
  github,
}: {
  location: string;
  email: string;
  phone: string;
  github: string;
}) => (
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    <div className="flex items-center gap-2 text-white/60">
      <MapPin size={16} />
      <span className="text-sm">{location}</span>
    </div>
    <a
      href={`mailto:${email}`}
      className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
    >
      <Mail size={16} />
      <span className="text-sm">{email}</span>
    </a>
    <a
      href={`tel:${phone}`}
      className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
    >
      <span className="text-sm">{phone}</span>
    </a>
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-white/60 hover:text-[#6ee7b7] transition-colors"
    >
      <Github size={16} />
      <span className="text-sm">GitHub</span>
    </a>
  </div>
);

// 이력서 다운로드 버튼
const ResumeButton = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/함준호_이력서.pdf';
    link.download = '함준호_이력서.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-[#1a1f2e] font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        <Download size={18} />
        <span>이력서 다운로드</span>
      </button>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================
const ProfileHeader: React.FC<ProfileHeaderProps> & {
  Container: typeof Container;
  Avatar: typeof Avatar;
  AnimatedName: typeof AnimatedName;
  Title: typeof Title;
  Bio: typeof Bio;
  ContactInfo: typeof ContactInfo;
  ResumeButton: typeof ResumeButton;
} = ({ personalInfo }) => {
  return (
    <Container>
      <Avatar name={personalInfo.name} />
      <AnimatedName name={personalInfo.name} />
      <Title title={personalInfo.title} />
      <Bio bio={personalInfo.bio} />
      <ContactInfo
        location={personalInfo.location}
        email={personalInfo.email}
        phone={personalInfo.phone}
        github={personalInfo.github}
      />
      <ResumeButton />
    </Container>
  );
};

// ============================================================================
// Layout Components
// ============================================================================

// 컨테이너
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12 text-center">{children}</div>
);

// Compound Components 할당
ProfileHeader.Container = Container;
ProfileHeader.Avatar = Avatar;
ProfileHeader.AnimatedName = AnimatedName;
ProfileHeader.Title = Title;
ProfileHeader.Bio = Bio;
ProfileHeader.ContactInfo = ContactInfo;
ProfileHeader.ResumeButton = ResumeButton;

export default ProfileHeader;
