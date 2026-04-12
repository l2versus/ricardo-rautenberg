/**
 * Script para garantir que o diretório de uploads existe
 * Execute antes de rodar o servidor em produção
 *
 * Uso:
 *   node scripts/ensure-uploads-dir.js
 *   UPLOADS_DIR=/data/uploads node scripts/ensure-uploads-dir.js
 */

const fs = require('fs');
const path = require('path');

const uploadsDir = process.env.UPLOADS_DIR || path.join(process.cwd(), 'public', 'uploads');

try {
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.chmodSync(uploadsDir, 0o755);
  console.log(`✅ Diretório de uploads criado/verificado: ${uploadsDir}`);

  // Testar se é possível escrever
  const testFile = path.join(uploadsDir, '.write-test');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log(`✅ Permissões de escrita verificadas`);
} catch (error) {
  console.error(`❌ Erro ao preparar diretório de uploads:`, error.message);
  process.exit(1);
}
