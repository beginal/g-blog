import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { 
  withErrorHandler, 
  successResponse, 
  parseFormData 
} from '@/lib/api-utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { file, error } = await parseFormData(request, 'image');
  if (error) return error;

  // 파일 확장자 추출
  const fileExt = file.name.split(".").pop();
  const fileName = `${nanoid()}.${fileExt}`;
  const filePath = `post-images/test/${fileName}`; // 테스트용 폴더

  // Supabase Storage에 업로드
  const { data, error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: "3600",
    });

  if (uploadError) {
    throw new Error("Failed to upload image");
  }

  // 공개 URL 생성
  const { data: { publicUrl } } = supabase.storage
    .from("blog-images")
    .getPublicUrl(data.path);

  return successResponse({ url: publicUrl });
});