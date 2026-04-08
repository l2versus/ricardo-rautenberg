"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PropertyForm } from "../form";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function EditarImovelPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<{ title?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/properties/${params.id}`);
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (res.status === 404) {
          router.push("/admin/imoveis");
          return;
        }
        const data = await res.json();
        setProperty(data);
      } catch {
        router.push("/admin/imoveis");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground font-body text-sm">Carregando...</p>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div>
      <HeroGeometric
        badge="Editando Imóvel"
        title1="Editar"
        title2={property.title?.split(" ").slice(0, 3).join(" ") || "Imóvel"}
        description="Atualize as informações do imóvel abaixo."
        showLogo={false}
        compact
        className="!min-h-[35vh]"
      />
      <div className="relative -mt-16 z-10">
        <PropertyForm initialData={property as never} />
      </div>
    </div>
  );
}
