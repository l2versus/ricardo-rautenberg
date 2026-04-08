"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NEIGHBORHOODS, PROPERTY_TYPES, PROPERTY_STATUS, AMENITIES } from "@/lib/utils";
import { Upload, X, ArrowLeft, Save, MapPin, Image as ImageIcon } from "lucide-react";
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
      alert("Título e bairro são obrigatórios");
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
      alert("Erro de conexão");
    } finally {
      setSaving(false);
    }
  }

  // Build Google Maps embed URL from address + neighborhood
  const mapQuery = encodeURIComponent(
    `${form.address ? form.address + ", " : ""}${form.neighborhood || "ABC Paulista"}, SP, Brasil`
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/imoveis" className="text-muted-foreground/50 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold font-display">
            {initialData ? "Editar Imóvel" : "Novo Imóvel"}
          </h1>
        </div>
        <Button type="submit" disabled={saving} className="bg-gold text-background hover:bg-gold-light text-xs tracking-wider uppercase font-body h-9 px-5">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* ═══ Informações Básicas ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            Informações Básicas
          </h2>

          <div>
            <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Título *</Label>
            <Input
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              placeholder="Cobertura Duplex no ABC com Piscina Privativa"
              className="mt-1.5 bg-background border-border/60 h-10 font-body"
              required
            />
          </div>

          <div>
            <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Descrição</Label>
            <Textarea
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              placeholder="Descreva o imóvel em detalhes..."
              className="mt-1.5 bg-background border-border/60 min-h-[100px] font-body"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Tipo</Label>
              <select
                value={form.type}
                onChange={(e) => updateForm("type", e.target.value)}
                className="w-full mt-1.5 bg-background border border-border/60 rounded-md px-3 py-2 text-sm font-body h-10"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Finalidade</Label>
              <select
                value={form.purpose}
                onChange={(e) => updateForm("purpose", e.target.value)}
                className="w-full mt-1.5 bg-background border border-border/60 rounded-md px-3 py-2 text-sm font-body h-10"
              >
                <option value="sale">Venda</option>
                <option value="rent">Aluguel</option>
              </select>
            </div>
            <div>
              <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Status</Label>
              <select
                value={form.status}
                onChange={(e) => updateForm("status", e.target.value)}
                className="w-full mt-1.5 bg-background border border-border/60 rounded-md px-3 py-2 text-sm font-body h-10"
              >
                {PROPERTY_STATUS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ═══ Valor ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            Valor
          </h2>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Preço (R$)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => updateForm("price", e.target.value)}
                placeholder="5000000"
                className="mt-1.5 bg-background border-border/60 h-10 font-body"
                disabled={form.priceOnRequest}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input
                type="checkbox"
                checked={form.priceOnRequest}
                onChange={(e) => updateForm("priceOnRequest", e.target.checked)}
                className="accent-[#C9A84C] w-4 h-4"
              />
              <span className="text-sm font-body whitespace-nowrap">Sob Consulta</span>
            </label>
          </div>
        </section>

        {/* ═══ Localização + Mapa ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            <MapPin className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            Localização
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Bairro *</Label>
              <select
                value={form.neighborhood}
                onChange={(e) => updateForm("neighborhood", e.target.value)}
                className="w-full mt-1.5 bg-background border border-border/60 rounded-md px-3 py-2 text-sm font-body h-10"
                required
              >
                <option value="">Selecione...</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Endereço</Label>
              <Input
                value={form.address}
                onChange={(e) => updateForm("address", e.target.value)}
                placeholder="Rua, número (opcional)"
                className="mt-1.5 bg-background border-border/60 h-10 font-body"
              />
            </div>
          </div>

          {/* Google Maps Preview */}
          {form.neighborhood && (
            <div className="mt-4">
              <p className="text-[10px] text-muted-foreground/50 font-body tracking-wider uppercase mb-2">
                Pré-visualização do mapa
              </p>
              <div className="relative aspect-[2/1] sm:aspect-[3/1] bg-card border border-border/30 overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          )}
        </section>

        {/* ═══ Características ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            Características
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { key: "area", label: "Área Total (m²)" },
              { key: "usableArea", label: "Área Útil (m²)" },
              { key: "bedrooms", label: "Quartos" },
              { key: "suites", label: "Suítes" },
              { key: "bathrooms", label: "Banheiros" },
              { key: "parkingSpots", label: "Vagas" },
              { key: "floors", label: "Andares" },
            ].map(({ key, label }) => (
              <div key={key}>
                <Label className="text-[10px] font-body tracking-wider uppercase text-muted-foreground">{label}</Label>
                <Input
                  type="number"
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => updateForm(key, e.target.value)}
                  className="mt-1.5 bg-background border-border/60 h-10 font-body"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Comodidades ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            Comodidades
          </h2>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 text-[11px] font-body transition-all border ${
                  form.amenities.includes(amenity)
                    ? "bg-gold/15 border-gold/40 text-gold"
                    : "bg-transparent border-border/40 text-muted-foreground/60 hover:border-gold/20 hover:text-muted-foreground"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </section>

        {/* ═══ Fotos ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            <ImageIcon className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            Fotos
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden group border border-border/30">
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" sizes="200px" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1.5 right-1.5 bg-red-500/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-[9px] text-white/50 font-body">
                  Foto {i + 1}
                </div>
              </div>
            ))}

            <label className="aspect-[4/3] border border-dashed border-border/40 hover:border-gold/30 flex flex-col items-center justify-center cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground/30 mb-1" />
              <span className="text-[10px] text-muted-foreground/40 font-body tracking-wider">
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

        {/* ═══ Opções ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            Opções
          </h2>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateForm("isFeatured", e.target.checked)}
                className="accent-[#C9A84C] w-4 h-4 mt-0.5"
              />
              <div>
                <span className="text-sm font-medium group-hover:text-gold transition-colors">Destaque na Home</span>
                <p className="text-[11px] text-muted-foreground/50 font-body mt-0.5">
                  Exibir este imóvel na seção de destaques da página inicial
                </p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.isOffMarket}
                onChange={(e) => updateForm("isOffMarket", e.target.checked)}
                className="accent-[#C9A84C] w-4 h-4 mt-0.5"
              />
              <div>
                <span className="text-sm font-medium group-hover:text-gold transition-colors">Off-Market (Sigiloso)</span>
                <p className="text-[11px] text-muted-foreground/50 font-body mt-0.5">
                  Não aparece na listagem nem no Google. Acessível apenas por link direto
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* ═══ SEO + Vídeo ═══ */}
        <section className="border border-border/40 bg-card/20 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase text-gold/70 mb-4">
            SEO e Mídia
          </h2>
          <div>
            <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Título SEO</Label>
            <Input
              value={form.metaTitle}
              onChange={(e) => updateForm("metaTitle", e.target.value)}
              placeholder="Título para o Google (max 60 caracteres)"
              className="mt-1.5 bg-background border-border/60 h-10 font-body"
              maxLength={60}
            />
          </div>
          <div>
            <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">Descrição SEO</Label>
            <Textarea
              value={form.metaDescription}
              onChange={(e) => updateForm("metaDescription", e.target.value)}
              placeholder="Descrição para o Google (max 160 caracteres)"
              className="mt-1.5 bg-background border-border/60 font-body"
              maxLength={160}
            />
          </div>
          <div>
            <Label className="text-xs font-body tracking-wider uppercase text-muted-foreground">URL do Vídeo</Label>
            <Input
              value={form.videoUrl}
              onChange={(e) => updateForm("videoUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="mt-1.5 bg-background border-border/60 h-10 font-body"
            />
          </div>
        </section>
      </div>

      {/* Bottom save */}
      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={saving} className="bg-gold text-background hover:bg-gold-light text-xs tracking-wider uppercase font-body h-10 px-8">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving ? "Salvando..." : "Salvar Imóvel"}
        </Button>
      </div>
    </form>
  );
}
