import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 20;

  const properties = await prisma.property.findMany({
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const total = await prisma.property.count();

  return NextResponse.json({ properties, total, totalPages: Math.ceil(total / perPage) });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const slug = slugify(body.title);

  // Check slug uniqueness
  const existing = await prisma.property.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "Já existe um imóvel com título similar" },
      { status: 400 }
    );
  }

  const property = await prisma.property.create({
    data: {
      title: body.title,
      slug,
      description: body.description || "",
      price: body.price ? parseFloat(body.price) : null,
      priceOnRequest: body.priceOnRequest || false,
      status: body.status || "available",
      type: body.type || "apartment",
      purpose: body.purpose || "sale",
      neighborhood: body.neighborhood || "",
      address: body.address || null,
      city: body.city || "ABC Paulista",
      state: body.state || "SP",
      zipCode: body.zipCode || null,
      area: body.area ? parseFloat(body.area) : null,
      usableArea: body.usableArea ? parseFloat(body.usableArea) : null,
      bedrooms: body.bedrooms ? parseInt(body.bedrooms) : null,
      suites: body.suites ? parseInt(body.suites) : null,
      bathrooms: body.bathrooms ? parseInt(body.bathrooms) : null,
      parkingSpots: body.parkingSpots ? parseInt(body.parkingSpots) : null,
      floors: body.floors ? parseInt(body.floors) : null,
      amenities: body.amenities || null,
      videoUrl: body.videoUrl || null,
      isOffMarket: body.isOffMarket || false,
      isFeatured: body.isFeatured || false,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      images: body.images?.length
        ? {
            create: body.images.map((img: { url: string; alt?: string }, i: number) => ({
              url: img.url,
              alt: img.alt || null,
              order: i,
            })),
          }
        : undefined,
    },
    include: { images: true },
  });

  return NextResponse.json(property, { status: 201 });
}
