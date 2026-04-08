"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import InteractiveSelector from "@/components/ui/interactive-selector";

export default function TourPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/images/tour-video.mp4"
        posterSrc="/images/cap3.jpg"
        bgImageSrc="/images/ricardo-dark.jpg"
        title="Imóveis de Alto Padrão"
        date="ABC Paulista"
        scrollToExpand="Scroll para explorar"
        textBlend
      >
        {/* Content revealed after expansion */}
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-16">
            <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 font-body">
              Tour Virtual
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Conheça Nossos Imóveis
            </h2>
            <p className="text-muted-foreground font-body text-[15px] max-w-lg mx-auto">
              Cada propriedade é pessoalmente selecionada para garantir
              os mais altos padrões de qualidade, localização e acabamento.
            </p>
          </div>

          {/* Interactive selector */}
          <InteractiveSelector />

          {/* CTA */}
          <div className="text-center py-8">
            <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-8" />
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              Interessado?
            </h3>
            <p className="text-muted-foreground font-body text-[15px] mb-8 max-w-md mx-auto">
              Entre em contato para agendar uma visita ou saber mais sobre
              os imóveis disponíveis no ABC Paulista.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="btn-luxury bg-gold text-background hover:bg-gold-light text-xs tracking-[0.15em] uppercase font-body px-8 py-5"
              >
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gold/20 text-gold hover:bg-gold/5 text-xs tracking-[0.15em] uppercase font-body px-8 py-5"
              >
                <Link href="/imoveis">
                  Ver Portfólio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
