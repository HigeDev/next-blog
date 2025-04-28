// app/api/post/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, image, category, userId } = body;

    if (!title || !content || !userId) {
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

    const post = await prisma.post.create({
      data: {
        title,
        content,
        image:
          image ||
          "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
        category: category || "uncategorized",
        slug,
        userId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[POST_CREATE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
