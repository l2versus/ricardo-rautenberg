"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NEIGHBORHOODS, PROPERTY_TYPES, PROPERTY_STATUS, AMENITIES } from "@/lib/utils";
import { Upload, X, ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    price: number | null;
    priceOnRequest: boolean;
    status: string;
    type: string;
    purpose: string;
    neighborhood: string;
    address: string | null;
    area: number | null;
    usableArea: number | null;
    bedrooms: number | null;
    suites: number | null;
    bathrooms: number | null;
    parkingSpots: number | null;
    floors: number | null;
    amenities: string | null;
    videoUrl: string | null;
    isOffMarket: boolean;
    isFeatured: boolean;
    metaTitle: string | null;
    metaDescription: string | null;
    images: { id: string; url: string; alt: string | null }[];
  };
}

export function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    priceOnRequest: initialData?.priceOnRequest || false,
    status: initialData?.status || "available",
    type: initialData?.type || "apartment",
    purpose: initialData?.purpose || "sale",
    neighborhood: initialData?.neighborhood || "",
    address: initialData?.address || "",
    area: initialData?.area?.toString() || "",
    usableArea: initialData?.usableArea?.toString() || "",
    bedrooms: initialData?.bedrooms?.toString() || "",
    suites: initialData?.suites?.toString() || "",
    bathrooms: initialData?.bathrooms?.toString() || "",
    parkingSpots: initialData?.parkingSpots?.toString() || "",
    floors: initialData?.floors?.toString() || "",
    amenities: initialData?.amenities?.split(",").map((a) => a.trim()) || [],
    videoUrl: initialData?.videoUrl || "",
    isOffMarket: initialData?.isOffMarket || false,
    isFeatured: initialData?.isFeatured || false,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
  });

  const [images, setImages] = useState<{ url: string; alt: string }[]>(
    initialData?.images.map((img) => ({ url: img.url, alt: img.alt || "" })) || []
  );

  function updateForm(key: string, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAmenity(amenity: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("files", f));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.urls) {
        setImages((prev) => [...prev, ...data.urls.map((url: string) => ({ url, alt: "" }))]);
      }
    } catch {
      alert("Erro ao enviar imagens");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.neighborhood) {
      alert("T\u00EDtulo e bairro s\u00E3o obrigat\u00F3rios");
      return;
    }

    setSaving(true);

    const body = {
      ...form,
      amenities: form.amenities.join(", "),
      images,
    };

    try {
      const url = initialData ? `/api/properties/${initialData.id}` : "/api/properties";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin/imoveis");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar");
      }
    } catch {
      alert("Erro de conex\u00E3o");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/imoveis" className="text-muted-foreground hover:text-gold">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">
            {initialData ? "Editar Im\u00F3vel" : "Novo Im\u00F3vel"}
          </h1>
        </div>
        <Button type="submit" disabled={saving} className="bg-gold text-background hover:bg-gold-light">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <section className="bg-card p-6 rounded-lg border border-border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informa\u00E7\u00F5es B\u00E1sicas</h2>

          <div>
            <Label className="font-[family-name:var(--font-inter)]">T\u00EDtulo *</Label>
            <Input
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              placeholder="Cobertura Duplex no Itaim Bibi com Piscina Privativa"
              className="mt-1 bg-background"
              required
            />
          </div>

          <div>
            <Label className="font-[family-name:var(--font-inter)]">Descri\u00E7\u00E3o</Label>
            <Textarea
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              placeholder="Descreva o im\u00F3vel em detalhes..."
              className="mt-1 bg-background min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Tipo</Label>
              <select
                value={form.type}
                onChange={(e) => updateForm("type", e.target.value)}
                className="w-full mt-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Finalidade</Label>
              <select
                value={form.purpose}
                onChange={(e) => updateForm("purpose", e.target.value)}
                className="w-full mt-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
              >
                <option value="sale">Venda</option>
                <option value="rent">Aluguel</option>
              </select>
            </div>
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Status</Label>
              <select
                value={form.status}
                onChange={(e) => updateForm("status", e.target.value)}
                className="w-full mt-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
              >
                {PROPERTY_STATUS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Price */}
        <section className="bg-card p-6 rounded-lg border border-border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Valor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Pre\u00E7o (R$)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => updateForm("price", e.target.value)}
                placeholder="5000000"
                className="mt-1 bg-background"
                disabled={form.priceOnRequest}
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.priceOnRequest}
                  onChange={(e) => updateForm("priceOnRequest", e.target.checked)}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-sm font-[family-name:var(--font-inter)]">Sob Consulta</span>
              </label>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-card p-6 rounded-lg border border-border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Localiza\u00E7\u00E3o</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Bairro *</Label>
              <select
                value={form.neighborhood}
                onChange={(e) => updateForm("neighborhood", e.target.value)}
                className="w-full mt-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">Selecione...</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Endere\u00E7o</Label>
              <Input
                value={form.address}
                onChange={(e) => updateForm("address", e.target.value)}
                placeholder="Rua, n\u00FAmero (opcional)"
                className="mt-1 bg-background"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-card p-6 rounded-lg border border-border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Caracter\u00EDsticas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { key: "area", label: "\u00C1rea Total (m\u00B2)" },
              { key: "usableArea", label: "\u00C1rea \u00DAtil (m\u00B2)" },
              { key: "bedrooms", label: "Quartos" },
              { key: "suites", label: "Su\u00EDtes" },
              { key: "bathrooms", label: "Banheiros" },
              { key: "parkingSpots", label: "Vagas" },
              { key: "floors", label: "Andares" },
            ].map(({ key, label }) => (
              <div key={key}>
                <Label className="font-[family-name:var(--font-inter)] text-xs">{label}</Label>
                <Input
                  type="number"
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => updateForm(key, e.target.value)}
                  className="mt-1 bg-background"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Comodidades</h2>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
                  form.amenities.includes(amenity)
                    ? "bg-gold/20 border-gold/40 text-gold"
                    : "bg-background border-border text-muted-foreground hover:border-gold/30"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </section>

        {/* Images */}
        <section className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Fotos</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded overflow-hidden group">
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" sizes="200px" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <label className="aspect-[4/3] rounded border-2 border-dashed border-border hover:border-gold/30 flex flex-col items-center justify-center cursor-pointer transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                {uploading ? "Enviando..." : "Adicionar"}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </section>

        {/* Options */}
        <section className="bg-card p-6 rounded-lg border border-border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Op\u00E7\u00F5es</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateForm("isFeatured", e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium">Destaque na Home</span>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                  Exibir este im\u00F3vel na se\u00E7\u00E3o de destaques da p\u00E1gina inicial
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isOffMarket}
                onChange={(e) => updateForm("isOffMarket", e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium">Off-Market (Sigiloso)</span>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                  N\u00E3o aparece na listagem nem no Google. Acess\u00EDvel apenas por link direto
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-card p-6 rounded-lg border border-border space-y-4">
          <h2 className="text-lg font-semibold mb-4">SEO (Opcional)</h2>
          <div>
            <Label className="font-[family-name:var(--font-inter)]">T\u00EDtulo SEO</Label>
            <Input
              value={form.metaTitle}
              onChange={(e) => updateForm("metaTitle", e.target.value)}
              placeholder="T\u00EDtulo para o Google (max 60 caracteres)"
              className="mt-1 bg-background"
              maxLength={60}
            />
          </div>
          <div>
            <Label className="font-[family-name:var(--font-inter)]">Descri\u00E7\u00E3o SEO</Label>
            <Textarea
              value={form.metaDescription}
              onChange={(e) => updateForm("metaDescription", e.target.value)}
              placeholder="Descri\u00E7\u00E3o para o Google (max 160 caracteres)"
              className="mt-1 bg-background"
              maxLength={160}
            />
          </div>
          <div>
            <Label className="font-[family-name:var(--font-inter)]">URL do V\u00EDdeo</Label>
            <Input
              value={form.videoUrl}
              onChange={(e) => updateForm("videoUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="mt-1 bg-background"
            />
          </div>
        </section>
      </div>

      {/* Bottom save */}
      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={saving} className="bg-gold text-background hover:bg-gold-light px-8">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Im\u00F3vel"}
        </Button>
      </div>
    </form>
  );
}
