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
    const loadPrismLanguages = async () => {
      try {
      } catch (error) {
        console.warn("Prism 언어 로드 실패:", error);
      } finally {
        setIsReady(true);
      }
    };

    loadPrismLanguages();
  }, []);

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