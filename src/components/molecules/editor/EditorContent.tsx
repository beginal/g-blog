"use client";

import React, { forwardRef, memo } from "react";
import dynamic from "next/dynamic";
import { Upload } from "lucide-react";
import { uploadImage } from "@/lib/api/auth";
import "@/app/styles/editor-optimized.css";

// TuiEditor 컴포넌트 정의
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
          initialEditType="wysiwyg"
          hideModeSwitch={false}
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: async (blob: Blob | File, callback: (url: string, text?: string) => void) => {
              try {
                const result = await uploadImage(blob as File);
                callback(result.url, "image");
              } catch (error) {
                console.error("Image upload error:", error);
                alert("이미지 업로드에 실패했습니다.");
              }
            },
          }}
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

// EditorContent 컴포넌트
interface EditorContentProps {
  mode: "create" | "edit";
  initialValue?: string;
}

const EditorContent = forwardRef<any, EditorContentProps>(
  ({ mode, initialValue = "" }, ref) => {
    const label = mode === "edit" ? "내용 수정" : "내용 작성";
    
    React.useEffect(() => {
      // 에디터가 로드된 후 초기값이 비어있으면 내용을 지웁니다
      if (ref && typeof ref === 'object' && ref.current && !initialValue) {
        const timer = setTimeout(() => {
          try {
            const editor = ref.current?.getInstance?.();
            if (editor) {
              editor.setMarkdown('');
            }
          } catch (error) {
            console.log('Editor initialization:', error);
          }
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }, [ref, initialValue]);
    
    return (
      <div>
        <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
          <Upload size={16} />
          {label} (마크다운)
        </label>
        <div className="border border-[#4a505c] rounded-lg overflow-hidden">
          <TuiEditor
            ref={ref}
            initialValue={initialValue || ""}
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hideModeSwitch={true}
            placeholder=""
          />
        </div>
      </div>
    );
  }
);

EditorContent.displayName = "EditorContent";

export default EditorContent;