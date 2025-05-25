import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function DELETE(req: Request) {
  try {
    const { fileName } = await req.json();

    if (fileName == "DefaultImage.png") {
      return new Response(
        JSON.stringify({ message: "No file name provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    // Hapus file dari sistem file
    await fs.unlink(filePath);

    return new Response(
      JSON.stringify({ message: "File deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[DELETE_IMAGE_ERROR]", error);

    return new Response(JSON.stringify({ message: "Failed to delete file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { postId } = body;
    console.log(body);

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        image: "DefaultImage.png",
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
