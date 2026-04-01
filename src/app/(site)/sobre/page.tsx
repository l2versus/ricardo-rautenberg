import Image from "next/image";
import { Award, Shield, Star, Users, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sobre Ricardo Rautenberg",
  description: "Conhe\u00E7a Ricardo Rautenberg, corretor especializado em im\u00F3veis de alto padr\u00E3o em S\u00E3o Paulo. CRECI SP 299919. Atendimento exclusivo nos melhores bairros da capital.",
};

export default function SobrePage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[3/4] max-w-lg mx-auto lg:mx-0 rounded-lg overflow-hidden">
            <Image
              src="/images/ricardo.jpg"
              alt="Ricardo Rautenberg"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div>
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
              O Especialista
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ricardo Rautenberg
            </h1>
            <div className="w-16 h-[1px] bg-gold mb-6" />

            <div className="space-y-4 text-muted-foreground leading-relaxed font-[family-name:var(--font-inter)]">
              <p>
                Ricardo Rautenberg \u00E9 corretor de im\u00F3veis especializado no mercado
                de alto padr\u00E3o de S\u00E3o Paulo, com profundo conhecimento dos bairros
                mais nobres da capital paulista.
              </p>
              <p>
                Com uma abordagem baseada em curadoria rigorosa e atendimento
                verdadeiramente personalizado, Ricardo se diferencia por entender que
                cada cliente possui necessidades \u00FAnicas e merece uma experi\u00EAncia
                \u00E0 altura do investimento.
              </p>
              <p>
                Sua miss\u00E3o \u00E9 conectar pessoas exigentes \u00E0s propriedades que
                definem o que h\u00E1 de melhor em moradia de luxo, com transpar\u00EAncia,
                discri\u00E7\u00E3o e excel\u00EAncia em cada etapa da negocia\u00E7\u00E3o.
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
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">S\u00E3o Paulo</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button asChild className="bg-gold text-background hover:bg-gold-light">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale Comigo
                </a>
              </Button>
              <Button asChild variant="outline" className="border-gold/30 text-gold">
                <a
                  href="https://instagram.com/ricardo_rautenberg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Transpar\u00EAncia",
              desc: "Informa\u00E7\u00F5es claras e honestas sobre cada propriedade e negocia\u00E7\u00E3o.",
            },
            {
              icon: Star,
              title: "Excel\u00EAncia",
              desc: "Padr\u00E3o elevado em cada detalhe, da apresenta\u00E7\u00E3o ao fechamento.",
            },
            {
              icon: Users,
              title: "Discri\u00E7\u00E3o",
              desc: "Sigilo absoluto para clientes que valorizam privacidade acima de tudo.",
            },
            {
              icon: Award,
              title: "Resultado",
              desc: "Foco em encontrar a propriedade ideal dentro do prazo e das expectativas.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-card rounded-lg border border-border hover:border-gold/20 transition-all"
            >
              <item.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Areas of Operation */}
        <div className="mt-24 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
            \u00C1rea de atua\u00E7\u00E3o
          </p>
          <h2 className="text-3xl font-bold mb-8">Bairros Nobres de S\u00E3o Paulo</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Itaim Bibi", "Jardim Paulista", "Jardim Am\u00E9rica", "Jardim Europa",
              "Vila Nova Concei\u00E7\u00E3o", "Moema", "Vila Ol\u00EDmpia", "Pinheiros",
              "Higien\u00F3polis", "Brooklin", "Campo Belo", "Morumbi",
            ].map((b) => (
              <span
                key={b}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground font-[family-name:var(--font-inter)]"
              >
                <MapPin className="w-3 h-3 inline mr-1 text-gold/50" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
