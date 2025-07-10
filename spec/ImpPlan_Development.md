# 개발 측면 개선 제안서 - 개인 기술 블로그 & 취업용 포트폴리오

> 작성일: 2025-07-10  
> 작성자: 개발자

## 📋 개요

본 제안서는 개인 기술 블로그 및 취업용 포트폴리오의 기술적 완성도를 높이기 위한 개발 측면 개선 방향을 제시합니다. 성능 최적화, 코드 품질, 사용자 경험을 중심으로 실무에서 인정받을 수 있는 기술력을 보여주는 것을 목표로 합니다.

---

## 1. /about 페이지 기술적 개선

### 1.1 데이터 구조 개선

#### 현재 문제점
- 하드코딩된 데이터로 유지보수 어려움
- 컴포넌트 내부에 비즈니스 로직과 UI 로직 혼재
- 타입 정의가 컴포넌트 파일 내에 산재

#### 개선 방향

**1) 데이터 레이어 분리**
```typescript
// src/data/profile.ts
export const profileData: ProfileData = {
  personal: {
    name: "함준호",
    title: "Product Manager",
    bio: "...",
    contact: {
      email: "beginal01@gmail.com",
      phone: "010-9215-9984",
      github: "https://github.com/beginal",
      location: "서울 관악구 신림동"
    }
  },
  skills: {
    technical: [
      {
        id: "react",
        name: "React",
        level: 4, // 1-5 scale
        yearsOfExperience: 3,
        projects: ["toptoon-global", "toptoon-jp"],
        achievements: [
          "성능 최적화로 로딩 속도 40% 개선",
          "컴포넌트 라이브러리 구축"
        ]
      }
    ]
  }
};
```

**2) 커스텀 훅으로 로직 분리**
```typescript
// src/hooks/useProfile.ts
export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 향후 API 연동 대비
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, []);
  
  return { profile, loading };
};
```

### 1.2 성능 최적화

**1) 이미지 최적화**
```typescript
// 프로필 이미지 컴포넌트
const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      quality={90}
      placeholder="blur"
      blurDataURL={generateBlurDataURL()}
      className="rounded-full"
    />
  );
};
```

**2) 컴포넌트 지연 로딩**
```typescript
// 무거운 프로젝트 섹션 지연 로딩
const ProjectSection = dynamic(
  () => import('@/components/sections/ProjectSection'),
  {
    loading: () => <ProjectSectionSkeleton />,
    ssr: true
  }
);
```

### 1.3 접근성 개선

```typescript
// 접근성이 개선된 스킬 레벨 표시
const SkillLevel = ({ skill, level, maxLevel = 5 }: SkillLevelProps) => {
  return (
    <div role="img" aria-label={`${skill} 숙련도: ${level}/${maxLevel}`}>
      <span className="sr-only">{skill} 숙련도</span>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: maxLevel }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i < level ? "bg-primary" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
};
```

---

## 2. 전체 프로젝트 아키텍처 개선

### 2.1 폴더 구조 재정립

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── common/            # 공통 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   │   ├── about/
│   │   ├── blog/
│   │   └── projects/
│   └── ui/                # 기본 UI 컴포넌트
├── lib/
│   ├── api/              # API 클라이언트
│   ├── hooks/            # 커스텀 훅
│   ├── utils/            # 유틸리티 함수
│   └── validations/      # 검증 로직
├── types/                # TypeScript 타입
├── data/                 # 정적 데이터
└── styles/               # 글로벌 스타일
```

### 2.2 타입 시스템 강화

**1) 엄격한 타입 정의**
```typescript
// types/profile.ts
export interface ProfileData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  category: SkillCategory;
  level: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience: number;
  lastUsed: Date;
  projects: string[];
  achievements: string[];
}

// Branded Types for ID
export type SkillId = string & { readonly brand: unique symbol };
export type ProjectId = string & { readonly brand: unique symbol };
```

**2) 타입 가드 활용**
```typescript
// Type guards
export const isValidSkillLevel = (level: number): level is SkillLevel => {
  return level >= 1 && level <= 5;
};

