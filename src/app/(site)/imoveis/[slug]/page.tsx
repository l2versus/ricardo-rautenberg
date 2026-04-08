import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
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
    <div className="pt-28 sm:pt-36 pb-20 px-4">
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

            <div className="h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                property.area && { icon: Maximize, value: formatArea(property.area), label: "Área Total" },
                property.bedrooms && { icon: Bed, value: String(property.bedrooms), label: property.suites ? `Quartos (${property.suites} suítes)` : "Quartos" },
                property.bathrooms && { icon: Bath, value: String(property.bathrooms), label: "Banheiros" },
                property.parkingSpots && { icon: Car, value: String(property.parkingSpots), label: "Vagas" },
              ].filter(Boolean).map((feat, i) => {
                const F = feat as { icon: typeof Maximize; value: string; label: string };
                return (
                  <div key={i} className="group relative bg-card/50 border border-border/40 hover:border-gold/20 p-5 text-center transition-all duration-500">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/0 group-hover:via-gold/20 to-transparent transition-all duration-500" />
                    <F.icon className="w-5 h-5 text-gold/60 mx-auto mb-3" />
                    <p className="text-xl font-bold font-display">{F.value}</p>
                    <p className="text-[11px] text-muted-foreground/50 font-body mt-1">{F.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-gold/60" />
                  <h2 className="text-lg font-semibold font-display tracking-wider uppercase">{"Descrição"}</h2>
                </div>
                <div className="text-muted-foreground/70 leading-relaxed whitespace-pre-line font-body text-[15px]">
                  {property.description}
                </div>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 bg-gold/60" />
                  <h2 className="text-lg font-semibold font-display tracking-wider uppercase">Comodidades</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground/60 font-body py-2 px-3 bg-card/30 border border-border/20 hover:border-gold/15 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold/50 shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Info */}
            {(property.usableArea || property.floors) && (
              <div className="flex flex-wrap gap-4 py-4 border-t border-border/20">
                {property.usableArea && (
                  <div className="flex items-center gap-2.5 text-sm font-body">
                    <Layers className="w-4 h-4 text-gold/50" />
                    <span className="text-muted-foreground/60">{"Área Útil: "}{formatArea(property.usableArea)}</span>
                  </div>
                )}
                {property.floors && (
                  <div className="flex items-center gap-2.5 text-sm font-body">
                    <Building2 className="w-4 h-4 text-gold/50" />
                    <span className="text-muted-foreground/60">{property.floors} andares</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-border/30 bg-card/30 overflow-hidden">
              {/* Price header */}
              <div className="relative p-6 bg-gradient-to-br from-gold/[0.06] to-transparent">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold/60 to-gold/40" />
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase font-body mb-1">
                  {property.purpose === "rent" ? "Aluguel" : "Valor"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gold font-display">
                  {formatPrice(property.price, property.priceOnRequest)}
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* Agent */}
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="RR"
                    width={44}
                    height={44}
                    className="opacity-70"
                  />
                  <div>
                    <p className="font-semibold text-sm font-display">Ricardo Rautenberg</p>
                    <p className="text-[10px] text-muted-foreground/40 font-body tracking-wider">
                      CRECI SP - 299919
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <Button
                  asChild
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-5 text-sm font-body tracking-wider rounded-none"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 mr-2" />
                    Conversar no WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gold/20 text-gold hover:bg-gold/5 py-5 text-sm font-body tracking-wider rounded-none"
                >
                  <a href="tel:+5511999999999">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar agora
                  </a>
                </Button>

                <p className="text-[10px] text-center text-muted-foreground/30 font-body tracking-wider">
                  Atendimento personalizado e discreto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
