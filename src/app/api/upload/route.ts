import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const results = [];

    for (const file of files) {
      const uploadResult = await uploadFile(file);
      results.push(uploadResult);
    }

    const urls = results.map((r) => r.url);
    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao fazer upload";
    console.error("[API Upload] Erro:", message, error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
