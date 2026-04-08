import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!property) {
    return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
  }

  return NextResponse.json(property);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const property = await prisma.property.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.title ? slugify(body.title) : undefined,
      description: body.description,
      price: body.price !== undefined ? (body.price ? parseFloat(body.price) : null) : undefined,
      priceOnRequest: body.priceOnRequest,
      status: body.status,
      type: body.type,
      purpose: body.purpose,
      neighborhood: body.neighborhood,
      address: body.address,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      area: body.area !== undefined ? (body.area ? parseFloat(body.area) : null) : undefined,
      usableArea: body.usableArea !== undefined ? (body.usableArea ? parseFloat(body.usableArea) : null) : undefined,
      bedrooms: body.bedrooms !== undefined ? (body.bedrooms ? parseInt(body.bedrooms) : null) : undefined,
      suites: body.suites !== undefined ? (body.suites ? parseInt(body.suites) : null) : undefined,
      bathrooms: body.bathrooms !== undefined ? (body.bathrooms ? parseInt(body.bathrooms) : null) : undefined,
      parkingSpots: body.parkingSpots !== undefined ? (body.parkingSpots ? parseInt(body.parkingSpots) : null) : undefined,
      floors: body.floors !== undefined ? (body.floors ? parseInt(body.floors) : null) : undefined,
      amenities: body.amenities,
      videoUrl: body.videoUrl,
      isOffMarket: body.isOffMarket,
      isFeatured: body.isFeatured,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
    },
    include: { images: true },
  });

  // Update images if provided
  if (body.images) {
    await prisma.propertyImage.deleteMany({ where: { propertyId: id } });
    await prisma.propertyImage.createMany({
      data: body.images.map((img: { url: string; alt?: string }, i: number) => ({
        url: img.url,
        alt: img.alt || null,
        order: i,
        propertyId: id,
      })),
    });
  }

  return NextResponse.json(property);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.property.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
