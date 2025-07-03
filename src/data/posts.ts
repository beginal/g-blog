import type { BlogPostProps } from "../types";

const blogPostsData: BlogPostProps[] = [
  {
    id: 1,
    title: "React와 TypeScript로 포트폴리오 만들기",
    date: "25.07.02",
    tags: ["React", "TypeScript", "Portfolio"],
    content: [
      {
        type: "paragraph",
        text: "이 글에서는 React와 TypeScript를 사용하여 처음부터 동적인 개인 포트폴리오 웹사이트를 구축하는 전체 과정을 다룹니다. 컴포넌트 기반 아키텍처의 장점과 정적 타입의 안정성을 경험해보세요.",
      },
      {
        type: "dialogue",
        character: "루루미",
        avatar: "https://placehold.co/100x100/f87171/ffffff?text=Lurumi",
        text: "오늘의 주제는 React 포트폴리오 만들기! 사실 나는 코딩보다 노는 걸 더 좋아하지만... 중요한 질문이니 진지하게 임해야지!",
      },
      {
        type: "paragraph",
        text: "솔직히 말해서, 처음부터 완벽한 포트폴리오를 만드는 건 쉽지 않은 일입니다. 하지만 단계별로 따라 하다 보면, 어느새 멋진 결과물을 만들 수 있을 거예요. 가장 먼저, 프로젝트의 구조를 잡는 것이 중요합니다. `src` 폴더 아래에 `components`, `pages`, `hooks`, `types` 같은 폴더를 만들어 코드를 체계적으로 관리하는 습관을 들이는 것이 좋습니다.",
      },
      {
        type: "dialogue",
        character: "뮤",
        avatar: "https://placehold.co/100x100/60a5fa/ffffff?text=Myu",
        text: '루루미, 핵심을 짚었네. "컴포넌트 재사용" 이야말로 React를 사용하는 가장 중요한 이유 중 하나야. 아인슈타인도 "코드는 세 번 이상 반복되면 함수로 만들어라" 라고 했을 정도지. 물론 진짜 아인슈타인이 한 말은 아니지만, 그만큼 중요한 원칙이라는 뜻이야.',
      },
    ],
    quest: {
      question: "React에서 컴포넌트의 상태를 관리하기 위해 사용하는 기본적인 Hook은 무엇인가요?",
      options: ["useEffect", "useState", "useContext", "useRef"],
      answerIndex: 1,
      xp: 50,
    },
  },
  ...[...Array(19)].map((_, i) => ({
    id: i + 2,
    title: `샘플 게시물 제목 ${i + 2}`,
    date: `25.0${6 - Math.floor(i / 4)}.${28 - (i % 4) * 7}`,
    tags: ["Sample", "Test"],
    content: [
      {
        type: "paragraph" as const,
        text: `이것은 샘플 게시물 ${i + 2}의 내용입니다. 상세 페이지에서 확인하실 수 있습니다.`,
      },
    ],
  })),
];

export const fetchPosts = (): Promise<BlogPostProps[]> => {
  return new Promise(resolve => setTimeout(() => resolve(blogPostsData), 500));
};
