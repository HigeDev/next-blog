import { NextResponse } from "next/server";
import { Readable } from "stream";
import busboy from "busboy";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

// Nonaktifkan bodyParser bawaan
export const config = {
  api: {
    bodyParser: false,
  },
};

// Konversi Web Request ke Node.js Readable Stream
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

export async function POST(req: Request) {
  try {
    const headers = Object.fromEntries(req.headers.entries());
    const bb = busboy({ headers });

    const stream = requestToNodeStream(req);
    const fields: Record<string, any> = {};
    const uploadedFiles: {
      buffer: Buffer;
      filename: string;
      mimeType: string;
    }[] = [];

    return await new Promise<Response>((resolve, reject) => {
      bb.on("field", (name, val) => {
        fields[name] = val;
      });

      bb.on("file", (name, file, info) => {
        const chunks: Buffer[] = [];
        const { filename, mimeType } = info;

        file.on("data", (data) => {
          chunks.push(data);
        });

        file.on("end", () => {
          const buffer = Buffer.concat(chunks);
          uploadedFiles.push({ buffer, filename, mimeType });
        });
      });

      bb.on("finish", async () => {
        const {
          name,
          description,
          userId,
          linkURL,
          Codeigniter,
          Laravel,
          MySQL,
          Prisma,
          Typescript,
          Javascript,
          Tailwind,
          Bootstrap,
          API,
          NextJS,
          SEO,
          Figma,
          Arduino,
          Rstudio,
          Java,
          AndroidStudio,
          VSCode,
          Git,
          Matlab,
          Flowbite,
          Cisco,
        } = fields;
        console.log(fields);

        if (!name || !description || !userId) {
          return resolve(
            NextResponse.json(
              { message: "Missing required fields" },
              { status: 400 }
            )
          );
        }

        const userIdInt = parseInt(userId, 10);
        const slug = name
          .split(" ")
          .join("-")
          .toLowerCase()
          .replace(/[^a-zA-Z0-9-]/g, "");

        const post = await prisma.project.create({
          data: {
            name,
            description,
            linkUrl: linkURL || "higesan.store",
            slug,
            userId: userIdInt,
          },
        });

        for (const file of uploadedFiles) {
          const timestamp = Date.now();
          const sanitizedFilename = file.filename.replace(/\s+/g, "_");
          const newFileName = `${timestamp}-${sanitizedFilename}`;
          const filePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            newFileName
          );
          await fs.writeFile(filePath, file.buffer);
          await prisma.project_Image.create({
            data: {
              projectId: post.id,
              image: newFileName,
            },
          });
        }

        await prisma.project_Skill.create({
          data: {
            projectId: post.id,
            codeigniter: Codeigniter === "true",
            laravel: Laravel === "true",
            mysql: MySQL === "true",
            prisma: Prisma === "true",
            typescript: Typescript === "true",
            javascript: Javascript === "true",
            tailwind: Tailwind === "true",
            bootstrap: Bootstrap === "true",
            api: API === "true",
            nextjs: NextJS === "true",
            seo: SEO === "true",
            flowbite: Flowbite === "true",
            figma: Figma === "true",
            matlab: Matlab === "true",
            arduino: Arduino === "true",
            rstudio: Rstudio === "true",
            java: Java === "true",
            androidstudio: AndroidStudio === "true",
            vscode: VSCode === "true",
            git: Git === "true",
            cisco: Cisco === "true",
          },
        });

        return resolve(NextResponse.json({ status: 201 }));
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
    console.error("[POST_CREATE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
