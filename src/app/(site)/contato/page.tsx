import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com Ricardo Rautenberg. Atendimento exclusivo para imóveis de alto padrão no ABC Paulista. WhatsApp, e-mail ou Instagram.",
};

export default function ContatoPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 font-body">
            Contato
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Fale comigo
          </h1>
          <p className="text-muted-foreground font-body text-[15px] max-w-lg">
            Estou à disposição para ajudá-lo a encontrar o imóvel ideal.
            Atendimento personalizado e discreto.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5511939117173?text=Olá%20Ricardo,%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20imóveis."
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 border border-border/40 bg-card/30 hover:border-[#25D366]/30 transition-all duration-500"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#25D366]/10 mb-5 group-hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <h3 className="text-base font-semibold mb-1.5 font-display">WhatsApp</h3>
            <p className="text-[13px] text-muted-foreground/60 font-body mb-3">
              Resposta rápida e direta
            </p>
            <p className="text-sm text-gold font-body">(11) 99999-9999</p>
          </a>

          {/* Phone */}
          <a
            href="tel:+5511939117173"
            className="group p-8 border border-border/40 bg-card/30 hover:border-gold/30 transition-all duration-500"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gold/5 mb-5 group-hover:bg-gold/10 transition-colors">
              <Phone className="w-5 h-5 text-gold/70" />
            </div>
            <h3 className="text-base font-semibold mb-1.5 font-display">Telefone</h3>
            <p className="text-[13px] text-muted-foreground/60 font-body mb-3">
              Ligue diretamente
            </p>
            <p className="text-sm text-gold font-body">(11) 99999-9999</p>
          </a>

          {/* Email */}
          <a
            href="mailto:contato@ricardorautenberg.com.br"
            className="group p-8 border border-border/40 bg-card/30 hover:border-gold/30 transition-all duration-500"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gold/5 mb-5 group-hover:bg-gold/10 transition-colors">
              <Mail className="w-5 h-5 text-gold/70" />
            </div>
            <h3 className="text-base font-semibold mb-1.5 font-display">E-mail</h3>
            <p className="text-[13px] text-muted-foreground/60 font-body mb-3">
              Para propostas e documentos
            </p>
            <p className="text-sm text-gold font-body">contato@ricardorautenberg.com.br</p>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/ricardo_rautenberg"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 border border-border/40 bg-card/30 hover:border-pink-500/30 transition-all duration-500"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-pink-500/5 mb-5 group-hover:bg-pink-500/10 transition-colors">
              <InstagramIcon className="w-5 h-5 text-pink-400/70" />
            </div>
            <h3 className="text-base font-semibold mb-1.5 font-display">Instagram</h3>
            <p className="text-[13px] text-muted-foreground/60 font-body mb-3">
              Acompanhe novidades e imóveis
            </p>
            <p className="text-sm text-gold font-body">@ricardo_rautenberg</p>
          </a>
        </div>

        {/* Location */}
        <div className="mt-12 p-8 border border-border/40 bg-card/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-gold/5 flex-shrink-0">
              <MapPin className="w-4 h-4 text-gold/70" />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1.5 font-display">Área de atuação</h3>
              <p className="text-[13px] text-muted-foreground/60 font-body leading-relaxed">
                Itaim Bibi, Jardins, Vila Nova Conceição, Moema, Vila Olímpia,
                Pinheiros, Higienópolis, Brooklin, Campo Belo e demais bairros
                nobres do ABC Paulista — Santo André, São Bernardo do Campo,
                São Caetano do Sul e região.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[11px] tracking-[0.3em] text-muted-foreground/40 uppercase font-body">
            CRECI SP — 299919
          </p>
        </div>
      </div>
    </div>
  );
}
