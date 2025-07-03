import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request, { params }: any) {
  const { id } = params;
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: any) {
  const { id } = params;
  const { title, date, tags, content, quest } = await request.json();

  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      date,
      tags,
      content,
      quest,
    })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Post not found or no changes made" }, { status: 404 });
  }

  return NextResponse.json(data[0]);
}

export async function DELETE(request: Request, { params }: any) {
  const { id } = params;

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
