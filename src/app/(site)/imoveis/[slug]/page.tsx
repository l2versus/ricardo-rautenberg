import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatArea, getWhatsAppLink } from "@/lib/utils";
import { PropertyGallery } from "./gallery";
import {
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  Phone,
  ArrowLeft,
  Building2,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProperty(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Im\u00F3vel n\u00E3o encontrado" };

  const noIndex = property.isOffMarket;

  return {
    title: property.metaTitle || property.title,
    description:
      property.metaDescription ||
      `${property.title} em ${property.neighborhood}, S\u00E3o Paulo. ${property.bedrooms ? `${property.bedrooms} quartos` : ""} ${property.area ? `${property.area}m\u00B2` : ""}. Ricardo Rautenberg - CRECI SP 299919.`,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: property.title,
      description: `Im\u00F3vel de alto padr\u00E3o em ${property.neighborhood}, SP`,
      images: property.images[0]
        ? [{ url: property.images[0].url, width: 1200, height: 630 }]
        : undefined,
    },
  };
}

const typeLabels: Record<string, string> = {
  apartment: "Apartamento",
  penthouse: "Cobertura",
  house: "Casa",
  commercial: "Comercial",
  land: "Terreno",
};

const statusLabels: Record<string, string> = {
  available: "Dispon\u00EDvel",
  sold: "Vendido",
  rented: "Alugado",
  negotiating: "Em Negocia\u00E7\u00E3o",
};

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  const whatsappMessage = `Ol\u00E1 Ricardo, tenho interesse no im\u00F3vel: ${property.title} (${property.neighborhood}). Podemos conversar?`;
  const whatsappLink = getWhatsAppLink(
    process.env.NEXT_PUBLIC_WHATSAPP || "+5511999999999",
    whatsappMessage
  );

  const amenities = property.amenities ? property.amenities.split(",").map((a) => a.trim()) : [];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Link
          href="/imoveis"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6 font-[family-name:var(--font-inter)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos im&oacute;veis
        </Link>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-gold/10 text-gold border-gold/20">
                  {typeLabels[property.type] || property.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    property.status === "available"
                      ? "border-green-500/30 text-green-400"
                      : "border-red-500/30 text-red-400"
                  }
                >
                  {statusLabels[property.status]}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground font-[family-name:var(--font-inter)]">
                <MapPin className="w-4 h-4 text-gold" />
                <span>
                  {property.address ? `${property.address}, ` : ""}
                  {property.neighborhood}, {property.city} - {property.state}
                </span>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.area && (
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <Maximize className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-lg font-semibold">{formatArea(property.area)}</p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">\u00C1rea Total</p>
                </div>
              )}
              {property.bedrooms && (
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <Bed className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-lg font-semibold">{property.bedrooms}</p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                    {property.suites ? `Quartos (${property.suites} su\u00EDtes)` : "Quartos"}
                  </p>
                </div>
              )}
              {property.bathrooms && (
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <Bath className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-lg font-semibold">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">Banheiros</p>
                </div>
              )}
              {property.parkingSpots && (
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <Car className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-lg font-semibold">{property.parkingSpots}</p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">Vagas</p>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Descri&ccedil;&atilde;o</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line font-[family-name:var(--font-inter)]">
                  {property.description}
                </div>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-muted-foreground font-[family-name:var(--font-inter)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold/70 shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-4">
              {property.usableArea && (
                <div className="flex items-center gap-3 text-sm font-[family-name:var(--font-inter)]">
                  <Layers className="w-4 h-4 text-gold/70" />
                  <span className="text-muted-foreground">\u00C1rea \u00FAtil: {formatArea(property.usableArea)}</span>
                </div>
              )}
              {property.floors && (
                <div className="flex items-center gap-3 text-sm font-[family-name:var(--font-inter)]">
                  <Building2 className="w-4 h-4 text-gold/70" />
                  <span className="text-muted-foreground">{property.floors} andares</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border border-border rounded-lg p-6 space-y-6">
              {/* Price */}
              <div>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  {property.purpose === "rent" ? "Aluguel" : "Valor"}
                </p>
                <p className="text-3xl font-bold text-gold mt-1">
                  {formatPrice(property.price, property.priceOnRequest)}
                </p>
              </div>

              <Separator className="bg-border" />

              {/* Agent */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold font-bold text-lg font-[family-name:var(--font-playfair)]">
                    RR
                  </span>
                </div>
                <div>
                  <p className="font-semibold">Ricardo Rautenberg</p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                    CRECI SP - 299919
                  </p>
                </div>
              </div>

              {/* Actions */}
              <Button
                asChild
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-6 text-base"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  Conversar no WhatsApp
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-gold/30 text-gold hover:bg-gold/10 py-6"
              >
                <a href="tel:+5511999999999">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar agora
                </a>
              </Button>

              <p className="text-xs text-center text-muted-foreground font-[family-name:var(--font-inter)]">
                Atendimento personalizado e discreto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
