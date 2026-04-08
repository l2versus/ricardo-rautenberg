"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Imoveis", href: "/imoveis" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
];

const contacts = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "(11) 99999-9999",
    href: "https://wa.me/5511939117173",
    external: true,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@ricardorautenberg.com.br",
    href: "mailto:contato@ricardorautenberg.com.br",
    external: false,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@ricardo_rautenberg",
    href: "https://instagram.com/ricardo_rautenberg",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/5">
      {/* FlickeringGrid background — more visible */}
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          color="rgb(201, 168, 76)"
          maxOpacity={0.15}
          flickerChance={0.08}
          squareSize={3}
          gridGap={8}
        />
      </div>

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Radial glow — stronger */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══ Main footer ═══ */}
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* ── Brand column ── */}
            <div className="lg:col-span-5">
              <div className="mb-6">
                <Image
                  src="/images/logo-full.png"
                  alt="Ricardo Rautenberg"
                  width={280}
                  height={90}
                  className="opacity-60 hover:opacity-80 transition-opacity duration-500"
                  style={{ height: "auto", maxHeight: "80px", width: "auto", filter: "brightness(5)" }}
                />
              </div>

              <p className="text-[13px] text-muted-foreground/40 leading-relaxed font-body max-w-sm mb-8">
                Especialista em imoveis de alto padrao nos melhores
                bairros do ABC Paulista. Atendimento exclusivo e personalizado
                para quem busca excelencia em moradia.
              </p>

              {/* CTA WhatsApp */}
              <a
                href="https://wa.me/5511939117173?text=Ola%20Ricardo,%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gold/5 border border-gold/15 hover:bg-gold/10 hover:border-gold/30 transition-all duration-500"
              >
                <Phone className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors" />
                <span className="text-[11px] tracking-[0.15em] uppercase font-body text-gold/70 group-hover:text-gold transition-colors">
                  Fale comigo
                </span>
                <ArrowUpRight className="w-3 h-3 text-gold/40 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* ── Navigation ── */}
            <div className="lg:col-span-2">
              <h3 className="text-[9px] tracking-[0.35em] text-gold/40 uppercase mb-6 font-body">
                Navegacao
              </h3>
              <nav className="flex flex-col gap-0">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center gap-2 py-2 text-[13px] text-muted-foreground/40 hover:text-foreground/80 transition-colors duration-300 font-body"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-gold transition-all duration-300" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Contact ── */}
            <div className="lg:col-span-5">
              <h3 className="text-[9px] tracking-[0.35em] text-gold/40 uppercase mb-6 font-body">
                Contato
              </h3>
              <div className="flex flex-col gap-1">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 py-2.5 px-3 -mx-3 hover:bg-gold/[0.03] transition-all duration-300 rounded-sm"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-gold/5 border border-gold/10 group-hover:border-gold/25 group-hover:bg-gold/10 transition-all duration-300">
                      <contact.icon className="w-3.5 h-3.5 text-gold/40 group-hover:text-gold/70 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] tracking-[0.2em] text-muted-foreground/25 uppercase font-body">
                        {contact.label}
                      </p>
                      <p className="text-[13px] text-muted-foreground/50 group-hover:text-foreground/70 transition-colors font-body truncate">
                        {contact.value}
                      </p>
                    </div>
                    {contact.external && (
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground/15 group-hover:text-gold/40 transition-colors" />
                    )}
                  </a>
                ))}

                {/* Location */}
                <div className="flex items-center gap-3 py-2.5 px-3 -mx-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gold/5 border border-gold/10">
                    <MapPin className="w-3.5 h-3.5 text-gold/30" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] text-muted-foreground/25 uppercase font-body">
                      Area de atuacao
                    </p>
                    <p className="text-[13px] text-muted-foreground/40 font-body">
                      ABC Paulista, SP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Bottom bar ═══ */}
        <div className="relative py-6 border-t border-border/20">
          {/* Gold line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-[10px] text-muted-foreground/20 font-body">
                &copy; {new Date().getFullYear()} Ricardo Rautenberg
              </p>
              <div className="w-[1px] h-3 bg-border/20 hidden sm:block" />
              <p className="text-[10px] text-muted-foreground/20 font-body tracking-wider hidden sm:block">
                Todos os direitos reservados
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] text-gold/20 uppercase font-body">
                CRECI SP
              </span>
              <span className="text-[10px] text-muted-foreground/30 font-body font-medium">
                299919
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
