"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Eye,
  Star,
  EyeOff,
  Home,
  Building2,
  TrendingUp,
  DollarSign,
  MapPin,
  BedDouble,
  Car,
  Maximize,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

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
  bedrooms: number | null;
  parkingSpots: number | null;
  area: number | null;
  createdAt: string;
  images: { url: string }[];
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: "Disponivel", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  sold: { label: "Vendido", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  rented: { label: "Alugado", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  negotiating: { label: "Negociando", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
};

const typeLabels: Record<string, string> = {
  apartment: "Apartamento",
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
      console.error("Erro ao carregar imoveis");
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
      alert("Erro ao excluir imovel");
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

  const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
  const available = properties.filter((p) => p.status === "available").length;
  const featured = properties.filter((p) => p.isFeatured).length;

  return (
    <div className="min-h-screen flex">
      {/* ═══ Left — Video Panel (fixed) ═══ */}
      <div className="hidden lg:block lg:w-[280px] xl:w-[320px] fixed top-0 left-0 h-screen overflow-hidden z-40">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/dashboard-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-[#070707]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        {/* FlickeringGrid */}
        <div className="absolute inset-0 z-10 opacity-25">
          <FlickeringGrid
            color="rgb(201, 168, 76)"
            maxOpacity={0.12}
            flickerChance={0.06}
            squareSize={3}
            gridGap={10}
          />
        </div>

        {/* Sidebar content */}
        <div className="relative z-20 flex flex-col justify-between h-full p-6 xl:p-8">
          {/* Top — Logo */}
          <div>
            <Image
              src="/images/logo-full.png"
              alt="Ricardo Rautenberg"
              width={400}
              height={140}
              className="opacity-90"
              style={{ height: "auto", maxHeight: "90px", width: "auto", filter: "brightness(5)" }}
            />
            <div className="w-8 h-[1px] bg-gradient-to-r from-gold/40 to-transparent mt-5 mb-4" />
            <p className="text-[10px] text-white/30 font-body tracking-[0.25em] uppercase">
              Painel Admin
            </p>
          </div>

          {/* Bottom — Quick stats + actions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-body">Imóveis</span>
                <span className="text-sm font-bold font-display text-white/80">{properties.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-body">Disponíveis</span>
                <span className="text-sm font-bold font-display text-emerald-400">{available}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-body">Destaques</span>
                <span className="text-sm font-bold font-display text-gold">{featured}</span>
              </div>
              {totalValue > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-body">Portfólio</span>
                  <span className="text-sm font-bold font-display text-gold">
                    R$ {(totalValue / 1_000_000).toFixed(1)}M
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <Button
                asChild
                className="w-full btn-luxury bg-gold text-background hover:bg-gold-light text-[9px] tracking-[0.15em] uppercase font-body h-9 rounded-none justify-center"
              >
                <Link href="/admin/imoveis/novo">
                  <Plus className="w-3 h-3 mr-1.5" />
                  Novo Imóvel
                </Link>
              </Button>
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-white/10 text-white/50 hover:text-gold hover:border-gold/30 text-[9px] tracking-[0.1em] uppercase font-body h-8 rounded-none"
                >
                  <Link href="/" target="_blank">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Site
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex-1 border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/30 text-[9px] tracking-[0.1em] uppercase font-body h-8 rounded-none"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  Sair
                </Button>
              </div>
            </div>

            <p className="text-[8px] text-white/15 tracking-[0.3em] uppercase font-body text-center pt-2">
              CRECI SP — 299919
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Right — Dashboard content ═══ */}
      <div className="w-full lg:ml-[280px] xl:ml-[320px] relative">
        {/* Particle Text Background */}
        <div className="fixed top-0 right-0 bottom-0 left-0 lg:left-[280px] xl:left-[320px] z-0 opacity-[0.18] pointer-events-none">
          <ParticleTextEffect
            words={["ALTO PADRÃO", "ABC PAULISTA", "RAUTENBERG", "BROKER", "IMÓVEIS", "LUXO"]}
            className="w-full h-full"
            transparent
          />
        </div>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-border/30">
        <Image
          src="/images/logo-full.png"
          alt="Ricardo Rautenberg"
          width={200}
          height={70}
          className="opacity-80"
          style={{ height: "auto", maxHeight: "40px", width: "auto", filter: "brightness(5)" }}
        />
        <div className="flex items-center gap-2">
          <Button asChild className="bg-gold text-background hover:bg-gold-light text-[9px] tracking-wider uppercase font-body h-8 px-3 rounded-none">
            <Link href="/admin/imoveis/novo"><Plus className="w-3 h-3 mr-1" /> Novo</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground/40 h-8 w-8">
            <LogOut className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">

      {/* ═══ Stats cards ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: "Total",
            value: properties.length.toString(),
            sub: "imoveis",
            icon: Building2,
            accent: "text-foreground/80",
          },
          {
            label: "Disponiveis",
            value: available.toString(),
            sub: "ativos",
            icon: TrendingUp,
            accent: "text-emerald-400",
          },
          {
            label: "Destaques",
            value: featured.toString(),
            sub: "na home",
            icon: Star,
            accent: "text-gold",
          },
          {
            label: "Portfolio",
            value: totalValue > 0
              ? `R$ ${(totalValue / 1_000_000).toFixed(1)}M`
              : "---",
            sub: "valor total",
            icon: DollarSign,
            accent: "text-gold",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-border/30 bg-card/20 p-4 sm:p-5 group hover:border-gold/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground/40 font-body">
                {stat.label}
              </span>
              <stat.icon className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-gold/30 transition-colors" />
            </div>
            <p className={`text-xl sm:text-2xl font-bold font-display ${stat.accent}`}>
              {stat.value}
            </p>
            <p className="text-[10px] text-muted-foreground/30 font-body mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* ═══ Section header ═══ */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gold/60" />
          <h2 className="text-sm font-semibold font-display tracking-wider uppercase">
            Imoveis
          </h2>
          <span className="text-[10px] text-muted-foreground/40 font-body ml-1">
            ({properties.length})
          </span>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border/20 bg-card/10 animate-pulse">
              <div className="aspect-[16/10] bg-secondary/20" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-secondary/20 w-3/4 rounded" />
                <div className="h-3 bg-secondary/10 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-24 border border-border/30 bg-card/10">
          <div className="w-16 h-16 bg-gold/5 border border-gold/10 flex items-center justify-center mx-auto mb-5">
            <Home className="w-7 h-7 text-gold/30" />
          </div>
          <p className="text-muted-foreground/50 mb-2 font-display font-semibold">
            Nenhum imovel cadastrado
          </p>
          <p className="text-xs text-muted-foreground/30 font-body mb-6">
            Comece adicionando seu primeiro imovel ao portfolio.
          </p>
          <Button
            asChild
            className="btn-luxury bg-gold text-background hover:bg-gold-light text-[10px] tracking-[0.15em] uppercase font-body px-6 py-5 rounded-none"
          >
            <Link href="/admin/imoveis/novo">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Cadastrar primeiro imovel
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {properties.map((property) => {
            const status = statusConfig[property.status] || statusConfig.available;
            return (
              <div
                key={property.id}
                className="group border border-border/20 bg-card/10 hover:border-gold/15 transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] bg-secondary/10 overflow-hidden">
                  {property.images[0] ? (
                    <img
                      src={property.images[0].url}
                      alt={property.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-secondary/20">
                      <Building2 className="w-8 h-8 text-muted-foreground/10 mb-2" />
                      <span className="text-[10px] text-muted-foreground/20 font-body tracking-wider">
                        Sem foto
                      </span>
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {property.isFeatured && (
                      <div className="bg-gold/90 text-background px-2 py-0.5 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span className="text-[8px] tracking-wider uppercase font-body font-semibold">Destaque</span>
                      </div>
                    )}
                    {property.isOffMarket && (
                      <div className="bg-black/70 backdrop-blur-sm text-white/70 px-2 py-0.5 flex items-center gap-1">
                        <EyeOff className="w-2.5 h-2.5" />
                        <span className="text-[8px] tracking-wider uppercase font-body">Off-Market</span>
                      </div>
                    )}
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`${status.bg} ${status.color} border text-[8px] tracking-wider uppercase font-body`}>
                      {status.label}
                    </Badge>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-display font-bold text-lg leading-none drop-shadow-lg">
                      {formatPrice(property.price, property.priceOnRequest)}
                    </p>
                  </div>

                  {/* Action buttons — visible on hover */}
                  <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/imoveis/${property.slug}`}
                      target="_blank"
                      className="w-7 h-7 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-gold hover:bg-black/80 transition-colors"
                      title="Ver no site"
                    >
                      <Eye className="w-3 h-3" />
                    </Link>
                    <Link
                      href={`/admin/imoveis/${property.id}`}
                      className="w-7 h-7 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-gold hover:bg-black/80 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id, property.title)}
                      className="w-7 h-7 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/80 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/admin/imoveis/${property.id}`} className="block group/title">
                    <h3 className="font-display font-semibold text-sm leading-snug line-clamp-1 group-hover/title:text-gold transition-colors">
                      {property.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin className="w-3 h-3 text-gold/40" />
                    <span className="text-[11px] text-muted-foreground/50 font-body">
                      {property.neighborhood}
                    </span>
                    <span className="text-muted-foreground/20 mx-1">|</span>
                    <span className="text-[11px] text-muted-foreground/40 font-body">
                      {typeLabels[property.type] || property.type}
                    </span>
                  </div>

                  {/* Mini stats */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/20">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3 h-3 text-muted-foreground/25" />
                        <span className="text-[10px] text-muted-foreground/40 font-body">
                          {property.bedrooms}
                        </span>
                      </div>
                    )}
                    {property.parkingSpots && (
                      <div className="flex items-center gap-1">
                        <Car className="w-3 h-3 text-muted-foreground/25" />
                        <span className="text-[10px] text-muted-foreground/40 font-body">
                          {property.parkingSpots}
                        </span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 text-muted-foreground/25" />
                        <span className="text-[10px] text-muted-foreground/40 font-body">
                          {property.area}m²
                        </span>
                      </div>
                    )}
                    <span className="text-[9px] text-muted-foreground/20 font-body ml-auto">
                      {new Date(property.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
    </div>
  );
}
