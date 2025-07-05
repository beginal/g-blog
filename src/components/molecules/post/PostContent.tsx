"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, memo, forwardRef } from "react";
import "../../../app/styles/editor-optimized.css";

// 최적화된 Toast UI Viewer 로딩
const WrapperViewer = dynamic(
  async () => {
    const [{ Viewer }, codeSyntaxHighlight, prism] = await Promise.all([
      import("@toast-ui/react-editor"),
      import("@toast-ui/editor-plugin-code-syntax-highlight"),
      import("prismjs"),
    ]);

    // Prism 언어 지원 추가 (안전한 로딩)
    try {
      await Promise.all([
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-javascript").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-typescript").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-jsx").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-tsx").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-json").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-css").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-python").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-bash").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-sql").catch(() => null),
        // @ts-expect-error - prism components에 타입 선언이 없음
        import("prismjs/components/prism-yaml").catch(() => null),
      ]);
    } catch (error) {
      console.warn("일부 Prism 언어 컴포넌트 로딩에 실패했습니다:", error);
    }

    const ViewerComponent = memo(
      forwardRef<any, any>((props, ref) => (
        <Viewer
          {...props}
          ref={ref}
          theme="dark"
          plugins={[[codeSyntaxHighlight.default, { highlighter: prism }]]}
          usageStatistics={false}
          useCommandShortcut={true}
        />
      ))
    );

    ViewerComponent.displayName = "TuiViewerComponent";
    return ViewerComponent;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8 min-h-[200px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ee7b7]"></div>
          <p className="text-sm text-white/60">콘텐츠 로딩 중...</p>
        </div>
      </div>
    ),
  }
);

interface PostContentProps {
  initialValue: string;
}

const PostContent = memo(({ initialValue }: PostContentProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // WrapperViewer에서 언어 로드가 완료되면 ready 상태로 변경
    setIsReady(true);
  }, []);

  // Toast UI Editor가 렌더링된 후 헤더에 ID 추가
  useEffect(() => {
    if (!isReady) return;

    const addHeaderIds = () => {
      const container = document.querySelector(".toast-ui-viewer");
      if (!container) return;

      const headers = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headers.forEach((header, index) => {
        if (!header.id) {
          header.id = `heading-${index}`;
          // console.log(`PostContent: Added ID "${header.id}" to header: "${header.textContent}"`);
        }
      });
    };

    // 여러 번 시도하여 확실하게 ID 추가
    const timeouts = [100, 500, 1000, 2000];
    timeouts.forEach(delay => {
      setTimeout(addHeaderIds, delay);
    });

    // MutationObserver로 동적 변경 감지
    const observer = new MutationObserver(mutations => {
      // 새로운 노드가 추가되었는지 확인
      const hasNewContent = mutations.some(mutation => mutation.addedNodes.length > 0);

      if (hasNewContent) {
        setTimeout(addHeaderIds, 100);
      }
    });

    // 여러 컨테이너 선택자 시도
    const containerSelectors = [".toast-ui-viewer", ".toastui-editor-contents", ".toastui-editor-viewer", ".ProseMirror"];

    let container = null;
    for (const selector of containerSelectors) {
      container = document.querySelector(selector);
      if (container) break;
    }

    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [isReady]);

  if (!isReady) {
    return (
      <article className="bg-[#2c313a] rounded-2xl p-8 sm:p-8 border border-[#3a404d] shadow-lg">
        <div className="max-w-none toast-ui-viewer animate-pulse">
          <div className="space-y-4">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-32 bg-gray-700 rounded"></div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-[#2c313a] rounded-2xl p-8 sm:p-8 border border-[#3a404d] shadow-lg">
      <div className="max-w-none toast-ui-viewer">
        <WrapperViewer initialValue={initialValue} />
      </div>
    </article>
  );
});

PostContent.displayName = "PostContent";

export default PostContent;
