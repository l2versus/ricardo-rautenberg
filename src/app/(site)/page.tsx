import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MapPin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutoplayVideo } from "@/components/autoplay-video";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { NEIGHBORHOODS } from "@/lib/utils";
import { PropertyCard } from "@/components/property-card";
import {
  FadeUp,
  FadeIn,
  SlideIn,
  ScaleUp,
  ParallaxImage,
  ParallaxSection,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  LineReveal,
} from "@/components/scroll-animations";

const SHOWCASE_IMAGES = [
  { src: "/images/cap3.jpg", alt: "Sala de jantar gourmet com vista panorâmica" },
  { src: "/images/cap2.jpg", alt: "Rooftop com piscina e vista panorâmica" },
  { src: "/images/cap4.jpg", alt: "Living duplex com pé-direito duplo" },
  { src: "/images/cap1.jpg", alt: "Cozinha planejada em mármore" },
  { src: "/images/cap5.jpg", alt: "Espaço gourmet integrado" },
];

async function getFeaturedProperties() {
  return prisma.property.findMany({
    where: { isFeatured: true, isOffMarket: false },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

async function getRecentProperties() {
  return prisma.property.findMany({
    where: { isOffMarket: false },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
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
      {/* ═══════ HERO — VIDEO FULLSCREEN ═══════ */}
      <section className="relative h-[100dvh] flex items-end overflow-hidden">
        <AutoplayVideo
          src="/images/hero-video.mp4"
          poster="/images/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-video-overlay z-10" />
        <div className="absolute inset-0 noise z-10 pointer-events-none" />

        <div className="relative z-20 w-full pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-gold/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 font-body opacity-0 animate-fade-up">
              Ricardo Rautenberg &mdash; CRECI SP 299919
            </p>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold text-white leading-[0.95] tracking-tight opacity-0 animate-fade-up delay-100">
              Transformando
              <br />
              <span className="text-gradient-gold">Sonhos em Realidade</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/50 max-w-lg leading-relaxed font-body opacity-0 animate-fade-up delay-200">
              Corretor especialista em imóveis de alto padrão no ABC Paulista.
              Atendimento exclusivo e personalizado.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8 sm:mt-10 opacity-0 animate-fade-up delay-300">
              <Button asChild size="lg" className="btn-luxury bg-gold text-background hover:bg-gold-light text-sm px-8 py-6 tracking-[0.15em] uppercase font-body font-medium">
                <Link href="/imoveis">
                  Ver Imóveis <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/15 text-white/80 hover:bg-white/5 hover:border-white/30 text-sm px-8 py-6 tracking-[0.1em] uppercase font-body">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511939117173"}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-6 right-8 sm:right-12 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-700">
            <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase font-body" style={{ writingMode: "vertical-lr" }}>scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gold/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════ SHOWCASE — IMMERSIVE TOUR CTA ═══════ */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <FadeUp>
              <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2 font-body">
                Portfólio
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                <TextReveal text="Imóveis Selecionados" />
              </h2>
            </FadeUp>
            <FadeIn delay={0.3}>
              <Link href="/imoveis" className="hidden sm:flex items-center gap-2 text-gold/80 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors font-body group">
                Ver todos <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>

          <ScaleUp>
            <Link href="/tour" className="group block relative overflow-hidden mb-6">
              <ParallaxImage speed={0.2} className="relative aspect-[21/9] sm:aspect-[3/1]">
                <Image src="/images/cap3.jpg" alt="Tour virtual" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
                <div className="absolute inset-0 flex items-center px-8 sm:px-16">
                  <div>
                    <p className="text-gold/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2 font-body">Experiência imersiva</p>
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-display mb-3">Tour Virtual</h3>
                    <p className="text-white/50 font-body text-sm sm:text-base max-w-md mb-5">
                      Explore nossos imóveis de alto padrão com um tour interativo.
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase font-body group-hover:gap-3 transition-all">
                      <Play className="w-4 h-4 fill-gold" /> Iniciar Tour <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </ParallaxImage>
            </Link>
          </ScaleUp>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-[3px]">
            {SHOWCASE_IMAGES.slice(0, 4).map((img, i) => (
              <StaggerItem key={i}>
                <div className="relative overflow-hidden group cursor-pointer h-[160px] sm:h-[200px]">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-[1s] group-hover:scale-105" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-[11px] font-body">{img.alt}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2} className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline" className="border-gold/20 text-gold text-xs tracking-[0.15em] uppercase font-body">
              <Link href="/imoveis">Ver todos os imóveis <ArrowRight className="w-3.5 h-3.5 ml-2" /></Link>
            </Button>
          </FadeUp>
        </div>
      </section>

      <LineReveal className="mx-auto max-w-xs" />

      {/* ═══════ LISTINGS ═══════ */}
      {properties.length > 0 && (
        <section className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <FadeUp className="text-center mb-12 sm:mb-16">
              <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2 font-body">
                Disponíveis
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <TextReveal text="Imóveis em Destaque" />
              </h2>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.12}>
              {properties.map((property) => (
                <StaggerItem key={property.id}>
                  <PropertyCard property={property} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeUp delay={0.3} className="mt-12 text-center">
              <Button asChild variant="outline" size="lg" className="border-gold/20 text-gold hover:bg-gold/5 text-xs tracking-[0.15em] uppercase font-body px-10 py-6">
                <Link href="/imoveis">Explorar portfólio completo <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ═══════ ABOUT — EDITORIAL SPLIT ═══════ */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <SlideIn direction="left" className="lg:col-span-5 relative">
              <ParallaxImage speed={0.15} className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                <Image src="/images/ricardo-dark.jpg" alt="Ricardo Rautenberg" fill className="object-cover object-top" sizes="(max-width: 1024px) 80vw, 40vw" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />
              </ParallaxImage>
              <FadeUp delay={0.4} className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-gold text-background px-5 py-3 font-body">
                <p className="text-[10px] tracking-[0.3em] uppercase">CRECI SP</p>
                <p className="text-lg font-bold font-display">299919</p>
              </FadeUp>
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-7 lg:pl-4">
              <FadeUp>
                <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 font-body">
                  O Especialista
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                  <TextReveal text="Ricardo Rautenberg" />
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-body text-[15px]">
                  <p>
                    Com anos de experiência no mercado imobiliário de alto padrão,
                    Ricardo se destaca pela curadoria rigorosa e pelo atendimento
                    personalizado que dedica a cada cliente.
                  </p>
                  <p>
                    Especializado em imóveis de alto padrão no ABC Paulista &mdash;
                    Santo André, São Bernardo, São Caetano &mdash; conecta compradores
                    exigentes às propriedades que definem excelência em moradia.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex items-center gap-10 mt-10">
                  {[
                    { number: "ABC", label: "Paulista" },
                    { number: "Alto", label: "Padrão" },
                    { number: "100%", label: "Dedicação" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xl sm:text-2xl font-bold text-gold font-display">{stat.number}</p>
                      <p className="text-[11px] text-muted-foreground tracking-wider uppercase font-body mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex gap-3 mt-8">
                  <Button asChild className="btn-luxury bg-gold text-background hover:bg-gold-light text-xs tracking-[0.15em] uppercase font-body px-8 py-5">
                    <Link href="/sobre">Saiba mais</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 text-xs tracking-[0.15em] uppercase font-body px-8 py-5">
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511939117173"}`} target="_blank" rel="noopener noreferrer">
                      Fale comigo
                    </a>
                  </Button>
                </div>
              </FadeUp>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ═══════ NEIGHBORHOODS ═══════ */}
      <ParallaxSection speed={0.08} className="py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <FadeUp>
            <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2 font-body">
              Localizações
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold">
              <TextReveal text="Bairros Nobres" />
            </h2>
          </FadeUp>
        </div>

        <StaggerContainer className="relative" staggerDelay={0.05}>
          {/* Mobile: horizontal scroll with snapping */}
          <div className="sm:hidden overflow-x-auto scroll-smooth pb-4 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {NEIGHBORHOODS.slice(0, 14).map((neighborhood) => (
                <StaggerItem key={neighborhood}>
                  <Link
                    href={`/imoveis?bairro=${encodeURIComponent(neighborhood)}`}
                    className="flex-shrink-0 px-6 py-3 bg-card/80 border border-border/60 rounded-none text-sm text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-400 font-body group whitespace-nowrap"
                  >
                    <MapPin className="w-3 h-3 inline mr-2 text-gold/40 group-hover:text-gold transition-colors" />
                    {neighborhood}
                  </Link>
                </StaggerItem>
              ))}
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Desktop: flex-wrap centered grid */}
          <div className="hidden sm:flex sm:flex-wrap sm:justify-center gap-x-4 gap-y-4 px-8 max-w-5xl mx-auto">
            {NEIGHBORHOODS.slice(0, 14).map((neighborhood) => (
              <StaggerItem key={neighborhood}>
                <Link
                  href={`/imoveis?bairro=${encodeURIComponent(neighborhood)}`}
                  className="px-6 py-3 bg-card/80 border border-border/60 rounded-none text-sm text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-400 font-body group"
                >
                  <MapPin className="w-3 h-3 inline mr-2 text-gold/40 group-hover:text-gold transition-colors" />
                  {neighborhood}
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </ParallaxSection>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative py-24 sm:py-32 px-4 text-center overflow-hidden noise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-xl mx-auto">
          <LineReveal className="mx-auto max-w-12 mb-8" />
          <FadeUp>
            <h2 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight">
              <TextReveal text="Encontre seu imóvel ideal" />
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-muted-foreground mb-10 font-body text-[15px] leading-relaxed">
              Entre em contato e descubra as melhores oportunidades do mercado
              imobiliário de alto padrão no ABC Paulista.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="btn-luxury bg-gold text-background hover:bg-gold-light px-10 py-6 text-xs tracking-[0.15em] uppercase font-body">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511939117173"}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 px-10 py-6 text-xs tracking-[0.15em] uppercase font-body">
                <Link href="/contato">Contato</Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}