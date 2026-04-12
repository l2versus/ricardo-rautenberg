import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";
import { NEIGHBORHOODS, PROPERTY_TYPES } from "@/lib/utils";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";
import { PropertyFilters } from "./filters";

interface Props {
  searchParams: Promise<{
    bairro?: string;
    tipo?: string;
    finalidade?: string;
    quartos?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: "Im\u00F3veis de Alto Padr\u00E3o",
  description: "Explore nossa seleção exclusiva de imóveis de luxo no ABC Paulista. Coberturas, apartamentos e casas de alto padrão em Santo André, São Bernardo e São Caetano.",
};

async function getProperties(params: {
  bairro?: string;
  tipo?: string;
  finalidade?: string;
  quartos?: string;
  page?: string;
}) {
  // 🚀 MODO DEV LOCAL: Prisma desligado por enquanto
  /*
  const where: Record<string, unknown> = {
    isOffMarket: false,
  };

  if (params.bairro) where.neighborhood = params.bairro;
  if (params.tipo) where.type = params.tipo;
  if (params.finalidade) where.purpose = params.finalidade;
  if (params.quartos) where.bedrooms = { gte: parseInt(params.quartos) };

  const page = parseInt(params.page || "1");
  const perPage = 12;

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.property.count({ where }),
  ]);

  return { properties, total, totalPages: Math.ceil(total / perPage), page };
  */

  return { properties: [], total: 0, totalPages: 0, page: 1 };
}

export default async function ImoveisPage({ searchParams }: Props) {
  const params = await searchParams;
  const { properties, total, totalPages, page } = await getProperties(params);

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
            Portf&oacute;lio
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {params.bairro
              ? `Im\u00F3veis em ${params.bairro}`
              : "Im\u00F3veis de Alto Padr\u00E3o"}
          </h1>
          <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
            {total} {total === 1 ? "im\u00F3vel encontrado" : "im\u00F3veis encontrados"}
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={null}>
          <PropertyFilters />
        </Suspense>

        {/* Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum im&oacute;vel encontrado</h3>
            <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
              Tente ajustar os filtros ou entre em contato para saber sobre oportunidades exclusivas.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/imoveis?${new URLSearchParams({ ...params, page: String(p) }).toString()}`}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm transition-colors ${
                  p === page
                    ? "bg-gold text-background"
                    : "bg-card border border-border text-muted-foreground hover:border-gold/30"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
