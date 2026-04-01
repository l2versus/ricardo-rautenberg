"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, LogOut, Eye, Star, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  slug: string;
  neighborhood: string;
  status: string;
  type: string;
  price: number | null;
  priceOnRequest: boolean;
  isFeatured: boolean;
  isOffMarket: boolean;
  createdAt: string;
  images: { url: string }[];
}

const statusLabels: Record<string, string> = {
  available: "Dispon\u00EDvel",
  sold: "Vendido",
  rented: "Alugado",
  negotiating: "Em Negocia\u00E7\u00E3o",
};

const typeLabels: Record<string, string> = {
  apartment: "Apto",
  penthouse: "Cobertura",
  house: "Casa",
  commercial: "Comercial",
  land: "Terreno",
};

export default function AdminImoveisPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const res = await fetch("/api/properties");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setProperties(data.properties || []);
    } catch {
      console.error("Erro ao carregar im\u00F3veis");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Tem certeza que deseja excluir "${title}"?`)) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert("Erro ao excluir im\u00F3vel");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  function formatPrice(price: number | null, onRequest: boolean) {
    if (onRequest || !price) return "Sob Consulta";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Im\u00F3veis</h1>
          <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
            {properties.length} im\u00F3veis cadastrados
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-gold text-background hover:bg-gold-light">
            <Link href="/admin/imoveis/novo">
              <Plus className="w-4 h-4 mr-2" />
              Novo Im\u00F3vel
            </Link>
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground mb-4 font-[family-name:var(--font-inter)]">
            Nenhum im\u00F3vel cadastrado ainda
          </p>
          <Button asChild className="bg-gold text-background hover:bg-gold-light">
            <Link href="/admin/imoveis/novo">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar primeiro im\u00F3vel
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Im\u00F3vel
                  </th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Tipo
                  </th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Bairro
                  </th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Valor
                  </th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Status
                  </th>
                  <th className="text-right p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    A\u00E7\u00F5es
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-secondary overflow-hidden shrink-0">
                          {property.images[0] ? (
                            <Image
                              src={property.images[0].url}
                              alt={property.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              N/A
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{property.title}</p>
                          <div className="flex gap-1 mt-1">
                            {property.isFeatured && (
                              <Star className="w-3 h-3 text-gold fill-gold" />
                            )}
                            {property.isOffMarket && (
                              <EyeOff className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                        {typeLabels[property.type] || property.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                        {property.neighborhood}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium font-[family-name:var(--font-inter)]">
                        {formatPrice(property.price, property.priceOnRequest)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={
                          property.status === "available"
                            ? "border-green-500/30 text-green-400"
                            : property.status === "sold"
                            ? "border-red-500/30 text-red-400"
                            : "border-yellow-500/30 text-yellow-400"
                        }
                      >
                        {statusLabels[property.status] || property.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                          <Link href={`/imoveis/${property.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                          <Link href={`/admin/imoveis/${property.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(property.id, property.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
