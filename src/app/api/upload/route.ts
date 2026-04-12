import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

function getUploadsDir(): string {
  if (process.env.UPLOADS_DIR) {
    return process.env.UPLOADS_DIR;
  }
  return path.join(process.cwd(), "public", "uploads");
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  const ext = name.split(".").pop()?.toLowerCase() || "";
  const contentType = MIME_TYPES[ext];
  if (!contentType) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const safeName = path.basename(name);
  const uploadsDir = getUploadsDir();
  const filePath = path.join(uploadsDir, safeName);

  // DEBUG TEMPORÁRIO — remove após confirmar o caminho
  console.log(`[Uploads] UPLOADS_DIR env: ${process.env.UPLOADS_DIR}`);
  console.log(`[Uploads] Resolvido: ${uploadsDir}`);
  console.log(`[Uploads] Caminho final: ${filePath}`);

  if (!filePath.startsWith(path.resolve(uploadsDir))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const fileStat = await stat(filePath);
    const file = await readFile(filePath);

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(fileStat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`[Uploads] Arquivo não encontrado: ${filePath}`, error);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}