-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL,
    "priceOnRequest" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'available',
    "type" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT 'sale',
    "neighborhood" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL DEFAULT 'São Paulo',
    "state" TEXT NOT NULL DEFAULT 'SP',
    "zipCode" TEXT,
    "area" REAL,
    "usableArea" REAL,
    "bedrooms" INTEGER,
    "suites" INTEGER,
    "bathrooms" INTEGER,
    "parkingSpots" INTEGER,
    "floors" INTEGER,
    "amenities" TEXT,
    "videoUrl" TEXT,
    "isOffMarket" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "propertyId" TEXT NOT NULL,
    CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "phone" TEXT NOT NULL DEFAULT '+5511999999999',
    "whatsapp" TEXT NOT NULL DEFAULT '+5511999999999',
    "instagram" TEXT NOT NULL DEFAULT 'ricardo_rautenberg',
    "email" TEXT NOT NULL DEFAULT 'contato@ricardorautenberg.com.br',
    "aboutText" TEXT NOT NULL DEFAULT '',
    "heroTitle" TEXT NOT NULL DEFAULT 'Imóveis de Alto Padrão em São Paulo',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Experiência exclusiva em imóveis de luxo nos melhores bairros da capital paulista'
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "PropertyImage_propertyId_idx" ON "PropertyImage"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
