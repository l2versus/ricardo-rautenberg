import "dotenv/config";
// Use direct path to generated client
const { PrismaClient } = require("../src/generated/prisma/client.js");
import * as bcrypt from "bcryptjs";

const prisma = new (PrismaClient as any)();

async function main() {
  // Create admin user
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

  // Create site config
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
      heroSubtitle: "Experi\u00EAncia exclusiva em im\u00F3veis de luxo nos melhores bairros da capital paulista",
    },
  });

  // Create sample properties
  const sampleProperties = [
    {
      title: "Cobertura Duplex no Itaim Bibi com Vista Panorâmica",
      slug: "cobertura-duplex-itaim-bibi-vista-panoramica",
      description: "Espetacular cobertura duplex com 450m² de área privativa no coração do Itaim Bibi. Acabamentos de alto nível, piscina privativa no terraço e vista panorâmica da cidade. Living integrado com pé-direito duplo, 4 suítes com closets planejados, home cinema e 6 vagas de garagem.",
      price: 12500000,
      priceOnRequest: false,
      status: "available",
      type: "penthouse",
      purpose: "sale",
      neighborhood: "Itaim Bibi",
      city: "São Paulo",
      state: "SP",
      area: 450,
      usableArea: 380,
      bedrooms: 4,
      suites: 4,
      bathrooms: 6,
      parkingSpots: 6,
      floors: 2,
      amenities: "Piscina,Rooftop,Automação Residencial,Home Cinema,Vista Panorâmica,Varanda Gourmet",
      isFeatured: true,
      isOffMarket: false,
    },
    {
      title: "Apartamento de Luxo nos Jardins com Lazer Completo",
      slug: "apartamento-luxo-jardins-lazer-completo",
      description: "Apartamento sofisticado em um dos endereços mais cobiçados dos Jardins. 280m² com projeto assinado por arquiteto renomado. 3 suítes amplas, living para 3 ambientes, cozinha gourmet integrada e varanda com vista para o verde dos Jardins.",
      price: 8900000,
      priceOnRequest: false,
      status: "available",
      type: "apartment",
      purpose: "sale",
      neighborhood: "Jardim Paulista",
      city: "São Paulo",
      state: "SP",
      area: 280,
      usableArea: 240,
      bedrooms: 3,
      suites: 3,
      bathrooms: 4,
      parkingSpots: 4,
      amenities: "Piscina,Academia,Spa,Salão de Festas,Coworking,Varanda Gourmet",
      isFeatured: true,
      isOffMarket: false,
    },
    {
      title: "Casa em Condomínio Fechado no Morumbi",
      slug: "casa-condominio-fechado-morumbi",
      description: "Residência imponente em condomínio fechado de alto padrão no Morumbi. 600m² de área construída em terreno de 1.000m². 5 suítes, piscina aquecida, quadra de tênis privativa e jardim paisagístico assinado.",
      price: null,
      priceOnRequest: true,
      status: "available",
      type: "house",
      purpose: "sale",
      neighborhood: "Morumbi",
      city: "São Paulo",
      state: "SP",
      area: 1000,
      usableArea: 600,
      bedrooms: 5,
      suites: 5,
      bathrooms: 7,
      parkingSpots: 8,
      amenities: "Piscina,Quadra de Tênis,Churrasqueira Gourmet,Automação Residencial,Adega Climatizada,Car Gallery",
      isFeatured: true,
      isOffMarket: false,
    },
  ];

  for (const prop of sampleProperties) {
    await prisma.property.upsert({
      where: { slug: prop.slug },
      update: {},
      create: prop,
    });
  }

  console.log("Seed completed!");
  console.log("Admin: ricardo@ricardorautenberg.com.br / rautenberg2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
