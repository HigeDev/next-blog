// /app/api/upload/route.ts
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const timestamp = Date.now(); // ambil waktu saat ini (dalam milidetik)
  const originalName = file.name.replace(/\s+/g, "_"); // hilangkan spasi (opsional)
  const fileName = `${timestamp}-${originalName}`;

  const filePath = path.join(process.cwd(), "public", "uploads", fileName);
  await fs.writeFile(filePath, buffer);

  return new Response(JSON.stringify({ url: fileName }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
