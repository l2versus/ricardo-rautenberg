import Image from "next/image";
import Link from "next/link";
import { Award, Shield, Star, Users, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sobre",
  description:
    "Conheça Ricardo Rautenberg, corretor especializado em imóveis de alto padrão no ABC Paulista. CRECI SP 299919.",
};

export default function SobrePage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden">
              <Image
                src="/images/ricardo-dark.jpg"
                alt="Ricardo Rautenberg - Corretor de Imóveis de Alto Padrão"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 80vw, 40vw"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 font-body">
              Sobre
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              Ricardo<br />Rautenberg
            </h1>

            <div className="space-y-5 text-muted-foreground leading-relaxed font-body text-[15px] max-w-xl">
              <p>
                Com anos de experiência no mercado imobiliário de alto padrão
                do ABC Paulista, Ricardo Rautenberg se destaca pela curadoria
                rigorosa e atendimento personalizado que oferece a cada cliente.
              </p>
              <p>
                Especializado em imóveis de alto padrão em Santo André,
                São Bernardo do Campo, São Caetano do Sul e região &mdash; conecta
                compradores exigentes às propriedades que definem o que há de
                melhor em moradia de luxo.
              </p>
              <p>
                Seu compromisso é transformar a busca pelo imóvel ideal em uma
                experiência fluida e exclusiva, com transparência total e
                atenção a cada detalhe.
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://instagram.com/ricardo_rautenberg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors font-body"
              >
                <InstagramIcon className="w-4 h-4" />
                @ricardo_rautenberg
              </a>
            </div>

            {/* CRECI badge */}
            <div className="inline-flex items-center gap-6 mt-8 px-6 py-4 border border-border/40 bg-card/50">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gold/60 uppercase font-body">CRECI SP</p>
                <p className="text-2xl font-bold font-display text-gold">299919</p>
              </div>
              <div className="w-[1px] h-10 bg-border/40" />
              <div>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground/50 uppercase font-body">Região</p>
                <p className="text-lg font-semibold font-display">ABC Paulista</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32">
        <div className="divider-gold mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Atendimento Exclusivo",
              desc: "Cada cliente recebe atenção personalizada e dedicação total.",
            },
            {
              icon: Star,
              title: "Curadoria de Elite",
              desc: "Seleção rigorosa dos melhores imóveis do ABC Paulista.",
            },
            {
              icon: Award,
              title: "Expertise",
              desc: "Conhecimento profundo dos bairros nobres e tendências.",
            },
            {
              icon: Users,
              title: "Rede de Contatos",
              desc: "Acesso a oportunidades exclusivas antes do mercado.",
            },
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="w-10 h-10 flex items-center justify-center bg-gold/5 border border-gold/10 mb-4 group-hover:bg-gold/10 transition-colors">
                <item.icon className="w-4.5 h-4.5 text-gold/70" />
              </div>
              <h3 className="text-sm font-semibold mb-2 font-display">{item.title}</h3>
              <p className="text-[13px] text-muted-foreground/60 leading-relaxed font-body">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32">
        <div className="relative p-10 sm:p-16 text-center border border-border/40 bg-card/30 overflow-hidden noise">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-display">
              Vamos conversar?
            </h2>
            <p className="text-muted-foreground font-body text-[15px] mb-8 max-w-md mx-auto">
              Entre em contato para uma consultoria personalizada sobre o mercado imobiliário de alto padrão.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="btn-luxury bg-gold text-background hover:bg-gold-light text-xs tracking-[0.15em] uppercase font-body px-8 py-5"
              >
                <a
                  href="https://wa.me/5511939117173"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gold/20 text-gold hover:bg-gold/5 text-xs tracking-[0.15em] uppercase font-body px-8 py-5"
              >
                <Link href="/contato">Contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
