'use client';

import React, { useMemo } from 'react';
import {
  FaReact,
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaGithub,
  FaAws,
  FaFigma,
  FaSlack,
} from 'react-icons/fa';
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
} from 'react-icons/si';

// ============================================================================
// Types
// ============================================================================
interface TechStackProps {
  title: string;
  icon: React.ReactNode;
  data: {
    customIcons: Record<string, string>;
  };
}

type TechCategory =
  | 'frontend'
  | 'stateManagement'
  | 'backend'
  | 'devops'
  | 'design';

interface Tech {
  name: string;
  icon: React.ComponentType<any>;
  category: TechCategory;
  color: string;
}

// ============================================================================
// Sub Components
// ============================================================================

// 커스텀 이미지 아이콘
const CustomIcon = ({
  src,
  alt,
  size = 36,
}: {
  src: string;
  alt: string;
  size?: number;
}) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className="object-contain"
  />
);

// 텍스트 기반 아이콘들
const TextIcon = ({
  text,
  size = 36,
  color = '#000',
  fontSize = 16,
}: {
  text: string;
  size?: number;
  color?: string;
  fontSize?: number;
}) => (
  <div
    className="flex items-center justify-center font-bold"
    style={{
      color,
      fontSize: `${fontSize}px`,
      width: size,
      height: size,
    }}
  >
    {text}
  </div>
);

// 기술 아이콘 (툴팁 포함)
const TechIcon = ({ tech, delay = 0 }: { tech: Tech; delay?: number }) => (
  <div
    className="group relative opacity-0 animate-card-reveal"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-md hover:scale-110 transition-transform duration-200">
      <tech.icon size={28} color={tech.color} />
    </div>
    <div className="absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
      {tech.name}
    </div>
  </div>
);

// 카테고리 섹션
const Category = ({
  name,
  techs,
  delay = 0,
}: {
  name: string;
  techs: Tech[];
  delay?: number;
}) => (
  <div
    className="opacity-0 animate-card-reveal"
    style={{ animationDelay: `${delay}s` }}
  >
    <h3 className="mb-4 text-lg font-semibold text-white/90">{name}</h3>
    <div className="flex flex-wrap gap-[1rem]">
      {techs.map((tech, index) => (
        <TechIcon key={tech.name} tech={tech} delay={delay + index * 0.1} />
      ))}
    </div>
  </div>
);

// ============================================================================
// Main Component
// ============================================================================
const TechStack: React.FC<TechStackProps> & {
  Section: typeof Section;
  Category: typeof Category;
  TechIcon: typeof TechIcon;
} = ({ title, icon, data }) => {
  const { customIcons } = data;

  // 기술 스택 데이터 정의
  const createIcon = (name: string, fallback: React.ComponentType<any>) =>
    customIcons[name]
      ? (props: any) => (
          <CustomIcon
            src={customIcons[name] || ''}
            alt={name}
            size={props.size}
          />
        )
      : fallback;

  const techs: Tech[] = useMemo(() => [
    // Frontend
    { name: 'React', icon: FaReact, category: 'frontend', color: '#61DAFB' },
    {
      name: 'Next.js',
      icon: createIcon('Next.js', SiNextdotjs),
      category: 'frontend',
      color: '#000000',
    },
    {
      name: 'TypeScript',
      icon: createIcon('TypeScript', SiTypescript),
      category: 'frontend',
      color: '#3178C6',
    },
    {
      name: 'JavaScript',
      icon: createIcon('JavaScript', FaJs),
      category: 'frontend',
      color: '#F7DF1E',
    },
    { name: 'HTML5', icon: FaHtml5, category: 'frontend', color: '#E34C26' },
    { name: 'CSS3', icon: FaCss3Alt, category: 'frontend', color: '#1572B6' },
    { name: 'SCSS', icon: FaSass, category: 'frontend', color: '#CC6699' },
    {
      name: 'Tailwind CSS',
      icon: createIcon('Tailwind CSS', SiTailwindcss),
      category: 'frontend',
      color: '#06B6D4',
    },

    // State Management
    {
      name: 'Redux',
      icon: SiRedux,
      category: 'stateManagement',
      color: '#764ABC',
    },
    {
      name: 'Recoil',
      icon: props => <TextIcon text="RC" {...props} fontSize={12} />,
      category: 'stateManagement',
      color: '#3578E5',
    },
    {
      name: 'MobX',
      icon: props => <TextIcon text="MX" {...props} fontSize={10} />,
      category: 'stateManagement',
      color: '#FF6B00',
    },
    {
      name: 'Zustand',
      icon: props => <TextIcon text="Z" {...props} fontSize={20} />,
      category: 'stateManagement',
      color: '#2D3748',
    },
    {
      name: 'React Query',
      icon: props => <TextIcon text="RQ" {...props} fontSize={12} />,
      category: 'stateManagement',
      color: '#FF4154',
    },

    // Backend
    { name: 'Python', icon: FaPython, category: 'backend', color: '#3776AB' },
    {
      name: 'Firebase',
      icon: SiFirebase,
      category: 'backend',
      color: '#FFCA28',
    },
    {
      name: 'Supabase',
      icon: SiSupabase,
      category: 'backend',
      color: '#3ECF8E',
    },

    // DevOps
    { name: 'GitHub', icon: FaGithub, category: 'devops', color: '#181717' },
    { name: 'AWS', icon: FaAws, category: 'devops', color: '#FF9900' },
    { name: 'Vercel', icon: SiVercel, category: 'devops', color: '#000000' },

    // Design
    {
      name: 'Figma',
      icon: createIcon('Figma', FaFigma),
      category: 'design',
      color: '#F24E1E',
    },
    {
      name: 'Photoshop',
      icon: createIcon('Photoshop', SiAdobephotoshop),
      category: 'design',
      color: '#31A8FF',
    },
    { name: 'Notion', icon: SiNotion, category: 'design', color: '#000000' },
    { name: 'Slack', icon: FaSlack, category: 'design', color: '#4A154B' },
  ], [createIcon]);

  const categories = useMemo(() => [
    {
      key: 'frontend',
      name: '프론트엔드',
      techs: techs.filter(t => t.category === 'frontend'),
    },
    {
      key: 'stateManagement',
      name: '상태 관리',
      techs: techs.filter(t => t.category === 'stateManagement'),
    },
    {
      key: 'backend',
      name: '백엔드',
      techs: techs.filter(t => t.category === 'backend'),
    },
    {
      key: 'devops',
      name: '환경 및 배포',
      techs: techs.filter(t => t.category === 'devops'),
    },
    {
      key: 'design',
      name: '디자인 및 협업 도구',
      techs: techs.filter(t => t.category === 'design'),
    },
  ], [techs]);

  return (
    <Section
      title={title}
      icon={icon}
    >
      {categories.map((category, index) => (
        <Category
          key={category.key}
          name={category.name}
          techs={category.techs}
          delay={index * 0.2}
        />
      ))}
    </Section>
  );
};

// ============================================================================
// Layout Components
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
    <div className="space-y-8">{children}</div>
  </section>
);

// Compound Components 할당
TechStack.Section = Section;
TechStack.Category = Category;
TechStack.TechIcon = TechIcon;

export default TechStack;
