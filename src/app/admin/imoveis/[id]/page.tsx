"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PropertyForm } from "../form";

export default function EditarImovelPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
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
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!property) return null;

  return <PropertyForm initialData={property} />;
}
