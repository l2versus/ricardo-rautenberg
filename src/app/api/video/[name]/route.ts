import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  // Only allow mp4 files from images directory
  if (!name.endsWith(".mp4")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const safeName = path.basename(name);
  const filePath = path.join(process.cwd(), "public", "images", safeName);

  try {
    const fileStat = await stat(filePath);
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
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
