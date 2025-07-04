"use client";

import React from "react";
import PostEditor from "@/components/PostEditor";

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageParams) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  return <PostEditor mode="edit" postId={id} />;
}