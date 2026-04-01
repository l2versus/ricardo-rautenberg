"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { NEIGHBORHOODS, PROPERTY_TYPES } from "@/lib/utils";

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/imoveis?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-3">
      {/* Neighborhood */}
      <select
        value={searchParams.get("bairro") || ""}
        onChange={(e) => updateFilter("bairro", e.target.value)}
        className="bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-[family-name:var(--font-inter)] focus:border-gold/50 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Todos os bairros</option>
        {NEIGHBORHOODS.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        value={searchParams.get("tipo") || ""}
        onChange={(e) => updateFilter("tipo", e.target.value)}
        className="bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-[family-name:var(--font-inter)] focus:border-gold/50 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Todos os tipos</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Purpose */}
      <select
        value={searchParams.get("finalidade") || ""}
        onChange={(e) => updateFilter("finalidade", e.target.value)}
        className="bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-[family-name:var(--font-inter)] focus:border-gold/50 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Venda e Aluguel</option>
        <option value="sale">Venda</option>
        <option value="rent">Aluguel</option>
      </select>

      {/* Bedrooms */}
      <select
        value={searchParams.get("quartos") || ""}
        onChange={(e) => updateFilter("quartos", e.target.value)}
        className="bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground font-[family-name:var(--font-inter)] focus:border-gold/50 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Quartos</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
      </select>

      {/* Clear */}
      {searchParams.toString() && (
        <button
          onClick={() => router.push("/imoveis")}
          className="px-4 py-2.5 text-sm text-gold hover:text-gold-light transition-colors font-[family-name:var(--font-inter)]"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
