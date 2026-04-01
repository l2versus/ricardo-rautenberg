import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatArea } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    slug: string;
    title: string;
    neighborhood: string;
    city: string;
    price: number | null;
    priceOnRequest: boolean;
    type: string;
    status: string;
    area: number | null;
    bedrooms: number | null;
    suites: number | null;
    bathrooms: number | null;
    parkingSpots: number | null;
    images: { url: string; alt: string | null }[];
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

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0];
  const isSold = property.status === "sold" || property.status === "rented";

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:border-gold/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt || property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Sem imagem</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-gold/90 text-background text-xs font-medium border-0"
          >
            {typeLabels[property.type] || property.type}
          </Badge>
          {isSold && (
            <Badge variant="secondary" className="bg-red-600/90 text-white text-xs border-0">
              {statusLabels[property.status]}
            </Badge>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white text-xl font-semibold font-[family-name:var(--font-playfair)]">
            {formatPrice(property.price, property.priceOnRequest)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-foreground font-medium text-base mb-1 line-clamp-1 group-hover:text-gold transition-colors font-[family-name:var(--font-playfair)]">
          {property.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 font-[family-name:var(--font-inter)]">
          {property.neighborhood}, {property.city}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-muted-foreground">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-gold/70" />
              <span className="text-xs font-[family-name:var(--font-inter)]">
                {property.suites ? `${property.bedrooms} (${property.suites} su\u00EDtes)` : property.bedrooms}
              </span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-gold/70" />
              <span className="text-xs font-[family-name:var(--font-inter)]">{property.bathrooms}</span>
            </div>
          )}
          {property.parkingSpots && (
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-gold/70" />
              <span className="text-xs font-[family-name:var(--font-inter)]">{property.parkingSpots}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-gold/70" />
              <span className="text-xs font-[family-name:var(--font-inter)]">{formatArea(property.area)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
