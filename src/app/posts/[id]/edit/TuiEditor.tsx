"use client";

import dynamic from "next/dynamic";
import { memo, forwardRef } from "react";
import "../../../styles/editor.css";

const TuiEditor = dynamic(
  async () => {
    // 모듈들을 병렬로 로드
    const [{ Editor }, codeSyntaxHighlight, prism] = await Promise.all([
      import("@toast-ui/react-editor"),
      import("@toast-ui/editor-plugin-code-syntax-highlight"),
      import("prismjs"),
    ]);

    const EditorComponent = memo(
      forwardRef<any, any>((props, ref) => (
        <Editor
          {...props}
          ref={ref}
          theme="dark"
          plugins={[[codeSyntaxHighlight.default, { highlighter: prism }]]}
          // 성능 최적화 옵션
          usageStatistics={false}
          hideModeSwitch={false}
          useCommandShortcut={true}
        />
      ))
    );

    EditorComponent.displayName = "TuiEditorComponent";
    return EditorComponent;
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-[#3a404d] rounded-lg animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ee7b7]"></div>
          <p className="text-sm text-white/60">에디터 로딩 중...</p>
        </div>
      </div>
    ),
  }
);

TuiEditor.displayName = "TuiEditor";

export default TuiEditor;
