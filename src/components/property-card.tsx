import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Maximize } from "lucide-react";
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

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0];
  const isSold = property.status === "sold" || property.status === "rented";

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="group block overflow-hidden bg-card border border-border/40 hover:border-gold/20 transition-all duration-600"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt || property.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
            <span className="text-muted-foreground/30 text-xs font-body tracking-wider uppercase">Sem imagem</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-gold/90 text-background text-[10px] tracking-[0.15em] uppercase font-body font-medium">
            {typeLabels[property.type] || property.type}
          </span>
          {isSold && (
            <span className="ml-1.5 px-3 py-1 bg-red-600/90 text-white text-[10px] tracking-[0.1em] uppercase font-body">
              {property.status === "sold" ? "Vendido" : "Alugado"}
            </span>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <p className="text-white text-xl font-display font-semibold">
            {formatPrice(property.price, property.priceOnRequest)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-foreground font-display text-[15px] font-medium mb-1 line-clamp-1 group-hover:text-gold transition-colors duration-300">
          {property.title}
        </h3>
        <p className="text-muted-foreground/60 text-xs mb-4 font-body tracking-wide">
          {property.neighborhood}, {property.city}
        </p>

        {/* Features row */}
        <div className="flex items-center gap-4 text-muted-foreground/50">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-gold/50" />
              <span className="text-[11px] font-body">
                {property.suites ? `${property.bedrooms} (${property.suites}s)` : property.bedrooms}
              </span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-gold/50" />
              <span className="text-[11px] font-body">{property.bathrooms}</span>
            </div>
          )}
          {property.parkingSpots && (
            <div className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-gold/50" />
              <span className="text-[11px] font-body">{property.parkingSpots}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Maximize className="w-3.5 h-3.5 text-gold/50" />
              <span className="text-[11px] font-body">{formatArea(property.area)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
