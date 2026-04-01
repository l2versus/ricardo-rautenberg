"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Im\u00F3veis", href: "/imoveis" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold tracking-[0.15em] text-gold font-[family-name:var(--font-playfair)]">
                RR
              </span>
              <span className="text-[8px] tracking-[0.3em] text-muted-foreground uppercase">
                Corretor
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-light tracking-wider text-foreground/90 font-[family-name:var(--font-inter)]">
                Ricardo Rautenberg
              </span>
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                CRECI SP - 299919
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wider text-foreground/70 hover:text-gold transition-colors duration-300 uppercase font-[family-name:var(--font-inter)]"
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold hover:text-background transition-all duration-300"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-80">
              <nav className="flex flex-col gap-6 mt-12">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg tracking-wider text-foreground/70 hover:text-gold transition-colors uppercase font-[family-name:var(--font-playfair)]"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-gold text-background hover:bg-gold-light mt-4"
                >
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
