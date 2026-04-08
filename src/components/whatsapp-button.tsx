"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent("Olá Ricardo, vim pelo site e gostaria de saber mais sobre os imóveis disponíveis.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-2xl shadow-[#25D366]/20 transition-all duration-300 hover:scale-110 group"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-card border border-border text-foreground text-xs font-body whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
        Fale comigo
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366]/30 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
    </a>
  );
}
