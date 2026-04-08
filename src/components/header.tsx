"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Imóveis", href: "/imoveis" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-full.png"
                alt="Ricardo Rautenberg"
                width={220}
                height={70}
                className="opacity-95 group-hover:opacity-100 transition-opacity"
                style={{ height: "auto", maxHeight: "208px", width: "auto", filter: "brightness(5)" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-[11px] tracking-[0.2em] text-foreground/50 hover:text-gold transition-colors duration-300 uppercase font-body"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="ml-4 bg-gold/10 border border-gold/20 text-gold hover:bg-gold hover:text-background transition-all duration-400 text-[10px] tracking-[0.2em] uppercase font-body px-5 py-2 h-auto rounded-none"
              >
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-3 h-3 mr-1.5" />
                  WhatsApp
                </a>
              </Button>
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-foreground/70 hover:text-gold transition-colors p-2"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-sm flex flex-col justify-center items-center animate-fade-in">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-foreground/50 hover:text-gold transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="flex flex-col items-center gap-1">
            {navigation.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground/60 hover:text-gold transition-all duration-300 py-3"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {item.name}
              </Link>
            ))}

            <div className="w-8 h-[1px] bg-gold/30 my-6" />

            <Button
              asChild
              className="bg-gold text-background hover:bg-gold-light text-xs tracking-[0.15em] uppercase font-body px-8 py-5"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999"}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </nav>

          <p className="absolute bottom-8 text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase font-body">
            CRECI SP — 299919
          </p>
        </div>
      )}
    </>
  );
}