export const hasRequiredSkills = (
  project: Project,
  skills: SkillId[]
): boolean => {
  return project.requiredSkills.every(skill => 
    skills.includes(skill as SkillId)
  );
};
```

### 2.3 API 레이어 개선

**1) API 클라이언트 구축**
```typescript
// lib/api/client.ts
class APIClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    this.timeout = 10000;
  }

  async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new APIError(response.status, await response.text());
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const apiClient = new APIClient();
```

---

## 3. 성능 최적화 전략

### 3.1 번들 크기 최적화

**1) 코드 스플리팅 전략**
```typescript
// 라우트별 자동 코드 스플리팅
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<BlogLayoutSkeleton />}>
      {children}
    </Suspense>
  );
}
```

**2) Tree Shaking 최적화**
```typescript
// 아이콘 개별 임포트
import { Github } from 'lucide-react';
// 대신
import * as Icons from 'lucide-react'; // X
```

### 3.2 런타임 성능 최적화

**1) React 최적화**
```typescript
// 메모이제이션 활용
const SkillCard = memo(({ skill }: { skill: Skill }) => {
  const level = useMemo(() => 
    calculateSkillLevel(skill), 
    [skill.yearsOfExperience, skill.lastUsed]
  );
  
  return (
    <div className="skill-card">
      {/* ... */}
    </div>
  );
});

// Virtual Scrolling for long lists
const ProjectList = ({ projects }: { projects: Project[] }) => {
  const rowVirtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <ProjectCard
          key={projects[virtualRow.index].id}
          project={projects[virtualRow.index]}
          style={{
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
        />
      ))}
    </div>
  );
};
```

### 3.3 네트워크 최적화

**1) 데이터 캐싱 전략**
```typescript
// React Query 활용
const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
  });
};

// Optimistic Updates
const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProject,
    onMutate: async (newProject) => {
      await queryClient.cancelQueries(['projects']);
      const previousProjects = queryClient.getQueryData(['projects']);
      
      queryClient.setQueryData(['projects'], (old: Project[]) => 
        old.map(p => p.id === newProject.id ? newProject : p)
      );
      
      return { previousProjects };
    },
  });
};
```

---

## 4. 개발 경험(DX) 개선

### 4.1 개발 도구 설정

**1) ESLint 설정 강화**
```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
];
```

**2) 자동화 스크립트**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "ANALYZE=true next build",
    "prepare": "husky install"
  }
}
```

### 4.2 테스트 전략

**1) 단위 테스트**
```typescript
// __tests__/utils/skillLevel.test.ts
describe('calculateSkillLevel', () => {
  it('should return correct level based on experience', () => {
    expect(calculateSkillLevel({ yearsOfExperience: 1 })).toBe(2);
    expect(calculateSkillLevel({ yearsOfExperience: 3 })).toBe(4);
    expect(calculateSkillLevel({ yearsOfExperience: 5 })).toBe(5);
  });
});
```

**2) 통합 테스트**
```typescript
// __tests__/pages/about.test.tsx
describe('About Page', () => {
  it('should display profile information correctly', async () => {
    render(<AboutPage />);
    
    expect(screen.getByText('함준호')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
    
    // 스킬 섹션 테스트
    const reactSkill = screen.getByLabelText('React 숙련도: 4/5');
    expect(reactSkill).toBeInTheDocument();
  });
});
```

---

## 5. 모니터링 및 분석

### 5.1 성능 모니터링

```typescript
// lib/monitoring/performance.ts
export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // Analytics로 전송
    analytics.track('Page Load Time', {
      duration: pageLoadTime,
      page: window.location.pathname,
    });
  }
};
```

### 5.2 에러 트래킹

```typescript
// lib/monitoring/errorBoundary.tsx
export class ErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Sentry나 다른 에러 트래킹 서비스로 전송
    captureException(error, {
      contexts: {
        react: { componentStack: errorInfo.componentStack },
      },
    });
  }
}
```

---

## 6. 실행 로드맵

### Phase 1: 기반 작업 (1주)
1. 타입 시스템 재정립
2. 폴더 구조 개선
3. ESLint/Prettier 설정

### Phase 2: 핵심 개선 (2-3주)
1. /about 페이지 리팩토링
2. 성능 최적화 적용
3. 테스트 커버리지 확대

### Phase 3: 고도화 (2주)
1. 모니터링 시스템 구축
2. CI/CD 파이프라인 개선
3. 문서화 작업

---

## 결론

기술적 완성도를 높이는 것은 단순히 코드를 개선하는 것이 아니라, 실무에서 요구되는 품질 기준을 충족하는 것입니다. 성능, 유지보수성, 확장성, 테스트 가능성 등 모든 측면에서 프로페셔널한 수준을 보여주어야 합니다.

특히 취업용 포트폴리오에서는 코드 품질이 곧 개발자의 역량을 보여주는 증거가 되므로, 모든 코드가 실무 표준을 따르도록 신경써야 합니다.