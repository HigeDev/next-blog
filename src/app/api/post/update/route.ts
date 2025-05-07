// app/api/post/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { postId, title, content, image, category, userId } = body;
    console.log(body);

    if (!postId || !title || !content || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        image: image || "DefaultImage.png",
        category: category || "uncategorized",
        slug,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("[POST_UPDATE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
