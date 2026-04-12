import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

// Resolver caminho absoluto independente de where node está rodando
function getUploadsDir(): string {
  // Tenta múltiplos paths em ordem de preferência
  const possiblePaths = [
    // Produção: Vercel/Coolify com public acessível
    path.join(process.cwd(), "public", "uploads"),
    // Produção: .next/standalone
    path.join(process.cwd(), "..", "public", "uploads"),
    // Fallback: procura a partir do diretório de assets
    path.join(process.cwd(), "dist", "public", "uploads"),
  ];

  return possiblePaths[0]; // Primário, com error handling abaixo
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

  // Segurança: garantir que o caminho está dentro de uploads/
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
