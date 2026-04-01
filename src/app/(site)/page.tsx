import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Shield, Star, Phone, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { prisma } from "@/lib/prisma";
import { NEIGHBORHOODS } from "@/lib/utils";

async function getFeaturedProperties() {
  return prisma.property.findMany({
    where: {
      isFeatured: true,
      isOffMarket: false,
    },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

async function getRecentProperties() {
  return prisma.property.findMany({
    where: { isOffMarket: false },
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export default async function HomePage() {
  const featured = await getFeaturedProperties();
  const recent = await getRecentProperties();
  const properties = featured.length > 0 ? featured : recent;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat" />
        {/* Fallback if no hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#1A1A1A]" style={{ zIndex: 0 }} />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          {/* Gold line */}
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8" />

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Im&oacute;veis de{" "}
            <span className="text-gradient-gold">Alto Padr&atilde;o</span>
            <br />
            em S&atilde;o Paulo
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-[family-name:var(--font-inter)] font-light leading-relaxed">
            Experi&ecirc;ncia exclusiva na curadoria dos melhores im&oacute;veis
            de luxo nos bairros mais nobres da capital paulista.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button
              asChild
              size="lg"
              className="bg-gold text-background hover:bg-gold-light text-base px-8 py-6 tracking-wider"
            >
              <Link href="/imoveis">
                Ver Im&oacute;veis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-base px-8 py-6 tracking-wider"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 mr-2" />
                Fale Comigo
              </a>
            </Button>
          </div>

          {/* CRECI */}
          <p className="mt-8 text-xs text-white/40 tracking-[0.2em] uppercase font-[family-name:var(--font-inter)]">
            CRECI SP &mdash; 299919
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0 animate-pulse" />
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
              Por que escolher
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Ricardo Rautenberg</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Atendimento Exclusivo",
                desc: "Cada cliente recebe aten\u00E7\u00E3o personalizada com dedica\u00E7\u00E3o total. Sem intermedi\u00E1rios, direto com o especialista.",
              },
              {
                icon: Star,
                title: "Curadoria de Elite",
                desc: "Sele\u00E7\u00E3o rigorosa dos melhores im\u00F3veis de S\u00E3o Paulo. Cada propriedade \u00E9 pessoalmente vistoriada e aprovada.",
              },
              {
                icon: Award,
                title: "Expertise no Mercado",
                desc: "Conhecimento profundo dos bairros nobres de SP, tend\u00EAncias de mercado e oportunidades exclusivas de investimento.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 bg-card rounded-lg border border-border hover:border-gold/20 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IM\u00D3VEIS DESTAQUE ===== */}
      {properties.length > 0 && (
        <section className="py-24 px-4 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
                  Portf&oacute;lio
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold">Im&oacute;veis em Destaque</h2>
              </div>
              <Link
                href="/imoveis"
                className="hidden sm:flex items-center gap-2 text-gold text-sm hover:text-gold-light transition-colors font-[family-name:var(--font-inter)]"
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button asChild variant="outline" className="border-gold/30 text-gold">
                <Link href="/imoveis">
                  Ver todos os im&oacute;veis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ===== BAIRROS ===== */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
              Localiza&ccedil;&otilde;es
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Bairros Nobres de SP</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {NEIGHBORHOODS.slice(0, 12).map((neighborhood) => (
              <Link
                key={neighborhood}
                href={`/imoveis?bairro=${encodeURIComponent(neighborhood)}`}
                className="px-5 py-2.5 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-300 font-[family-name:var(--font-inter)]"
              >
                <MapPin className="w-3 h-3 inline mr-1.5 text-gold/50" />
                {neighborhood}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE (Preview) ===== */}
      <section className="py-24 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-lg overflow-hidden">
              <Image
                src="/images/ricardo.jpg"
                alt="Ricardo Rautenberg - Corretor de Im\u00F3veis de Alto Padr\u00E3o"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Text */}
            <div>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
                O Especialista
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ricardo Rautenberg</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-[family-name:var(--font-inter)]">
                <p>
                  Com anos de experi&ecirc;ncia no mercado imobili&aacute;rio de alto padr&atilde;o
                  de S&atilde;o Paulo, Ricardo Rautenberg se destaca pela curadoria rigorosa e
                  atendimento personalizado que oferece a cada cliente.
                </p>
                <p>
                  Especializado nos bairros mais nobres da capital &mdash; Itaim Bibi, Jardins,
                  Vila Nova Concei&ccedil;&atilde;o, Moema e regi&atilde;o &mdash; conecta compradores
                  exigentes &agrave;s propriedades que definem o que h&aacute; de melhor em
                  moradia de luxo.
                </p>
              </div>

              <div className="flex items-center gap-8 mt-8">
                <div>
                  <p className="text-2xl font-bold text-gold">CRECI</p>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">SP - 299919</p>
                </div>
                <div className="w-[1px] h-12 bg-border" />
                <div>
                  <p className="text-2xl font-bold text-gold">SP</p>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">S&atilde;o Paulo</p>
                </div>
              </div>

              <Button
                asChild
                className="mt-8 bg-gold text-background hover:bg-gold-light"
              >
                <Link href="/sobre">
                  Conhe&ccedil;a mais
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Encontre seu im&oacute;vel ideal
          </h2>
          <p className="text-muted-foreground mb-8 font-[family-name:var(--font-inter)]">
            Entre em contato e descubra as melhores oportunidades do mercado imobili&aacute;rio
            de alto padr&atilde;o em S&atilde;o Paulo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold text-background hover:bg-gold-light px-8 py-6"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 mr-2" />
                Conversar no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 px-8 py-6"
            >
              <Link href="/contato">Entre em contato</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
