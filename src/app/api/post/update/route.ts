import { NextResponse } from "next/server";
import { Readable } from "stream";
import busboy from "busboy";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

function requestToNodeStream(request: Request): Readable {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("No readable body");

  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });
}

export async function PUT(req: Request) {
  try {
    const headers = Object.fromEntries(req.headers.entries());
    const bb = busboy({ headers });
    const stream = requestToNodeStream(req);

    const fields: Record<string, any> = {};
    let fileBuffer: Buffer | null = null;
    let fileInfo: { filename: string; mimeType: string } | null = null;

    return await new Promise<Response>((resolve, reject) => {
      bb.on("field", (name, val) => {
        fields[name] = val;
      });

      bb.on("file", (name, file, info) => {
        const chunks: Buffer[] = [];
        fileInfo = {
          filename: info.filename,
          mimeType: info.mimeType,
        };
        file.on("data", (data) => chunks.push(data));
        file.on("end", () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      bb.on("finish", async () => {
        const { postId, title, content, category, userId, image } = fields;

        if (!postId || !title || !content || !userId) {
          return resolve(
            NextResponse.json(
              { message: "Missing required fields" },
              { status: 400 }
            )
          );
        }

        let updatedImage = image;

        if (fileBuffer && fileInfo) {
          const timestamp = Date.now();
          const originalName = fileInfo.filename.replace(/\s+/g, "_");
          updatedImage = `${timestamp}-${originalName}`;

          const filePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            updatedImage
          );
          await fs.writeFile(filePath, fileBuffer);
        }

        const slug = title
          .split(" ")
          .join("-")
          .toLowerCase()
          .replace(/[^a-zA-Z0-9-]/g, "");

        const updatedPost = await prisma.post.update({
          where: { id: parseInt(postId, 10) },
          data: {
            title,
            content,
            category: category || "uncategorized",
            image: updatedImage,
            slug,
          },
        });

        return resolve(NextResponse.json(updatedPost, { status: 200 }));
      });

      bb.on("error", (err) => {
        console.error("[BUSBOY_ERROR]", err);
        return reject(
          NextResponse.json({ message: "Upload failed" }, { status: 500 })
        );
      });

      stream.pipe(bb);
    });
  } catch (error) {
    console.error("[PUT_UPDATE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
