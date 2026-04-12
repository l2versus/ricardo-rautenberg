/**
 * Serviço de armazenamento de mídia
 * Filesystem local com volume persistente (Coolify)
 */

import { writeFile, mkdir, stat as fsStat } from "fs/promises";
import path from "path";

export type StorageProvider = "local";

interface UploadResult {
  url: string;
  fileName: string;
  size: number;
  timestamp: number;
}

/**
 * Resolver diretório de uploads
 * Em produção, customizado via UPLOADS_DIR (ex: /data/uploads em Coolify)
 */
function getUploadDir(): string {
  if (process.env.UPLOADS_DIR) {
    return process.env.UPLOADS_DIR;
  }
  return path.join(process.cwd(), "public", "uploads");
}

const UPLOAD_DIR = getUploadDir();

/**
 * Valida o arquivo antes do upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
  } = {}
) {
  const {
    maxSize = 10 * 1024 * 1024,
    allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"],
  } = options;

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Arquivo muito grande. Máximo ${maxSize / 1024 / 1024}MB.`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Tipo não permitido: ${file.type}` };
  }

  return { valid: true };
}

/**
 * Gera nome seguro para arquivo
 */
export function generateSafeFileName(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "avif",
    "mp4",
    "mov",
    "webm",
  ].includes(ext)
    ? ext
    : "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
}

/**
 * Upload para filesystem local
 */
async function uploadToLocal(file: File): Promise<UploadResult> {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = generateSafeFileName(file.name);
    const filePath = path.join(UPLOAD_DIR, fileName);

    await writeFile(filePath, buffer);

    const fileStat = await fsStat(filePath);

    return {
      url: `/api/uploads/${fileName}`,
      fileName,
      size: fileStat.size,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[Storage] Erro ao salvar arquivo local:", error);
    throw new Error("Falha ao salvar arquivo no servidor");
  }
}

/**
 * Upload genérico — sempre local com volume persistente
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  console.log(
    `[Storage] Upload iniciado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) via local`
  );
  console.log(`[Storage] UPLOAD_DIR: ${UPLOAD_DIR}`);

  try {
    const result = await uploadToLocal(file);
    console.log(`[Storage] Upload concluído: ${result.fileName} -> ${result.url}`);
    return result;
  } catch (error) {
    console.error(`[Storage] Upload falhou:`, error);
    throw error;
  }
}

/**
 * Delete arquivo
 */
export async function deleteFile(fileName: string): Promise<void> {
  try {
    const { unlink } = await import("fs/promises");
    const filePath = path.join(UPLOAD_DIR, path.basename(fileName));
    await unlink(filePath);
    console.log(`[Storage] Arquivo deletado: ${fileName}`);
  } catch (error) {
    console.warn(`[Storage] Erro ao deletar arquivo: ${fileName}`, error);
  }
}