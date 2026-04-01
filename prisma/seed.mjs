import "dotenv/config";
import bcrypt from "bcryptjs";

// Dynamic import to handle TS generated files
const mod = await import("../src/generated/prisma/client.ts");
const PrismaClient = mod.PrismaClient;

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("rautenberg2026", 12);

  await prisma.admin.upsert({
    where: { email: "ricardo@ricardorautenberg.com.br" },
    update: {},
    create: {
      email: "ricardo@ricardorautenberg.com.br",
      password: hashedPassword,
      name: "Ricardo Rautenberg",
    },
  });

  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      phone: "+5511999999999",
      whatsapp: "+5511999999999",
      instagram: "ricardo_rautenberg",
      email: "contato@ricardorautenberg.com.br",
      aboutText: "",
      heroTitle: "Im\u00F3veis de Alto Padr\u00E3o em S\u00E3o Paulo",
      heroSubtitle: "Experi\u00EAncia exclusiva",
    },
  });

  const sampleProperties = [
    {
      title: "Cobertura Duplex no Itaim Bibi com Vista Panor\u00E2mica",
      slug: "cobertura-duplex-itaim-bibi-vista-panoramica",
      description: "Espetacular cobertura duplex com 450m\u00B2 no Itaim Bibi. Piscina privativa e vista panor\u00E2mica.",
      price: 12500000, priceOnRequest: false, status: "available", type: "penthouse", purpose: "sale",
      neighborhood: "Itaim Bibi", city: "S\u00E3o Paulo", state: "SP",
      area: 450, usableArea: 380, bedrooms: 4, suites: 4, bathrooms: 6, parkingSpots: 6, floors: 2,
      amenities: "Piscina,Rooftop,Automa\u00E7\u00E3o Residencial,Home Cinema,Vista Panor\u00E2mica",
      isFeatured: true, isOffMarket: false,
    },
    {
      title: "Apartamento de Luxo nos Jardins",
      slug: "apartamento-luxo-jardins-lazer-completo",
      description: "Apartamento sofisticado nos Jardins. 280m\u00B2 com projeto assinado.",
      price: 8900000, priceOnRequest: false, status: "available", type: "apartment", purpose: "sale",
      neighborhood: "Jardim Paulista", city: "S\u00E3o Paulo", state: "SP",
      area: 280, usableArea: 240, bedrooms: 3, suites: 3, bathrooms: 4, parkingSpots: 4,
      amenities: "Piscina,Academia,Spa,Sal\u00E3o de Festas,Varanda Gourmet",
      isFeatured: true, isOffMarket: false,
    },
    {
      title: "Casa em Condom\u00EDnio Fechado no Morumbi",
      slug: "casa-condominio-fechado-morumbi",
      description: "Resid\u00EAncia imponente no Morumbi. 600m\u00B2 em terreno de 1.000m\u00B2.",
      price: null, priceOnRequest: true, status: "available", type: "house", purpose: "sale",
      neighborhood: "Morumbi", city: "S\u00E3o Paulo", state: "SP",
      area: 1000, usableArea: 600, bedrooms: 5, suites: 5, bathrooms: 7, parkingSpots: 8,
      amenities: "Piscina,Quadra de T\u00EAnis,Churrasqueira Gourmet,Car Gallery",
      isFeatured: true, isOffMarket: false,
    },
  ];

  for (const prop of sampleProperties) {
    await prisma.property.upsert({
      where: { slug: prop.slug },
      update: {},
      create: prop,
    });
  }

  console.log("Seed conclu\u00EDdo!");
  console.log("Admin: ricardo@ricardorautenberg.com.br / rautenberg2026");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
