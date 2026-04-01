import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { NEIGHBORHOODS } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ricardorautenberg.com.br";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/imoveis`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Neighborhood pages
  const neighborhoodPages: MetadataRoute.Sitemap = NEIGHBORHOODS.map((n) => ({
    url: `${baseUrl}/imoveis?bairro=${encodeURIComponent(n)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Property pages (only public ones)
  const properties = await prisma.property.findMany({
    where: { isOffMarket: false },
    select: { slug: true, updatedAt: true },
  });

  const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${baseUrl}/imoveis/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...neighborhoodPages, ...propertyPages];
}
