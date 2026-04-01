import Link from "next/link";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col items-start">
              <span className="text-3xl font-bold tracking-[0.15em] text-gold font-[family-name:var(--font-playfair)]">
                RR
              </span>
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase mt-1">
                Corretor
              </span>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed font-[family-name:var(--font-inter)]">
                Especialista em im&oacute;veis de alto padr&atilde;o nos melhores
                bairros de S&atilde;o Paulo. Atendimento exclusivo e personalizado
                para quem busca excel&ecirc;ncia.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm tracking-[0.2em] text-gold uppercase mb-6 font-[family-name:var(--font-playfair)]">
              Navega&ccedil;&atilde;o
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Home", href: "/" },
                { name: "Im\u00F3veis", href: "/imoveis" },
                { name: "Sobre", href: "/sobre" },
                { name: "Contato", href: "/contato" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-[0.2em] text-gold uppercase mb-6 font-[family-name:var(--font-playfair)]">
              Contato
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
              >
                <Phone className="w-4 h-4 text-gold" />
                (11) 99999-9999
              </a>
              <a
                href="mailto:contato@ricardorautenberg.com.br"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
              >
                <Mail className="w-4 h-4 text-gold" />
                contato@ricardorautenberg.com.br
              </a>
              <a
                href="https://instagram.com/ricardo_rautenberg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors font-[family-name:var(--font-inter)]"
              >
                <Instagram className="w-4 h-4 text-gold" />
                @ricardo_rautenberg
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                S&atilde;o Paulo, SP
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
            &copy; {new Date().getFullYear()} Ricardo Rautenberg. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
            CRECI SP - 299919
          </p>
        </div>
      </div>
    </footer>
  );
}
