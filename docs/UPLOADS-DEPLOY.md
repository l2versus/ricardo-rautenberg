## 🖼️ Sistema de Upload de Imagens — Guia de Deploy

### 🚀 Local (Desenvolvimento)

Funciona automaticamente. Arquivos salvos em `/public/uploads/`.

### 🌍 Produção (Vercel/Coolify/VPS)

#### **Opção 1: Vercel Blob Storage (Recomendado)**

```bash
# Configurar no Vercel
vercel env add BLOB_READ_WRITE_TOKEN

# O sistema detecta NODE_ENV=production e usa Blob automaticamente
# Sem ação necessária no app
```

#### **Opção 2: Coolify/VPS com Filesystem Persistente**

**Problema:** Em deploys, `/public/uploads/` não persiste.

**Solução:** Usar volume persistente para uploads.

1. **Criar diretório persistente** (ex: `/data/uploads`)
   ```bash
   mkdir -p /data/uploads
   chmod 755 /data/uploads
   chmod 755 /data
   ```

2. **Configurar no seu deployment** (Coolify):
   - **Volumes:** `/data/uploads:/app/public/uploads`
   - **Variáveis de Ambiente:**
     ```
     UPLOADS_DIR=/data/uploads
     NODE_ENV=production
     ```

3. **Ou na execução local** (teste):
   ```bash
   UPLOADS_DIR=/data/uploads NODE_ENV=production npm run build
   UPLOADS_DIR=/data/uploads npm start
   ```

#### **Opção 3: S3/Object Storage (AWS S3, DigitalOcean Spaces, etc.)**

Futura implementação. Por enquanto use Opção 1 ou 2.

### ✅ Verificando se Funciona

```bash
# 1. Executar script de preparação
node scripts/ensure-uploads-dir.js

# 2. Fazer upload via admin
# Verificar que retorna URL: /api/uploads/1775135200959-4wrlzo.png

# 3. Testar rota GET
curl http://localhost:3000/api/uploads/1775135200959-4wrlzo.png

# Deve retornar a imagem binária (não 404)
```

### 🔧 Troubleshooting

| Erro | Causa | Solução |
|------|-------|---------|
| `404 Not found` | Arquivo não encontrado | Verificar `UPLOADS_DIR` e permissões |
| `permission denied` | Sem permissão de escrita | `chmod 755 /data/uploads` |
| Imagem desaparece após deploy | Volume não configurado | Adicionar volume persistente no Coolify |
| Arquivo muito grande (>10MB) | Limite de tamanho | Aumentar `maxSize` em `storage.ts` |

### 📝 Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `NODE_ENV` | `development` | Se `production`, tenta Blob primeiro |
| `UPLOADS_DIR` | `./public/uploads` | Diretório de uploads |
| `BLOB_READ_WRITE_TOKEN` | — | Token para Vercel Blob (produção) |

### 🏗️ Arquitetura

```
Upload Flow:
┌──────────────────────────┐
│   Admin Seleciona Foto   │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│  uploadFile() em storage │ ← Valida tipo/tamanho
└────────────┬─────────────┘
             ↓
     ┌───────┴────────┐
     ↓                ↓
[PROD]          [DEV]
Blob           Filesystem
  ↓                ↓
Vercel         public/uploads/
  ↓                ↓
blob.url    /api/uploads/[name]
```

Leitura Flow:
```
┌──────────────────────────┐
│  GET /api/uploads/[name] │ ← route.ts
└────────────┬─────────────┘
             ↓
   ┌─────────────────────┐
   │ Resolver UPLOADS_DIR│
   └─────────────┬───────┘
                 ↓
        ┌────────────────┐
        │ fs.readFile()  │
        └─────────┬──────┘
                  ↓
         Retornar binário ✅
```
