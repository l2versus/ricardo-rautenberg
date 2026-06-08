import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import type { Stats } from "fs";
import path from "path";

// Diretórios dentro de /public que podem conter vídeos servíveis.
// "media" é o volume persistente (vídeos enviados, ex.: tour-video.mp4);
// "images" guarda vídeos embutidos na imagem do build (ex.: hero-video.mp4).
const VIDEO_DIRS = ["media", "images"] as const;

async function resolveVideoPath(
  name: string
): Promise<{ filePath: string; fileStat: Stats } | null> {
  for (const dir of VIDEO_DIRS) {
    const filePath = path.join(process.cwd(), "public", dir, name);
    try {
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) return { filePath, fileStat };
    } catch {
      // arquivo não está neste diretório — tenta o próximo
    }
  }
  return null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  // Only allow mp4 files
  if (!name.endsWith(".mp4")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const safeName = path.basename(name);
  const resolved = await resolveVideoPath(safeName);

  if (!resolved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { filePath, fileStat } = resolved;
  const range = req.headers.get("range");

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
    const chunkSize = end - start + 1;

    const { createReadStream } = await import("fs");
    const stream = createReadStream(filePath, { start, end });
    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
      cancel() {
        stream.destroy();
      },
    });

    return new Response(readable, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const file = await readFile(filePath);
  return new Response(file, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(fileStat.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
