import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import fs from "fs";
import path from "path";

export async function DELETE(req: Request) {
  const user = await currentUser();

  if (!user?.publicMetadata?.isAdmin) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(user?.publicMetadata?.isAdmin);

  try {
    const data = await req.json();
    const { postId, postImg } = data;

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    // Hapus file gambar jika ada
    if (postImg) {
      const filePath = path.join(process.cwd(), "public", "uploads", postImg);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("[FILE_DELETE_ERROR]", err);
        }
      });
    }

    return NextResponse.json(deletedPost, { status: 200 });
  } catch (error) {
    console.error("[POST_DELETE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
