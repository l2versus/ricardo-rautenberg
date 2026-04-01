import { Phone, Mail, Instagram, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contato",
  description: "Entre em contato com Ricardo Rautenberg. Atendimento exclusivo para im\u00F3veis de alto padr\u00E3o em S\u00E3o Paulo. WhatsApp, e-mail ou Instagram.",
};

export default function ContatoPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-inter)]">
            Contato
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Vamos Conversar
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-[family-name:var(--font-inter)]">
            Estou \u00E0 disposi\u00E7\u00E3o para ajud\u00E1-lo a encontrar o im\u00F3vel
            ideal. Escolha o canal de sua prefer\u00EAncia.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%20Ricardo%2C%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20im%C3%B3veis%20dispon%C3%ADveis."
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-card rounded-lg border border-border hover:border-[#25D366]/30 transition-all group"
          >
            <MessageCircle className="w-10 h-10 text-[#25D366] mb-4" />
            <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground text-sm mb-4 font-[family-name:var(--font-inter)]">
              Atendimento r\u00E1pido e direto. Resposta em at\u00E9 1 hora.
            </p>
            <span className="text-[#25D366] text-sm font-medium font-[family-name:var(--font-inter)]">
              Iniciar conversa &rarr;
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+5511999999999"
            className="p-8 bg-card rounded-lg border border-border hover:border-gold/30 transition-all group"
          >
            <Phone className="w-10 h-10 text-gold mb-4" />
            <h3 className="text-lg font-semibold mb-2">Telefone</h3>
            <p className="text-muted-foreground text-sm mb-4 font-[family-name:var(--font-inter)]">
              Para tratar assuntos de forma imediata.
            </p>
            <span className="text-gold text-sm font-medium font-[family-name:var(--font-inter)]">
              (11) 99999-9999
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:contato@ricardorautenberg.com.br"
            className="p-8 bg-card rounded-lg border border-border hover:border-gold/30 transition-all group"
          >
            <Mail className="w-10 h-10 text-gold mb-4" />
            <h3 className="text-lg font-semibold mb-2">E-mail</h3>
            <p className="text-muted-foreground text-sm mb-4 font-[family-name:var(--font-inter)]">
              Para propostas detalhadas e documentos.
            </p>
            <span className="text-gold text-sm font-medium font-[family-name:var(--font-inter)]">
              contato@ricardorautenberg.com.br
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/ricardo_rautenberg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-card rounded-lg border border-border hover:border-pink-500/30 transition-all group"
          >
            <Instagram className="w-10 h-10 text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instagram</h3>
            <p className="text-muted-foreground text-sm mb-4 font-[family-name:var(--font-inter)]">
              Acompanhe novidades e bastidores dos im\u00F3veis.
            </p>
            <span className="text-pink-500 text-sm font-medium font-[family-name:var(--font-inter)]">
              @ricardo_rautenberg
            </span>
          </a>
        </div>

        {/* Location */}
        <div className="text-center p-12 bg-card rounded-lg border border-border">
          <MapPin className="w-10 h-10 text-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">S\u00E3o Paulo, SP</h3>
          <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
            Atendimento nos bairros nobres: Itaim Bibi, Jardins, Vila Nova Concei\u00E7\u00E3o,
            Moema, Vila Ol\u00EDmpia, Pinheiros, Higien\u00F3polis e regi\u00E3o.
          </p>
        </div>
      </div>
    </div>
  );
}
