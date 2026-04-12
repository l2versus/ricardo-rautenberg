/**
 * Serviço de armazenamento de mídia
 * Suporta filesystem local (dev) e Vercel Blob (prod)
 */

import { writeFile, mkdir, stat as fsStat } from "fs/promises";
import path from "path";

export type StorageProvider = "local" | "blob";

interface UploadResult {
  url: string;
  fileName: string;
  size: number;
  timestamp: number;
}

const isProduction = process.env.NODE_ENV === "production";

/**
 * Resolver diretório de uploads com fallback em para múltiplos paths
 * Em produção, pode ser customizado via UPLOADS_DIR
 */
function getUploadDir(): string {
  // Se configurado via env (ex: /data/uploads em Coolify), usar isso
  if (process.env.UPLOADS_DIR) {
    return process.env.UPLOADS_DIR;
  }

  // Senão, usar padrão relativo ao app
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
  const { maxSize = 10 * 1024 * 1024, allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"] } = options;

  if (file.size > maxSize) {
    return { valid: false, error: `Arquivo muito grande. Máximo ${maxSize / 1024 / 1024}MB.` };
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
  const safeExt = ["jpg", "jpeg", "png", "webp", "avif", "mp4", "mov", "webm"].includes(ext) ? ext : "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
}

/**
 * Upload para filesystem local (desenvolvimento)
 */
async function uploadToLocal(file: File): Promise<UploadResult> {
  try {
    // Garantir que o diretório existe
    await mkdir(UPLOAD_DIR, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = generateSafeFileName(file.name);
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Salvar arquivo
    await writeFile(filePath, buffer);

    // Verificar que foi criado
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
 * Upload para Vercel Blob (produção)
 * Requer variável de ambiente: BLOB_READ_WRITE_TOKEN
 */
async function uploadToBlob(file: File): Promise<UploadResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN não configurado. Usando fallback para filesystem.");
  }

  try {
    const bytes = await file.arrayBuffer();
    const fileName = generateSafeFileName(file.name);

    // Dynamic import para evitar erro em build quando @vercel/blob não está instalado
    // @ts-ignore - blob pode não estar instalado em dev
    const { put } = await import("@vercel/blob");

    const blob = await put(fileName, file, {
      access: "public",
      token,
    });

    return {
      url: blob.url,
      fileName,
      size: file.size,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[Storage] Erro ao salvar no Vercel Blob:", error);
    // Fallback para filesystem
    console.warn("[Storage] Falling back to local filesystem");
    return uploadToLocal(file);
  }
}

/**
 * Upload genérico que escolhe o provider baseado no ambiente
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  // Validação
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Escolher provider
  const provider = isProduction ? "blob" : "local";

  console.log(`[Storage] Upload iniciado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) via ${provider}`);

  try {
    const result = provider === "blob" ? await uploadToBlob(file) : await uploadToLocal(file);
    console.log(`[Storage] Upload concluído: ${result.fileName} -> ${result.url}`);
    return result;
  } catch (error) {
    console.error(`[Storage] Upload falhou:`, error);
    throw error;
  }
}

/**
 * Delete arquivo (local apenas)
 */
export async function deleteFile(fileName: string): Promise<void> {
  if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
    // Em produção com Blob, não deletamos por enquanto
    return;
  }

  try {
    const { unlink } = await import("fs/promises");
    const filePath = path.join(UPLOAD_DIR, path.basename(fileName));
    await unlink(filePath);
    console.log(`[Storage] Arquivo deletado: ${fileName}`);
  } catch (error) {
    console.warn(`[Storage] Erro ao deletar arquivo: ${fileName}`, error);
  }
}
