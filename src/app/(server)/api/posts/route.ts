import { NextRequest } from "next/server";
import { withErrorHandler, getSupabaseClient, SupabaseQueryBuilder, successResponse, parseAndValidateBody } from "@/lib/api-utils";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { supabase } = await getSupabaseClient(request);
  const queryBuilder = new SupabaseQueryBuilder(supabase, "posts");

  const { data, error } = await queryBuilder.findAll("date", false);

  if (error) {
    throw new Error(error);
  }

  // 데이터 변환: description을 thumbnail으로, 누락된 필드 추가
  const transformedData = data.map(item => ({
    ...item,
    thumbnail: item.description || "",
    description: item.description || "",
  }));

  return successResponse(transformedData);
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { supabase } = await getSupabaseClient(request);
  const queryBuilder = new SupabaseQueryBuilder(supabase, "posts");

  const { body, error } = await parseAndValidateBody(request, ["title", "content"]);
  if (error) return error;

  const { title, content, tags, thumbnail } = body;

  const postData = {
    title,
    content,
    thumbnail: thumbnail || "",
    tags: Array.isArray(tags) ? tags : [],
    created_at: new Date().toISOString().split("T")[0],
  };

  const { data, error: createError } = await queryBuilder.create(postData);

  if (createError) {
    throw new Error(createError.message || JSON.stringify(createError));
  }

  return successResponse(data, 201);
});
